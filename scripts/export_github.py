"""Create a portable source checkout, including every project photo and video.

Run: python3 scripts/export_github.py --output /tmp/marketing-proposals
No credentials or Git operations are required.
"""
import argparse
import concurrent.futures
import json
from pathlib import Path
import re
import shutil
import urllib.request

ASSET_ORIGIN = "https://trueface-pop-portraits.lovable.app"
ROOT = Path(__file__).resolve().parents[1]
ASSET_PATTERN = re.compile(r"/__l5e/assets-v1/[a-zA-Z0-9-]+/[a-zA-Z0-9_.-]+")
SOURCE_FILES = (
    "package.json", "bun.lock", "bunfig.toml", "components.json",
    "eslint.config.js", "tsconfig.json", "vite.config.ts", "vitest.config.ts",
    ".gitignore", ".prettierignore", ".prettierrc", "README.md", "AGENTS.md",
)
SOURCE_DIRS = ("src", "public", "scripts")
TEXT_EXTENSIONS = {".json", ".tsx", ".ts", ".js", ".html", ".css"}


def download(url: str, target: Path) -> int:
    target.parent.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(url, headers={"User-Agent": "PortableProposalExport/1.0"})
    with urllib.request.urlopen(request, timeout=120) as response:
        content_type = response.headers.get("Content-Type", "")
        if "text/html" in content_type:
            raise RuntimeError(f"Expected media, received HTML: {url}")
        with target.open("wb") as file:
            shutil.copyfileobj(response, file)
    size = target.stat().st_size
    if not size:
        raise RuntimeError(f"Empty download: {url}")
    if size >= 100 * 1024 * 1024:
        raise RuntimeError(f"GitHub requires Git LFS for this file: {target.name}")
    return size


def export(output: Path) -> None:
    output = output.resolve()
    if output.exists():
        raise RuntimeError("Choose a new output folder; existing folders are never overwritten.")
    if output == ROOT or ROOT in output.parents:
        raise RuntimeError("The portable copy must be outside the working project.")
    output.mkdir(parents=True)
    for name in SOURCE_FILES:
        if (ROOT / name).is_file():
            shutil.copy2(ROOT / name, output / name)
    for name in SOURCE_DIRS:
        shutil.copytree(ROOT / name, output / name)

    asset_paths = set()
    pointer_sizes = {}
    external_images = {}
    for path in output.rglob("*"):
        if not path.is_file() or path.suffix not in TEXT_EXTENSIONS:
            continue
        text = path.read_text()
        asset_paths.update(ASSET_PATTERN.findall(text))
        if path.suffix == ".json":
            try:
                pointer = json.loads(text)
                if isinstance(pointer, dict) and pointer.get("asset_id") and pointer.get("url"):
                    pointer_sizes[pointer["url"]] = pointer.get("size")
            except json.JSONDecodeError:
                pass
        # Preserve the remaining decorative stock photograph as a local image.
        for url in re.findall(r'https://images\.unsplash\.com/[^\s"<>]+', text):
            external_images[url] = "/portable-media/" + url.split("/")[-1].split("?")[0] + ".jpg"
        for url, local in external_images.items():
            text = text.replace(url, local)
        path.write_text(text)

    tasks = [(ASSET_ORIGIN + url, output / "public" / url.lstrip("/"), url) for url in sorted(asset_paths)]
    tasks += [(url, output / "public" / local.lstrip("/"), local) for url, local in external_images.items()]
    manifest = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(download, url, target): (local, target) for url, target, local in tasks}
        for future in concurrent.futures.as_completed(futures):
            local, target = futures[future]
            size = future.result()
            expected = pointer_sizes.get(local)
            if expected is not None and size != expected:
                raise RuntimeError(f"Incomplete media download: {local}")
            manifest.append({"path": str(target.relative_to(output)), "bytes": size})
    (output / "MEDIA-MANIFEST.json").write_text(json.dumps(sorted(manifest, key=lambda row: row["path"]), indent=2) + "\n")
    (output / "PORTABLE-COPY.md").write_text(
        "# Marketing coordinator proposals — portable source\n\n"
        "All project photos and videos are included under public/__l5e/assets-v1. "
        "The existing asset references work locally without Lovable's media service. "
        "The remaining stock photo is included under public/portable-media.\n\n"
        "Install Bun, run `bun install`, then `bun run dev`. "
        "For production run `bun run build` and deploy the generated Cloudflare Worker "
        "and its static assets on a TanStack Start-compatible host. "
        "GitHub stores the source; GitHub Pages alone does not run this server-rendered app.\n\n"
        "Upload the extracted source files to your repository, not this ZIP. "
        "Avoid overwriting the Lovable-synced branch with this portable copy; "
        "use a separate repository or branch for independent hosting.\n\n"
        "Google Fonts and the original walkthrough's Tailwind CDN script still require internet access. "
        "Instagram and ordering links continue to open their original websites. "
        "No account credentials, Git history, dependencies, or generated build output are included.\n"
    )
    print(f"Exported {len(manifest)} media files ({sum(row['bytes'] for row in manifest):,} bytes) to {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    export(parser.parse_args().output)
"""Prepare a Netlify source copy from an existing complete media export.

python3 scripts/prepare_netlify.py --source /tmp/marketing-proposals-github --output /tmp/marketing-proposals-netlify
"""
import argparse
import json
from pathlib import Path
import shutil


def prepare(source: Path, output: Path) -> None:
    source = source.resolve()
    output = output.resolve()
    if output.exists():
        raise RuntimeError("Choose a new output folder; existing folders are never overwritten.")
    manifest = json.loads((source / "MEDIA-MANIFEST.json").read_text())
    for item in manifest:
        path = source / item["path"]
        if not path.is_file() or path.stat().st_size != item["bytes"]:
            raise RuntimeError(f"Missing or incomplete media: {item['path']}")
    shutil.copytree(source, output)
    (output / "vite.config.ts").write_text(
        'import { defineConfig } from "@lovable.dev/vite-tanstack-config";\n\n'
        'export default defineConfig({\n'
        '  nitro: { preset: "netlify" },\n'
        '  tanstackStart: { server: { entry: "server" } },\n'
        '});\n'
    )
    (output / "netlify.toml").write_text(
        '[build]\n'
        '  command = "bun run build"\n'
        '  publish = "dist"\n\n'
        '[build.environment]\n'
        '  NODE_VERSION = "22"\n'
        '  BUN_VERSION = "1.3.3"\n'
        '  NITRO_PRESET = "netlify"\n'
    )
    instructions = (
        '# Deploy the marketing proposals on Netlify\n\n'
        '1. Extract this ZIP. Use GitHub Desktop to publish the extracted folder as a new private repository. '
        'Commit the individual files, including public/; do not upload the ZIP itself.\n'
        '2. On Netlify choose Add new project → Import an existing project → GitHub, then select that repository.\n'
        '3. Leave the base directory blank. The included netlify.toml sets the build command to '
        '`bun run build` and publish directory to `dist`. No account secrets are needed for this site.\n'
        '4. Click Deploy project. Netlify installs dependencies, builds the app, and creates its server function automatically.\n'
        '5. Open the Netlify address and check `/`, `/proposal-one`, `/proposal-two`, both Instagram videos, '
        'both hero films, and the OpusClip examples. Refresh each proposal address to check direct navigation.\n\n'
        '## Included media\n\n'
        'All downloaded project photos, videos, posters, and video fallbacks are included in public/__l5e/assets-v1. '
        'Their URLs are local to your Netlify site; they do not need Lovable media hosting. '
        'Additional generated images are included in src/assets. Stock photographs are in public/portable-media. '
        'MEDIA-MANIFEST.json lists downloaded files and byte sizes.\n\n'
        'Google Fonts and the original walkthrough’s Tailwind CDN script still use their own online services. '
        'Instagram and campaign ordering links still open their original sites.\n\n'
        '## Important\n\n'
        'Use Git-based deployment, not Netlify Drop: this ZIP contains source, not a prebuilt static website. '
        'Do not add a catch-all SPA redirect; Nitro generates the server-function routing. '
        'Netlify hosting/build and video bandwidth may count toward your Netlify plan. '
        'Keep this independent copy separate from the Lovable-synced repository. '
        'This package has not been deployed to your Netlify account; your first Netlify build is the final hosting check.\n'
    )
    (output / "NETLIFY-SETUP.md").write_text(instructions)
    (output / "PORTABLE-COPY.md").write_text(instructions)
    print(f"Prepared Netlify source with {len(manifest)} downloaded media files at {output}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    prepare(args.source, args.output)
# Deploy the marketing proposals on Netlify

1. Extract this ZIP. Use GitHub Desktop to publish the extracted folder as a new private repository. Commit the individual files, including public/; do not upload the ZIP itself.
2. On Netlify choose Add new project → Import an existing project → GitHub, then select that repository.
3. Leave the base directory blank. The included netlify.toml sets the build command to `bun run build` and publish directory to `dist`. No account secrets are needed for this site.
4. Click Deploy project. Netlify installs dependencies, builds the app, and creates its server function automatically.
5. Open the Netlify address and check `/`, `/proposal-one`, `/proposal-two`, both Instagram videos, both hero films, and the OpusClip examples. Refresh each proposal address to check direct navigation.

## Included media

All downloaded project photos, videos, posters, and video fallbacks are included in public/__l5e/assets-v1. Their URLs are local to your Netlify site; they do not need Lovable media hosting. Additional generated images are included in src/assets. Stock photographs are in public/portable-media. MEDIA-MANIFEST.json lists downloaded files and byte sizes.

Google Fonts and the original walkthrough’s Tailwind CDN script still use their own online services. Instagram and campaign ordering links still open their original sites.

## Important

Use Git-based deployment, not Netlify Drop: this ZIP contains source, not a prebuilt static website. Do not add a catch-all SPA redirect; Nitro generates the server-function routing. Netlify hosting/build and video bandwidth may count toward your Netlify plan. Keep this independent copy separate from the Lovable-synced repository. This package has not been deployed to your Netlify account; your first Netlify build is the final hosting check.

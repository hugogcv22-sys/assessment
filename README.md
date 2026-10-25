# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Portable GitHub copy with all media

Git sync includes source and asset pointers; the photos and videos normally remain on Lovable's CDN. To create an independent copy containing the actual media files:

```sh
python3 scripts/export_github.py --output /tmp/marketing-proposals
```

The exporter copies clean source and downloads all project media into the matching public paths, checking known file sizes. It excludes credentials, Git metadata, installed dependencies and build output. See the exported `PORTABLE-COPY.md` for setup and hosting notes. Keep independent hosting changes in a separate repository or branch instead of replacing the Lovable-synced branch. GitHub Pages alone cannot run the TanStack Start server.

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

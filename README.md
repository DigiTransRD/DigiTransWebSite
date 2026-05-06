# DigiTrans Web Site

Static GitHub Pages version of the ABI Assistant website.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages deployment

This repository includes `.github/workflows/deploy-pages.yml`.

After pushing to GitHub:

1. Open the repository settings.
2. Go to `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` and wait for the workflow to publish the site.

The app uses Vite static output and Vue Router hash mode, so it works on GitHub Pages without server-side rewrites.

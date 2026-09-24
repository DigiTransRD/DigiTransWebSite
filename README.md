# DigiTrans Web Site

Static GitHub Pages version of the ABI Assistant website.

ABI stands for **Agentic Business Intelligence**. ABI Assistant uses AI agents with enterprise data, industry-specific skills and authorized tools to generate business forms, reports and applications and carry out tasks within defined workflows, permissions and business rules.

The shared product definition in `src/content/homeContent.ts` feeds the website, FAQ, JSON-LD, product Markdown and `llms.txt`. Page descriptions also feed search and social metadata. Keep the full name and Agentic explanation consistent across these outputs when updating content.

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

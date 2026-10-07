# Memori

Memori is a responsive company website built with SvelteKit and TypeScript. It is
deployed as a static site to GitHub Pages and uses Web3Forms for contact
submissions, so it does not require a custom server or database.

## Site pages

- **Home** — company introduction and featured work
- **About Us** — company story and values
- **How It Works** — project process and service details
- **Gallery** — project photos with an image viewer
- **Contact** — inquiry form

## Technology

- SvelteKit 2 and Svelte 5
- TypeScript
- Static site adapter for GitHub Pages
- Playwright and axe for browser and accessibility tests
- Web3Forms for contact form delivery

## Requirements

- Node.js 22 or newer
- npm
- `cwebp` from the WebP tools package for production image conversion and the
  Playwright preview tests

Install dependencies:

```sh
npm ci
```

## Local development

Start the development server:

```sh
npm run dev
```

The site is served locally at `http://localhost:5173/MEMORI/`, matching its
GitHub Pages project-site path. To check types and Svelte diagnostics:

```sh
npm run check
```

To run ESLint:

```sh
npm run lint
```

## Build and preview

Build the static site:

```sh
npm run build
```

The generated site is written to `build/`. The `npm run build:webp` command
builds the site and converts supported PNG/JPEG images to WebP; it requires
`cwebp` to be installed. To preview the converted production build:

```sh
npm run build:webp
npm run preview
```

## Tests

Run the Playwright suite:

```sh
npm run test:ally
```

The suite launches a production preview in Chromium and checks:

- Automatically detectable WCAG 2.1 AA accessibility issues on all site pages
- Header navigation and the mobile navigation menu
- That visible images load
- Contact form browser validation, successful submission, and error recovery

The contact tests mock Web3Forms; they do not send real messages. Playwright
browser binaries must be installed once per machine if they are not already
available:

```sh
npx playwright install chromium
```

## Updating site content

| Content | Location |
| --- | --- |
| Site name, tagline, email, and social links | `src/lib/data/site.ts` |
| Home page | `src/routes/+page.svelte` |
| About Us | `src/routes/about-us/+page.svelte` |
| How It Works | `src/routes/how-it-works/+page.svelte` |
| Gallery page | `src/routes/gallery/+page.svelte` |
| Gallery items | `src/lib/data/gallery.ts` |
| Contact page and form | `src/routes/contact/+page.svelte` |
| Shared header and navigation | `src/lib/components/Header.svelte` |
| Shared footer | `src/lib/components/Footer.svelte` |
| Global styles | `src/app.css` |
| Static images | `static/` |

To add a gallery item, put its image in `static/gallery/` and add an entry to
`src/lib/data/gallery.ts`. Use a path relative to `static`, such as
`/gallery/new-item.jpeg`, and include a descriptive `alt` value.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` deploys the `main` branch to
GitHub Pages. In the repository settings, configure **Pages → Build and
deployment → Source** to use **GitHub Actions**. Pushes to `main` then build and
publish the site automatically; the workflow can also be run manually.

By default, the site uses the `/MEMORI` base path for the repository's GitHub
Pages URL. To use a custom domain:

1. In the repository, open **Settings → Pages** and enter your hostname in
   **Custom domain**, then save it.
2. Configure the domain's DNS records with your DNS provider. For apex and
   `www` record requirements, follow GitHub's
   [custom domain documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. In **Settings → Secrets and variables → Actions → Variables**, create a
   repository variable named `CUSTOM_DOMAIN` with the same hostname (for
   example, `www.example.com`, without `https://` or a path). This makes the
   build use the domain root instead of `/MEMORI`.
4. Push to `main` or run the deploy workflow. The workflow deploys using the
   custom domain configured in Pages; it does not need a `CNAME` file because
   the site is published with GitHub Actions. Enable **Enforce HTTPS** in
   **Settings → Pages** when GitHub makes it available.

DNS changes can take time to propagate. GitHub Pages' custom-domain setting and
DNS records must agree for the site and HTTPS certificate to work correctly.

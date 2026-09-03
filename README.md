# Company Website

A simple, responsive business website built with **SvelteKit** and designed to be hosted on **GitHub Pages**.

The website is intentionally lightweight and does not use a database, authentication, shopping cart, checkout system, or custom backend.

## Features

- Home page with company information
- Responsive navigation
- Product/work gallery
- Image lightbox for viewing gallery images
- Contact form
- Mobile-friendly design
- Simple brand styling
- Static site suitable for GitHub Pages
- Web3Forms for contact form submissions
- No database or backend required

---

## Tech Stack

- SvelteKit
- TypeScript
- CSS
- GitHub Pages
- Web3Forms

---

## Project Structure

```text
.
├── src/
│   ├── app.css
│   │
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Header.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── GalleryGrid.svelte
│   │   │
│   │   └── data/
│   │       └── gallery.ts
│   │
│   └── routes/
│       ├── +layout.svelte
│       ├── +layout.ts
│       ├── +page.svelte
│       │
│       ├── gallery/
│       │   └── +page.svelte
│       │
│       └── contact/
│           └── +page.svelte
│
├── static/
│   └── gallery/
│       ├── product-1.jpg
│       ├── product-2.jpg
│       ├── product-3.jpg
│       └── product-4.jpg
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── package.json
├── package-lock.json
├── svelte.config.js
└── README.md
```

---

# Pages

## Home

The home page is located at:

```text
src/routes/+page.svelte
```

This is the main landing page and contains the primary company information.

It includes:

- Hero section
- Company introduction
- Services/products
- Gallery preview
- Contact call-to-action

Most of the company's main marketing text can be changed directly in this file.

---

## Gallery

The gallery page is located at:

```text
src/routes/gallery/+page.svelte
```

The gallery displays the company's products and/or work.

The gallery information is stored separately in:

```text
src/lib/data/gallery.ts
```

This makes it easier to add, remove, or edit products without changing the gallery page itself.

### Adding a Gallery Item

First, place the image in:

```text
static/gallery/
```

For example:

```text
static/gallery/new-product.jpg
```

Then open:

```text
src/lib/data/gallery.ts
```

Add a new item:

```ts
{
	image: '/gallery/new-product.jpg',
	title: 'New Product',
	description: 'Description of the new product.'
}
```

The new item will automatically appear in the gallery.

### Gallery Images

Recommended image formats:

- `.jpg` or `.jpeg` for photographs
- `.png` for images requiring transparency
- `.webp` for smaller file sizes

Try to keep image file sizes reasonable so the website loads quickly.

---

# Contact

The contact page is located at:

```text
src/routes/contact/+page.svelte
```

The contact form contains:

- Name
- Email
- Phone
- Interest/category
- Message

The form is designed to use **Web3Forms** so that visitors can send messages without the website needing its own backend or database.

---

# Site-Wide Components

## Header

Located at:

```text
src/lib/components/Header.svelte
```

The header contains:

- Company name/logo
- Home link
- Gallery link
- Contact link
- Mobile navigation menu

The navigation automatically changes to a mobile menu on smaller screens.

---

## Footer

Located at:

```text
src/lib/components/Footer.svelte
```

The footer contains:

- Company name
- Short company description
- Navigation links
- Copyright notice

The copyright year updates automatically based on the current year.

---

## Gallery Grid

Located at:

```text
src/lib/components/GalleryGrid.svelte
```

This component handles:

- Displaying gallery items
- Gallery layout
- Opening images in the larger image viewer/lightbox
- Displaying image titles and descriptions

Most gallery changes should be made in:

```text
src/lib/data/gallery.ts
```

rather than editing this component.

---

# Styling

Global styling is located in:

```text
src/app.css
```

The website uses a simple, clean design with:

- White backgrounds
- Black/dark text
- Gray secondary text
- Subtle borders
- Brand colors used as accents
- Responsive layouts

The design is intentionally kept relatively simple so that the website is easy to maintain.

---

# Running the Website Locally

## Requirements

You will need:

- Node.js
- npm

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The website will normally be available at:

```text
http://localhost:5173
```

The development server will automatically update when files are changed.

---

# Building the Website

To create a production build:

```bash
npm run build
```

The generated static website will be placed in:

```text
build/
```

You can preview the production build locally with:

```bash
npm run preview
```

---

# GitHub Pages Deployment

The website is configured to be deployed as a static site using GitHub Pages.

GitHub Actions is used to:

1. Install the project dependencies
2. Build the SvelteKit website
3. Upload the generated `build/` directory
4. Deploy the site to GitHub Pages

The deployment workflow is located at:

```text
.github/workflows/deploy.yml
```

Once GitHub Pages is configured to use GitHub Actions, pushing changes to the main branch will automatically trigger a new deployment.

---

# Making Changes

The most common changes should be made in these files:

| What needs to change | File |
|---|---|
| Home page content | `src/routes/+page.svelte` |
| Gallery page | `src/routes/gallery/+page.svelte` |
| Gallery products | `src/lib/data/gallery.ts` |
| Gallery images | `static/gallery/` |
| Contact page | `src/routes/contact/+page.svelte` |
| Header/navigation | `src/lib/components/Header.svelte` |
| Footer | `src/lib/components/Footer.svelte` |
| Overall styling | `src/app.css` |
| Gallery behavior | `src/lib/components/GalleryGrid.svelte` |

---

# Adding New Gallery Photos

Adding a new product to the gallery requires two steps.

## Step 1: Add the Image

Place the image in:

```text
static/gallery/
```

For example:

```text
static/gallery/red-chair.jpg
```

## Step 2: Add the Product Information

Open:

```text
src/lib/data/gallery.ts
```

Add:

```ts
{
	image: '/gallery/red-chair.jpg',
	title: 'Red Chair',
	description: 'A description of the product.'
}
```

Save the file.

The new product will automatically appear in the gallery.

---

# Updating Company Information

Company information is currently written directly into the relevant Svelte pages and components.

Common information that may need to be changed includes:

- Company name
- Email address
- Phone number
- Company description
- Services
- Contact information

Search the project for:

```text
COMPANY NAME
```

and replace it with the actual company name.

Also search for the placeholder contact information:

```text
your@email.com
```

and:

```text
(555) 555-5555
```

Replace these with the actual company contact information.

---

# Updating the Website

The normal workflow for making a change is:

```text
1. Make the change
       ↓
2. Test it locally
       ↓
3. Run npm run build
       ↓
4. Commit the changes
       ↓
5. Push to GitHub
       ↓
6. GitHub Actions builds the site
       ↓
7. GitHub Pages publishes the new version
```

For example:

```bash
git status
git add .
git commit -m "Update website"
git push
```

After the push, GitHub Actions will handle the deployment.

---

# Contact Form

The contact form uses Web3Forms rather than a custom backend.

This allows the website to remain a completely static GitHub Pages website while still allowing visitors to submit messages.

The form will collect:

```text
Name
Email
Phone
Interest
Message
```

The submitted information will be sent through Web3Forms to the configured recipient email address.

The Web3Forms configuration will be contained in:

```text
src/routes/contact/+page.svelte
```

No database is required.

---

# Important Notes

## Static Website

This website is intentionally static.

It does not require:

- Database
- Server
- User accounts
- Authentication
- Shopping cart
- Checkout
- Custom backend

This keeps the website simple and inexpensive to host.

## Contact Form

The contact form depends on Web3Forms for handling submissions.

If the Web3Forms configuration is removed or incorrect, the form will not be able to send messages.

## Images

Images stored inside:

```text
static/
```

are publicly accessible from the website.

Do not place private or sensitive files inside the `static/` directory.

---

# Troubleshooting

## Website Works Locally but Not on GitHub Pages

Check:

1. GitHub Actions completed successfully.
2. GitHub Pages is configured to use **GitHub Actions**.
3. The SvelteKit static adapter is installed.
4. `npm run build` works successfully.
5. The GitHub Pages base path is configured correctly.

If the site is hosted as:

```text
https://USERNAME.github.io/REPOSITORY/
```

the project may require a base path.

If the repository itself is:

```text
USERNAME.github.io
```

then the website is hosted at:

```text
https://USERNAME.github.io/
```

and does not have the same repository subpath issue.

---

## Gallery Image Does Not Appear

Check that the image exists inside:

```text
static/gallery/
```

and that the path in `gallery.ts` exactly matches the filename.

For example, if the file is:

```text
static/gallery/product.jpg
```

the gallery entry should use:

```ts
image: '/gallery/product.jpg'
```

File names are case-sensitive when deployed to GitHub Pages.

For example:

```text
Product.jpg
```

and:

```text
product.jpg
```

are different filenames.

---

## Changes Are Not Showing on the Live Website

First check the **Actions** tab in the GitHub repository.

Make sure the latest deployment completed successfully.

Then verify that the changes were committed and pushed:

```bash
git status
git add .
git commit -m "Update website"
git push
```

GitHub Pages can take a short amount of time to publish a new deployment.

---

## Contact Form Does Not Send

Check:

1. The Web3Forms access key is correct.
2. The form is posting to the correct Web3Forms endpoint.
3. The required form fields are present.
4. The browser console does not show an error.
5. The Web3Forms configuration is active.

---

# Future Improvements

Possible future additions include:

- Real company logo
- Custom domain
- More gallery categories
- Gallery filtering
- Social media links
- Google Maps/location information
- Improved SEO metadata
- Analytics
- Additional contact fields
- Additional spam protection
- Better image optimization

The website should remain simple unless additional functionality is actually needed.

---

# License

This website is intended for use by the company it was created for.

All company branding, logos, photographs, product information, and other business content belong to their respective owners.

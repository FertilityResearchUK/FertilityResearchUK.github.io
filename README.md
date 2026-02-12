# Fertility Research UK — Website v0

A static multi-page website for Fertility Research UK (FRUK), built with plain HTML, CSS and minimal JavaScript. Designed for quick review and easy deployment on GitHub Pages.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, purpose, "did you know?" callouts, what we do |
| About | `about.html` | Vision, mission, commitments, research responsibility |
| Research | `research.html` | Research focus areas (accordion), researcher support |
| Support | `support.html` | Patient info, donor section, contact form |
| Our Team | `team.html` | Trustees, leadership, advisors, volunteers |

## Repository layout

```
/
├── index.html
├── about.html
├── research.html
├── support.html
├── team.html
├── styles.css
├── script.js
├── README.md
├── content.txt          (source copy)
├── prompt.txt           (tech spec)
└── assets/
    └── logo.svg         (placeholder wordmark)
```

## Preview locally

**Option A — just open the file:**

```bash
open index.html
```

**Option B — local server (recommended for accurate link behaviour):**

```bash
cd /path/to/fruk.github.io
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deploy on GitHub Pages

1. Push this repo to GitHub (e.g. `fruk.github.io` or any repo name).
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`.
5. Click **Save**. The site will be live within a minute or two.

## Customisation

### Brand colours

All colours are defined as CSS custom properties in `styles.css`:

```css
:root {
  --primary:       #D4782F;   /* warm orange */
  --accent:        #2A7F6F;   /* teal green */
  --bg:            #FFF8F2;   /* warm off-white */
  --text:          #1E1E1E;   /* charcoal */
  --muted:         #6B6B6B;   /* warm grey */
  --border:        #E0D8CF;   /* light warm grey */
}
```

Change these values to update the entire palette.

### Contact form

The contact form on `support.html` submits to a [Formspree](https://formspree.io/) placeholder endpoint. Replace `https://formspree.io/f/xplaceholder` in `support.html` with your real Formspree form ID (or any other form backend).

### People / team cards

Edit `team.html` to replace placeholder names and bios. Cards show initials when no photo is provided. To add a photo, replace the initials text inside `.person-card__avatar` with an `<img>` tag:

```html
<div class="person-card__avatar">
  <img src="assets/photos/name.jpg" alt="Jane Doe">
</div>
```

## Tech stack

- **HTML5** — semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- **CSS3** — custom properties, Grid, Flexbox, mobile-first responsive
- **Vanilla JS** — hamburger menu, form submission, active nav highlighting
- **Google Fonts** — DM Sans (headings)
- No frameworks, no build step

## Non-goals (v0)

- No donations / payment processing
- No CMS or blog
- No analytics
- No multi-language support

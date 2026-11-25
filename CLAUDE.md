# Project CLAUDE.md: pomme-deterre-eats

Lake Pomme de Terre Eats, a guide to every place to eat around Lake Pomme de
Terre in southwest Missouri (React, Vite, React Router, TypeScript), to be
deployed on Netlify at https://pommedeterreeats.com/. Every rule in the
user-level CLAUDE.md applies here from the first file (a new project, so
`strict` is on from the start); this file records only what's specific to
this project. The-bernie-bears (`../the-bernie-bears`) is the source of this
project's configs and its closest multi-page worked example, and
tech-geek-support (`../tech-geek-support`) the closest example of a site
built fresh under the rules (its "## Rebuild" order is followed here).

## Kind of site
Decided by the user 2026-11-25. The user's own project (z4nta0), a real,
indexed directory with normal SEO, never the demo treatment.
- **One site, not one per business**: the user first planned a separate
  site for each eating place, then chose one site holding all of them, which
  also concentrates the search value on one domain.
- **License**: the code is source available under the PolyForm Noncommercial
  License 1.0.0 in `LICENSE.md`. The written content, images, and the Lake
  Pomme de Terre Eats name and marks stay all rights reserved, and the
  listed businesses' own names, logos, menus, and photos stay theirs, which
  `LICENSE.md`'s note says too.
- **Feel of the main pages**: modern and clean, business-like and
  professional, with a touch of fun or whimsy, never too serious.

## Pages
Decided by the user 2026-11-25.
- **The main site, built first**:
  - **Home** (`/`): what the site is and how to use it, a few randomly
    chosen eating places highlighted, and a section for owners explaining how
    to get in touch, either to add their place or to change its entry.
  - **Listing** (`/places`, proposed): every eating place, with a search.
  - **About** (`/about`) and **Contact** (`/contact`), plus the 404 page.
- **Each eating place's own page, built later** (`/places/<slug>`,
  proposed): it works like a small website of its own and is styled after
  the business. Most will have a hero, a menu section, and an about section,
  though not every one follows that exactly.
  - **Its bar is its own**: section links to that page's own sections, not
    the main site's pages. A link back to the main site's home may join it,
    once its look is reconciled with the business's styling.
  - **Its footer is the main site's**, styled after the business.

## Listings
Decided by the user 2026-11-25: the first listings come from research of
public sources (each place's own site or page, official listings), drafted
by Claude and reviewed by the user before anything ships. Nothing is
invented: a detail no source confirms is left out, and a place that may have
closed is listed for the user rather than published.

## Contact
Decided by the user 2026-11-25: Netlify Forms, as on the TechGeek sites, a
hidden copy of each form in `index.html` registering its fields and a
`bot-field` honeypot, with each submission emailed to the user. **Open**: the
receiving address.

## Layout
Decided by the user 2026-11-25: horizontal sizes use the fluid horizontal
rhythm (the `--hor-rhy-*` viewport steps, with `clamp()` ends written as
vertical rhythm steps times `1rem`), as the-bernie-bears and the TechGeek
sites do. **Open**: the spacing tiers' top value, chosen with the user once
the theme is.

## Test server
The suites' dev server runs on port 5207 (the siblings use 5190 through
5206).

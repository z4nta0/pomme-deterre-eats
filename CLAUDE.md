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
  - **Listing** (`/places`, confirmed by the user 2026-11-25): every eating
    place, with a search and town and kind filters kept in the address
    (`q`, `town`, `kind`), so the home page's search opens it searched.
  - **About** (`/about`) and **Contact** (`/contact`), plus the 404 page.
- **Each eating place's own page, built later** (`/places/<slug>`, confirmed
  by the user 2026-11-25, each record's `sluStr`): it works like a small website of its own and is styled after
  the business. Most will have a hero, a menu section, and an about section,
  though not every one follows that exactly.
  - **Its bar is its own**: section links to that page's own sections, not
    the main site's pages. A link back to the main site's home may join it,
    once its look is reconciled with the business's styling.
  - **Its footer is the main site's**, styled after the business.

## Listings
Decided by the user 2026-11-25: the first listings come from research of
public sources (each place's own site or page, official listings), drafted
by Claude. Nothing is invented: a detail no source confirms is left out.
- **All in for now**: every place the research found, those that may have
  closed included, is in `src/core/places.ts`, each with a `cheStr` check
  level (`high`, `medium`, `low`, or `maybe-closed`). The user will verify
  and curate them, and search for places the research missed, well before
  launch. The home page's picks draw only from `high` and `medium`.
- **Chain counters stay out** (decided by the user 2026-11-25): a national
  chain's food counter inside a store or gas station (Casey's, Hunt Brothers
  Pizza, Hangar 54) isn't listed.
- **Descriptions are written for the guide**, never copied from a review or
  a place's own site.

## Voice
Decided by the user 2026-11-26: the site's copy speaks as one person, the
builder, in the first person singular: "I", "me", and "my", never "we",
"us", or "our". The guide is one neighbor's project (About's "Who's behind
it" says so), so "Tell me about it", "I'll add it", "a place I missed".
- **Applies to** every piece of copy a visitor reads or hears: page text,
  headings, buttons, form messages, labels, descriptions, and the social
  preview.
- **A listed place's own page** speaks about the business, not as the
  guide, so this covers only the guide's own words there (its footer).
- **Check**: a search of `src/` and `index.html` for "we", "us", and "our"
  as whole words should find none in copy (a place's name, such as Our
  Kitchen Table, is fine).

## Contact
Decided by the user 2026-11-25: Netlify Forms, as on the TechGeek sites, a
hidden copy of the form in `index.html` registering its fields and a
`bot-field` honeypot, with each submission emailed to
contact@pommedeterreeats.com, which the Contact page also shows. One form,
`contact`: name, email, reason (add, update, tip, or question, which a link
chooses with `?reason=`), place (which a card's owner link fills with
`?place=`), and message. The user sets up the email notification in
Netlify.

## Theme
Decided by the user 2026-11-25, from three directions shown on a design
canvas: mostly "Harbor", with parts of "Trail Map".
- **Harbor**: the lake navy (`#12355b`) with a sunset coral accent
  (`#f26a4b`, never text on white; its text shade is `#b13d22`), the cool
  page gray, white cards, the wave mark (`ui/brand-mark.tsx`, and
  `public/favicon.svg`), and Plus Jakarta Sans as the one font,
  self-hosted, headings extra bold.
- **From Trail Map**: the hero (a trail map backdrop of contour lines, a
  lake, a dotted coral trail, and pins, `pages/home/hero-map.tsx`; decided
  by the user 2026-11-27: the lake stays an invented shape, a sketch of the
  real lake having been tried and dropped, the trail follows its east shore
  from the map's top edge to its bottom edge without crossing the water,
  and the three pins are spaced along it), map pins
  instead of circles for how it works (`ui/map-pin.tsx`, also beside each
  card's town), and the "Worth the drive" heading for the picks.
- **Footer**: bigger and roomy, modeled on the TechGeek footer's layout:
  brand and tagline beside two link columns, then the copyright and "A
  project by techgeek.dev". It reads only color tokens, so a place's own
  page can restyle it.
- **Flourishes** (decided by the user 2026-11-25, each motif kept to one
  place so none turns into wallpaper): the hero's pins drop in once on load;
  a dotted coral trail links the How it works pins; the footer rises in a
  layered wave, with a small trail map beside its link columns (above
  960px) ending at a pin topped by an apple, a row of town links, and a
  sign-off on the name; faint contour fragments sit in the page's side
  margins at 1,440px and up. The How it works band keeps straight rules.
- **"Apple of the earth"** (decided by the user 2026-11-25): the site leans
  on the literal meaning of pomme de terre rather than "potato", but only in
  the footer, the phone menu's closing line, the 404 page ("This apple
  rolled off the map", a tipped apple in a pin), and About's note on the
  name. The wave mark and the hero stay apple-free. Its leaf reads
  `--acc-lea-col`.
- **About's sidebar** (decided by the user 2026-11-26, to fill the empty
  space beside the prose): three panels beside the prose above 960px, and
  below it from there down: the guide's figures (places, towns, and kinds,
  counted from `src/core/places.ts` so they never drift), the note on the
  name with the apple (`ui/apple-shape.tsx`, shared with the 404 pin), and
  the owners' two buttons.
- **Phone menu** (decided by the user 2026-11-25, following the sibling
  sites' fix for a bare drawer): the links become roomy rows with arrows,
  then the "Add your place" button, then a pale panel with a chip per town,
  the guide's email, and the name's note.
- **Breakpoints**: 440, 480, 640, and 960px, plus a 1,440px minimum for the
  page background's contour lines. The bar's links fold into the
  phone menu at 960px and below.

## Layout
Decided by the user 2026-11-25: horizontal sizes use the fluid horizontal
rhythm (the `--hor-rhy-*` viewport steps, with `clamp()` ends written as
vertical rhythm steps times `1rem`), as the-bernie-bears and the TechGeek
sites do.
- **Spacing tiers** (top value chosen by the user 2026-11-25: p07), each two
  rhythm steps below the one above:

  | Tier | Vertical | Horizontal | Separates |
  |---|---|---|---|
  | 1 | p07, ~104px | about 59px - 104px | the bar or footer and a page's content |
  | 2 | p05, ~59px | about 34px - 59px | a page's sections |
  | 3 | p03, ~34px | about 19px - 34px | a heading and its content, a grid's items |
  | 4 | p01, ~19px | about 11px - 19px | the parts of one item |
  | 5 | m01, 11px | about 6px - 11px | the pieces of one part |
- **Main content and skip link**: the main content is everything between
  the bar and the footer, the one `<main id='main'>` in `app.tsx`.

## Directory structure
The-bernie-bears' layout for a site with routes:
```
src/
  main.tsx, app.tsx      entry point; the routes, bar, and footer
  assets/                fonts/ (Plus Jakarta Sans), images/ (the select
                         arrow, shared by two pages)
  core/                  places.ts, the listings table and its filter lists
  pages/                 home/, places/, about/, contact/, not-found/
  ui/                    the bar, the footer, the mark, the map pin, the
                         apple, the place card, and the page description
                         and scroll hooks
  styles/                fonts.css, styles.css
```

## Next steps
- **SEO and social previews**: structured data, the social preview card
  and its tags, and the raster favicon set, each rendered by a script under
  `design/`.
- **The rest of the test suites** (interaction, rendering, responsive,
  security, SEO, and the scripted accessibility checks), copied from the
  siblings and adapted. Only the axe scan exists so far.
- **The user's curation of the listings**, before launch.

## Test server
The suites' dev server runs on port 5207 (the siblings use 5190 through
5206).

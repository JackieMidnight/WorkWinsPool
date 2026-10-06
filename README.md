# Work Wins Pool

The website for the Work Wins Pool 2026 season.

| Page | File |
| --- | --- |
| Home and every "This week" link: forwards to the latest week | `index.html` |
| Any week's standings and results, live while games are being played | `week.html?w=1`, `?w=2`, … (no `w=` opens the latest) |
| Week 4 write-up (phone / desktop) | `week4.html` / `week4-desktop.html` |
| Season and archive | `season.html` |
| Coach page, with title odds | `coaches.html` |
| All 32 teams + pace vs Vegas | `teams.html` |
| Rosters and draft board | `rosters.html` |
| Start here and rules | `rules.html` |
| Playoff bonus tracker (preview until January) | `playoffs.html` |
| Group-text standings image | `share.html` |

## Where the data lives

| File | What's in it |
| --- | --- |
| `league.js` | Everything about this pool: its name, the coaches and their teams, headlines. |
| `nfl.js` | NFL facts only: scores, games still to play, Vegas totals (as on the league's roster sheet), byes, last season. |
| `pool.js` | Works out owners, points, standings and title odds from the two files above. You shouldn't need to edit it. |
| `weekN.js` + `writeup.js` | A write-up's words, and the shared code that lays out its numbers. |

**Changing the rosters:** each coach's teams are in `ROSTERS` in `league.js`. If the pick order is
ever known, list it in `DRAFT` instead (`'Name TEAM'`, top pick first) and the Rosters page will show
pick numbers. A buy-in, a note about how the draft worked and a commissioner line can be added there
too; each one stays off the site while it's empty. If the person who keeps the site is also a coach,
put their name in `ME` and the site will say "me" and "My" for them.

**Updating during a week:** in `nfl.js`, add each finished game to that week's part of `RESULTS`
(away, home, away score, home score) and remove it from `PENDING`.

**Starting a new week:** add a `/` and the first results to `RESULTS` and list the rest of the week's
games in `PENDING` under the new week number. The home page follows along by itself.

**Next week's schedule:** list it in `SCHEDULE` in `nfl.js` (day and time, away, home). The Coaches page uses it
for the "Next" lines and the rooting guide, and the write-up uses it for the preview.

**Headlines:** each week gets an automatic headline. To write your own, add it to `HEADLINES` in
`league.js`, e.g. `{ 5: 'Doug runs away with it' }`.

**Posting a Tuesday write-up:** copy `week4.js`, `week4.html` and `week4-desktop.html` to the new week's
number. In the new `weekN.js`, change `week`, `posted` and the words (headline, summary, a note per coach,
awards, preview cards). In the two new pages, change the `week4` in the title, the redirect and the
`week4.js` script line. Then add N to `WRITEUPS` and its headline to `HEADLINES` in `league.js`.
Standings, the ledger, the bye watch, the preview grid and the biggest-swing card are all worked out by
`writeup.js` from the data, so the write-up's numbers always match the rest of the site.

## How the pages work

Each page keeps its markup in a `<template id="dc-template">` and its logic in the
`<script type="text/x-dc" data-dc-script>` block at the bottom. `support.js` fills the template's
`{{holes}}` from that script's `renderVals()`, repeats `<sc-for>` blocks, and wires up buttons.
The league name and footer line are filled in on every page from `league.js`.

The light/dark choice is remembered across pages, under its own key (`wwp-theme`), so it stays separate
from any other pool published on the same GitHub account. On screens 1024px and wider, `support.js` gives every page a desktop
layout (menu in the header, sections in two columns); each section's `data-wide` attribute says where it goes.

The title odds on the Coaches page come from a simulation that runs in the browser: each team's chance
of winning a game blends its record so far with its preseason Vegas total, and the rest of the regular
season is played out 4,000 times. Playoff bonuses aren't included.

## Publishing with GitHub Pages

In the repository on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
pick the branch and `/ (root)`, then save. The site appears at
`https://<your-username>.github.io/WorkWinsPool/` a minute or two later.

Browsers keep a copy of each file for about 10 minutes, so new scores can take that long to show up.
Whenever you change `support.js`, `pool.js` or `writeup.js`, bump the `?v=` number on their `<script src="…?v=…">` lines in
every page so visitors get the new version along with the new pages.

To preview locally: `python3 -m http.server` in this folder, then open http://localhost:8000.

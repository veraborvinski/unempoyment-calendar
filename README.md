# The Unemployment Calendar

A tiny static site where I publish everything I'm planning while off work,
and friends put their name down to join.

Live at: https://veraborvinski.github.io/unempoyment-calendar/

## How it works

- All activities live in **one file**: [`src/data/events.json`](src/data/events.json)
- To add or change events: edit the file, then commit and push. A GitHub
  Actions workflow validates the data, rebuilds the site, and deploys it
  automatically.
- Friends RSVP through my Google Form; each event's "Count me in" button
  opens it pre-filled with that event's name. Responses land in my Sheet.
- Capacity caps are enforced by me: when an event fills up I flip its
  `attendeesFull` flag and the card shows **full**.

See [`docs/google-form.md`](docs/google-form.md) for the full RSVP setup.

## Adding an activity

Copy an entry in `src/data/events.json` and fill in:

| Field | Required | Notes |
|-------|----------|-------|
| `id` | yes | unique slug, e.g. `2026-09-05-hike` |
| `title` | yes | |
| `date` | yes | `YYYY-MM-DD` |
| `startTime` / `endTime` | start yes, end optional | 24h `HH:MM` |
| `category` | recommended | `outdoors`, `food`, `games`, `culture`, `chill` |
| `location.name` / `location.mapsUrl` | name recommended | Maps link makes the location clickable |
| `notes` | no | the sales pitch |
| `maxAttendees` | no | renders a "max N" chip |
| `attendeesFull` | no | set `true` when the cap fills up |
| `formPrefillLabel` | yes* | must exactly match the form dropdown option (*required once the form is live) |

Check your edits locally with:

```bash
npm install     # first time only
npm run check-events
npm run dev     # preview at localhost:4321
```

The deploy build fails loudly if the data file has errors, so a bad push
never breaks the site.

## Development

Built with [Astro](https://astro.build), zero client frameworks.

```bash
npm run dev       # local dev server
npm run build     # validate data + build to dist/
npm run preview   # preview the production build
```

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`. One-time setup in
the GitHub repo settings: **Settings -> Pages -> Build and deployment ->
Source: GitHub Actions**.

## Project management

Task tracking runs on [beads](https://github.com/steveyegge/beads) (`bd`):

```bash
bd ready    # see unblocked work
bd show <id>
bd close <id>
```

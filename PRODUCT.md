# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Vera's friend group, mostly on phones, checking what she's up to this month and deciding whether to join. They arrive from a shared link, skim fast, and act on impulse. Vera herself is the only maintainer.

## Product Purpose

The Unemployment Calendar publishes everything Vera plans to do while off work, grouped by date, so friends can put their name down. Success is a friend opening the page, laughing, and hitting "Count me in" within seconds.

## Positioning

An entire month of one person's free time published as an open invitation, maintained by editing a single JSON file and pushing. No app, no accounts, no backend - the crude directness IS the product. An event platform could not copy the intimacy or the joke.

## Operating Context

Deployed statically at veraborvinski.github.io/unempoyment-calendar/. Updates happen exclusively via git push to events.json. RSVPs are collected through one Google Form opened pre-filled per activity; responses land in a Sheet only Vera reads. Capacity limits are enforced manually by flipping an attendeesFull flag.

## Capabilities and Constraints

- Agenda list grouped by date; days carry multiple stacked activities
- Category chips (outdoors/food/games/culture/chill), time ranges, Maps links, notes
- maxAttendees chip and attendeesFull "full" state, both manual
- Join button opens the Google Form pre-filled with formPrefillLabel; graceful fallback until configured
- Past days dim automatically client-side; no dark mode required (owner released it)
- Mobile-first; static Astro build; base path /unempoyment-calendar/; no client framework
- Build fails loudly on invalid events.json

## Brand Commitments

- Name: "The Unemployment Calendar"
- Voice: self-deprecating unemployment humor, confident and warm, never corporate
- Pinned aesthetic direction from owner, binding: fun, loud, and a little ugly
- Explicit anti-reference: it must never look like a clean/corporate SaaS landing page
- No emoji in copy or UI

## Evidence on Hand

- src/data/events.json: nine real sample activities (hikes, trivia, potluck, pasta night) with jokes in notes fields
- docs/google-form.md: RSVP pipeline documentation
- No photography, logos, or illustration assets exist yet

## Product Principles

1. The join action must be findable and understandable within seconds of landing
2. Humor carries the brand; polish that sandpaper the joke off is failure
3. Everything is maintainable by one non-designer editing data files
4. Loud means committed, not cluttered: chaos with intent

## Accessibility & Inclusion

Standard floor: body text contrast >=4.5:1 despite the loud palette; large touch targets; readable type on small screens.

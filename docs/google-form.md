# Google Form setup guide

The site's "Count me in" buttons open a single Google Form with the activity
name pre-filled, so every response lands in one Sheet and always tells you
which event it belongs to.

## 1. Create the form

Go to https://forms.google.com and create a form titled something like
"Unemployment Calendar RSVP". Add these questions, in this order:

| # | Question | Type | Required | Notes |
|---|----------|------|----------|-------|
| 1 | Your name | Short answer | Yes | |
| 2 | Which activity? | Dropdown | Yes | Options must match each activity's `formPrefillLabel` **exactly** |
| 3 | How many guests are you bringing? | Short answer | No | |
| 4 | Anything else? (allergies, ideas, complaints) | Paragraph | No | |

## 2. Link a responses Sheet

In the form: **Responses -> Link to Sheets -> Create a new spreadsheet**.
This Sheet is your attendee list; the site itself never stores signups.

## 3. Get the pre-fill pieces

1. In the form editor, click the three-dot menu -> **Get pre-filled link**.
2. Pick any dropdown option, click **Get link**, and copy it. It looks like:

   ```
   https://docs.google.com/forms/d/e/FORM_ID/viewform?usp=pp_url&
     entry.123456789=Sep+5+-+Discovery+Park+Hike
   ```

3. Copy the two parts into `src/data/form-config.json`:

   ```json
   {
     "formUrl": "https://docs.google.com/forms/d/e/FORM_ID/viewform",
     "activityEntryId": "123456789"
   }
   ```

   - `formUrl`: everything up to (but not including) the `?`
   - `activityEntryId`: the number after `entry.` for question 2

Commit and push. Every event card's "Count me in" button will now open the
form with that event already selected.

## 4. Keep the dropdown in sync

Whenever you add an activity to `src/data/events.json`, add a matching option
to the form dropdown with the exact same text as its `formPrefillLabel`
(including capitalization and dashes). If they differ, the pre-fill silently
shows a blank answer.

Tip: keep labels short and unique, e.g. `Sep 5 - Discovery Park Hike`.

## 5. Marking events full

The static site cannot count responses automatically. When an event with a
`maxAttendees` cap fills up (check your Sheet), set `"attendeesFull": true` on
that activity in `events.json`, commit, push. The card shows a **full** badge
and the button area says so too.

## 6. Removing old options

When a past event drops off the site, you can remove its dropdown option -
old rows in the responses Sheet keep their text either way.

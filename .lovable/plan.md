# Visitor Reviews

## What to build
- Add a review section on Home where visitors can leave a name, a 1–5 star rating, and a short review.
- Save valid reviews in Lovable Cloud and show submitted reviews in the same section.
- Keep the experience accessible on mobile and consistent with BK Melodies' existing style.

## Technical details
- Add a `reviews` table with bounded fields, public read/insert access, and row-level validation; grant only the required roles.
- Validate the form with the project's existing validation tooling and show clear success/error states.
- Verify review submission and display in the running site.

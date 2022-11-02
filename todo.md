# TODO

## Feat: Anonymous Joiners

- Prevent logged-in user from accessing /join route? (redirect)
- Tidy up Alert component for note in /join page
- We /could/ allow anon users to leave a ride

## Next 13

- Upgrade to use hook
- Hoist const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {}); to layout state or context?

## Planner

- Planner persists month in state (or route), so that back button doesn't jump to today
- Remove edit/add/delete Menu options for past dates (API guards)
- Add API guards for edit/add/delete/join on past dates

## Admin/Leader Forms

- Route guards on API, pages above for leaders

## Engineering / Perf

- Alternative Auth? Socials etc.
- Setup PWA
- Remove fontawesome icons
- Redirect user to profile on first login?
- Clear localStorage after sign in?
- Move route guard redirects to edge middleware

## Could Do (Low pri)

- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

  ## Who's out view TBD

- View to show all riders out on a day (presumably only for logged-in users..)
- /riders/[date]
- Needs a new api and query

## Cosmetic Snags

- last-child borders in calendar days
- Click outside of menu closes it

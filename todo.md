# TODO

## Feat: Anonymous Joiners

- How does anon user know they have joined...?
- Prevent logged-in user from accessing /join route?

## Next 13

- Upgrade to use hook. Might improve rides/{id} persist

## Planner

- Planner persists month in state (or route), so that back button doesn't jump to today
- Remove edit/add/delete Menu options for past dates (API guards)
- Add API guards for edit/add/delete/join on past dates

## Admin/Leader Forms

- Route guards on API, pages above for leaders

## Engineering / Perf

- fix permalinks for ride/{id}
- Setup PWA
- Remove fontawesome icons
- Alternative Auth? Socials etc.
- Redirect user to profile on first login?
- Move route guard redirects to edge middleware
- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

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
- Improve menu: https://headlessui.com/react/menu

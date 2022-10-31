# TODO

## Rides

- Change cron task to generate all rides for next month (on 1st of current month) (generateRides)

## Feat: Anonymous Joiners

- Add emergencyContact to user schema
- Only leader can see this number in rides
- Anonymous users can join but not leave - reuse User form?

## Next 13

- Upgrade to use hook. Might improve rides/{id} persist

## Planner

- Planner persists month in state (or route), so that back button doesn't jump to today
- Remove edit/add/delete Menu options for past dates (API guards)

## Admin/Leader Forms

- Route guards on API, pages above for leaders
- Form cleansing (values)

## Engineering / Perf

- fix permalinks for ride/{id}
- Setup PWA
- Remove fontawesome icons
- Alternative Auth? Socials etc.
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

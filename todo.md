# TODO

## Long press

- Usability of Long Press? Try touchStart/touchMove hook

## Feat: Anonymous Joiners

- Add emergencyContact to user schema
- Anonymous users can join but not leave - reuse User form?

## Rides

- Create sunday rides bulk defaults (and saturday socials)
- Set bulk ride meeting points
- Add an API key and setup GH cron workflow
- Show 'unready' rides, e.g. default leader, dist, etc.
- Duplicate ride?

## Admin/Leader Forms

- Route guards on API, pages above for leaders
- Form cleansing (values)

## Engineering / Perf

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
- Improve menu: https://headlessui.com/react/menu

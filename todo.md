# TODO

## Users

1. Anonymous users can join but not leave
2. Usability of Long Press? Try touchStart/touchMove hook

- View to show all riders out on a day (presumably only for logged-in users..)

  - /riders/[date]
  - Needs a new api and query

## Rides

- Create sunday rides bulk defaults (and saturday socials)
- Set bulk ride meeting points

## Admin/Leader

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

## Cosmetic Snags

- last-child borders in calendar days
- Improve menu: https://headlessui.com/react/menu

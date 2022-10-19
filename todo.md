# TODO

## Users

1. Anonymous users can join but not leave
2. Usability of Long Press? Try touchStart/touchMove hook
3. USER can only join one ride per day

- View to show all riders out on a day (presumably only for logged-in users..)

  - /riders/[date]
  - Needs a new api and query

## Admin/Leader

- /ride/planner/[date] view

  - Use a variation of /api/rides query with to, from date params
  - Update indexes in Ride schema (notes?, group?)
  - Use a variation of / page, listing only rides on day from query
  - If Saturday and no Paceline rides, button to generate them (+)
  - (Same for Sunday?)

- Route guards on API, pages above for leaders

- Form cleansing (values)

## Engineering / Perf

- Setup PWA
- Remove fontawesome icons
- Locally host fonts
- Alternative Auth? Socials etc.
- Move route guard redirects to edge middleware
- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

## Database Indexes and Schema

- User.createdAt
- Ride.deleted
- Bulk creation of users? Probably not
- Group non-mandatory?

## Could Do (Low pri)

- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

- Alternative Auth? Socials etc.

## Cosmetic Snags

- Better badges on mobile calendar
- last-child borders in calendar days
- Improve menu: https://headlessui.com/react/menu

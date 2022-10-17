# TODO

## Users

- Anonymous users can join but not leave
- USER can only join one ride per day

- View to show all riders out on a day (presumably only for logged-in users..)

- Usability of Long Press?
- Improve menu: https://headlessui.com/react/menu

## Admin/Leader

- Form cleansing (values)

- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Engineering / Perf

- Setup PWA
- Create fresh data for PL rides up to 6 months! (As an API..)
- Alternative Auth? Socials etc.
- Move route guard redirects to edge middleware
- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

## Database Indexes and Schema

- User.createdAt
- Ride.deleted
- Bulk creation of users? Probably not
- Group non-mandatory?

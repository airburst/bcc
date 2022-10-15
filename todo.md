# TODO

## Pages

## Admin/Leader

- Form cleansing (values)

- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Users

- TEST: CANNOT add a ride or delete one

- USER can only join one ride per day
- Anonymous users can join but not leave
- User profile: change password, set name and mobile : forgotten password ???
- Jank when user joins / leaves a ride (repaints "Going" section)

- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts

- View to show all riders out on a day (presumably only for logged-in users..)

- Usability of Long Press?

## Engineering / Perf

- Setup PWA
- Create fresh data for PL rides up to 6 months! (As an API..)
- Alternative Auth? Socials etc.

## Database Indexes and Schema

- User.createdAt
- Ride.deleted
- Bulk creation of users? Probably not
- Group non-mandatory?

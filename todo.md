# TODO

## Pages

## Admin/Leader

- Remove UTC hour when reading for form (live?) 60s offset!!
- Confirm before delete
- Show delete waiting
- Consistent times for browser and mobile!!

- Form cleansing (values)
- Create fresh data for PL rides up to 6 months! (As an API..)
- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Users

- CANNOT add a ride or delete one
- Anonymous users can join but not leave
- USER can only join one ride per day
- User profile: change password, set name and mobile : forgotten password ???
- Jank when user joins / leaves a ride (repaints "Going" section)

- View to show all riders out on a day (presumably only for logged-in users..)

- Animate user menu, TBC

## Engineering / Perf

- Setup PWA
- Edge deployment (hot loads)?
- Alternative Auth? Socials etc.

## Database Indexes and Schema

- User.createdAt
- Ride.deleted
- Bulk creation of users? Probably not
- Group non-mandatory?

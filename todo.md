# TODO

## Pages

## Admin/Leader

- LEADER can edit a ride (decide route, add query)
- LEADER can delete a ride
- Animation loaders on buttons
- Form cleansing (values)
- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Users

- Anonymous users can join but not leave
- USER can only join one ride per day

- View to show all riders out on a day (presumably only for logged-in users..)

- Create fresh data for PL rides up to 6 months! (As an API..)
- User profile: change password, set name and mobile : forgotten password ???
- Animate user menu, TBC

## Engineering / Perf

- Setup PWA
- Alternative Auth? Socials etc.
- Handle useSession jank?
- add long expiry to js,css,image assets on host?
- Add tables to support multi-tenacy

## Database Indexes

- User.createdAt
- Bulk creation of users? Probably not

## Snags

- Jank when user joins / leaves a ride (repaints "Going" section)

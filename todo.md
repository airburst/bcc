# TODO

- Refactor Rider component with toggle for emergency number (on mobile)

- Investigate backups of DB

- Experiment with Push Notifications for cancelled rides
- https://www.youtube.com/watch?v=Bm0JjR4kP8w

- Add API guards for edit/add/delete/join on past dates
- Route guards on API, pages above for leaders

- Leaders linked by id: only show riders for MY rides
- https://www.riderhq.com/api/reference
- We /could/ allow anon users to leave a ride

## Next 13

- Upgrade to use hook
- Hoist const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {}); to layout state or context?

## Engineering / Perf

- Setup PWA
- Remove fontawesome icons
- Refactor RideDetails
- Redirect user to profile on first login?
- Clear localStorage after sign in?
- Move route guard redirects to edge middleware

## Auth

- User management screens (Admin only)
  - list users (with search)
  - Get/update user - incl make Leader
  - Delete user
  - Block user
- Using Auth0 management API to list, block users

## Cosmetic Snags

- last-child borders in calendar days
- Click outside of menu closes it
- Planner persists month in state (or route), so that back button doesn't jump to today

## Could Do (Low pri)

- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts
- Leaflet maps for meeting point, route?

  ## Who's out view TBD

- View to show all riders out on a day (presumably only for logged-in users..)
- /riders/[date]
- Needs a new api and query

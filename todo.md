# TODO

## Priorities

### 2

- Copy ride: "Needs calendar to be unlocked, so that historic days and rides can be reached. Not only past rides. Might want to copy a future ride? For past rides, block edit/delete but add a new option to 'Copy ride', which populates a 'new ride' form."
- Add rider notes after joining

### 3

- Preference for miles or km
- Filtering rides
- Planner persists month in state (or route), so that back button doesn't jump to today

## Next 13

- Upgrade to use hook
- Hoist const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {}); to layout state or context?

## Engineering / Perf

- Add API guards for edit/add/delete/join on past dates
- Route guards on API, pages above for leaders
- Setup PWA
- Remove fontawesome icons
- Refactor RideDetails
- Clear localStorage after sign in?

## Auth

- User management screens (Admin only)
  - list users (with search)
  - Get/update user - incl make Leader
  - Delete user
  - Block user
- Using Auth0 management API to list, block users

## Cosmetic Snags

- last-child borders in calendar days

## Could Do (Low pri)

- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts
- We /could/ allow anon users to leave a ride
- Leaflet maps for meeting point, route?
- Experiment with Push Notifications for cancelled rides

  - https://www.youtube.com/watch?v=Bm0JjR4kP8w

  ## Who's out view TBD

- View to show all riders out on a day (presumably only for logged-in users..)
- /riders/[date]
- Needs a new api and query

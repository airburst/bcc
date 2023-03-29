# TODO

## State

- Investigate using signal-based state (for ride cancelled in menu)
- if cancelled, do not show cancel menu entry

## Perf

- Archive old rides and empty rides
- Reconcile with members
- Turn off anonymous access and accounts TBD
- database.js - activate .env and change all queries

- Dynamic imports to reduce bundle size
- Fonts
- Stop jank when joining ride

## Notes Editor

- Add Markdown editor TBC

## Next 13 App Router and RSC

- Upgrade to use hook
- Hoist const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {}); to layout state or context?

## Auth

- User management screens (Admin only)
  - list users (with search)
  - Get/update user - incl make Leader
  - Delete user
  - Block user
- Using Auth0 management API to list, block users

## Could Do (Low pri)

- Planner persists month in state (or route), so that back button doesn't jump to today
- Experiment with Push Notifications for cancelled rides

  - https://www.youtube.com/watch?v=Bm0JjR4kP8w

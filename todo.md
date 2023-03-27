# TODO

- Investigate using signal-based state (for ride cancelled in menu)
- if cancelled, do not show cancel menu entry

## Notes Editor

- Add Markdown editor TBC

## Perf

- Archive old rides and empty rides
- Reconcile with members
- Turn off anonymous access and accounts TBD

- Dynamic imports to reduce bundle size
- Fonts
- Stop jank when joining ride

## Next 13

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

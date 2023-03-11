# TODO

## DaisyUI

- Cancelled badge

  - add column to Ride table in schema
  - add api cancel-ride method
  - if cancelled, use flag to show badge and prevent join

- Change menu dropdown

## Perf

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

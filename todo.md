# TODO

## Priorities

### Next up

## DaisyUI

- Add SVG icons
- Change menu dropdown
- remove fontawesome
- Set filters with context instead of atom?

- Planner persists month in state (or route), so that back button doesn't jump to today

## Next 13

- Upgrade to use hook
- Hoist const [anonRider] = useLocalStorage<AnonymousUser>("bcc-user", {}); to layout state or context?

## Engineering / Perf

- Refactor session object and hold in local context
- Clear localStorage after sign in?
- Add API guards for add/delete/join on past dates
- Route guards on API, pages above for leaders
- Setup PWA

## Auth

- User management screens (Admin only)
  - list users (with search)
  - Get/update user - incl make Leader
  - Delete user
  - Block user
- Using Auth0 management API to list, block users

## Could Do (Low pri)

- Cosmetic: last-child borders in calendar days
- Secure API with middleware and expiring signed token?
  https://github.com/vercel/examples/blob/main/edge-functions/basic-auth-password/middleware.ts
- Experiment with Push Notifications for cancelled rides

  - https://www.youtube.com/watch?v=Bm0JjR4kP8w

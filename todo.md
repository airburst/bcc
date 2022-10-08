# TODO

## Pages

- Use UTC time!
- Add ride time and date to details page
- Create fresh data for rides

- Remove all CSR queries for perf
- Prefetch all ride/{id} data

```javascript
useEffect(() => {
  router.prefetch("/contact");
}, []);
```

- redirect on ellipsis menu; don't allow one-click join

- Anonymous (localStorage) users can join but not see riders, or leave

- precommit hooks (test, check-types, lint)
- use SVG icons instead of fontawesome

- ADMIN role can remove any rider
- ADMIN role can add any rider (which might mean creating a user account!)

- Show avatar and menu?
- User change profile? Password? Set mobile?

## Admin/Leader

- Add / edit ride form
- delete ride
- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Engineering

- Add PWA manifest
- add long expiry to js,css,image assets on host?
- Add tables to support multi-tenacy

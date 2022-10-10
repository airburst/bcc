# TODO

## Snags

- Jank when user joins / leaves a ride (repaints "Going" section)

## Pages

- Fix bug in production console: https://stackoverflow.com/questions/73005663/next-js-new-date-constructor-throwing-console-errors
- precommit hooks (test, check-types, lint)
- Create fresh data for PL rides up to 6 months! (As an API..)

- Anonymous (localStorage) users can join but not see riders, or leave

- ADMIN role can remove any rider
- ADMIN role can add any rider (which might mean creating a user account!)

- Show avatar and menu?
- User change profile? Password? Set mobile?

## Admin/Leader

- Add / edit ride form
- delete ride
- View of rides on calendar
- (https://github.com/moodydev/react-calendar/blob/master/src/components/Calendar.jsx)

## Engineering / Perf

- Setup PWA
- add long expiry to js,css,image assets on host?
- Add tables to support multi-tenacy

## Database Indexes

- User.createdAt

## Dynamic imports

```javascript
// SimpleBarChart.dynamic.tsx
import dynamic from 'next/dynamic';
import { SimpleBarChart } from './SimpleBarChart';

export const SimpleBarChartDynamic = dynamic(
  () => import('./SimpleBarChart' /* webpackChunkName: "SimpleBarChart" */).then((mod) => mod.SimpleBarChart as any),
  { ssr: false }
) as typeof SimpleBarChart;

//or

handleScrollToTop() {
    import('react-scroll').then(scroll => {
      scroll.animateScroll.scrollToTop({
      })
    })
  }
```

# TODO

## Pages

- precommit hooks (test, check-types, lint)

- Anonymous (localStorage) users can join but not see riders, or leave
- USER can only join one ride per day

- Create fresh data for PL rides up to 6 months! (As an API..)
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

## Snags

- Jank when user joins / leaves a ride (repaints "Going" section)

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

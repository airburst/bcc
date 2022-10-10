# TODO

## Pages

- redirect on ellipsis menu; don't allow one-click join
- favicon and PWA
- Create fresh data for PL rides up to 6 months! (As an API..)

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

https://medium.com/ne-digital/how-to-reduce-next-js-bundle-size-68f7ac70c375

https://stackoverflow.com/questions/66014730/next-js-bundle-size-is-exploding-as-a-result-of-dynamic-component-lookup-how-to

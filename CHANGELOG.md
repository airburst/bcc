# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.6.1] - 2022-10-19

### Fixed

- Husky pre-commit setup

## [0.6.0] - 2022-10-19

Planner (calendar) API and view updated with working navigation and visual indication of rides on each day.

### Added

- /api/rides accepts a query string with `start` and `end` dates to return rides within the range
- Calendar navigation (next and last month) mutates rides queries, to refetch data if not cached
- Display rounded badge with ride counts on mobile and list of ride badges on larger screens
- Added styling for 'today' in calendar

## [Pre-0.6.0] - 2022-10-01

Created the project baseline in NextJS, using the T3 Stack (TypeScript, Prisma ORM, TailwindCSS and Next-auth) and connecting to a SQL database, hosted on PlanetScale. Added database authentiction using Auth0 and SWR for client-side queries and mutations.

Setup a core Layout with Header and Main content areas, with public APIs and pages for users as follows:

| Route      | Page                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| /          | List of upcoming rides                                                  |
| /ride/{id} | Ride details, view of riders going ability to join/leave (if signed in) |

..and guarded APIs and pages for leaders as follows:

| Route           | Page                  |
| --------------- | --------------------- |
| /ride/new       | Form to create a ride |
| /ride/{id}/edit | Form to change a ride |
| /planner        | Calendar view         |

# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.13.0]

### Added

- Capture emergency contact number for users in profile
- Leaders can see emergency contact info in ride details view
- Allow anonymous users to join rides

## [0.12.0]

### Added

- Create full month of rides on schedule
- Added midweek rides (Tue, Wed ride and hills, Ladies Friday)

### Changed

- Default view is two weeks of rides ahead

## [0.11.3]

### Fixed

- Get last/next month fixed for calendar planner view

## [0.11.2]

### Changed

- Removed 'add all rides' paceline button from planner/{day} view. These rides will be added from a controlled cron job.
- Prevent adding a ride for an historic date

## [0.10.0]

### Added

- Validation for minimum ride distance
- Added notes and meeting point to rides
- Group is no longer mandatory
- Show notes section on ride details
- Replaced long press on cards with faster swipe detection; speeds up navigation to ride details page
- Added notes and meeting point to Paceline rides

## [0.7.0] - 2022-10-20

### Added

- /ride/planner/[date] view shows rides on a given day, and a button to add a new ride (populated with that date)
- Add Paceline rides in bulk from planner (if day is in future, is a Saturday and has no pre-existing PL rides)

## [0.6.2] - 2022-10-19

### Changed

- Use NextJS font optimization strategy for Google Font

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

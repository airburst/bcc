# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.9.0] - 2023-03-01

### Changed

- Made calendar taller for screens that allow

## [1.8.0] - 2023-02-27

### Changed

- Upgraded dependencies for NextJS (major version 13)
- Changed session schema to include user object
- Added indexes to join tables in Prisma
- Removed privacy template page

## [1.7.2] - 2023-02-27

### Fixed

- Change Sunday rides winter end date to end of February.

## [1.7.0] - 2022-12-28

### Changed

- Allow riders to join or leave a ride up to 12 hours after it has started.

## [1.6.1] - 2022-11-29

### Changed

- Updated default leaders and notes for Sunday and Wednesday rides.

## [1.6.0] - 2022-11-23

### Added

- Added menu entry to copy ride link

## [1.5.0] - 2022-11-20

### Added

- Added Progressive Web APp (PWA) support, for offline use
- Animate changes to ride cards when applying filters

## [1.4.0] - 2022-11-19

### Added

- "Forever" option in weeks ahead filter, which fetches all future rides in the system
- Added link to release notes

### Changed

- Rider "Notes" are now "Messages"

## [1.3.0] - 2022-11-18

### Added

- Adds a filter feature to main rides page. Rides can be filters by rides a user has joined and by a query match on ride name, group, destination or leader.
- User can change look ahead from 2 to 8 weeks
- settings are saved between visits

## [1.2.0] - 2022-11-17

### Added

- Adds an `/embed` route which strips out header and any user interaction (join, etc.). Intended for use as a read-only view of rides.

## [1.1.1] - 2022-11-14

### Added

- Clear localStorage if user signs in. Removes conflict with anonymous users

## [1.1.0] - 2022-11-14

Adds the first user preference in Settings menu; units in km or miles.

### Added

- Add default preferences (km) in constants and section in settings form
- Convert and display all distances in correct units
- Convert all submitted rides to use kms

### Changed

- Profile menu renamed to 'Settings'
- Change update API and hook to include preferences

## [1.0.0] - 2022-11-14

This is the first release of the rides app with essential features.

### Added

- SQL queries folder; some initial reports

## Previous Versions

- [Version 0 change log](./CHANGELOG-v0.md)

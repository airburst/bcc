# BCC Rides App

Proof of concept ride planner for club.

## Installation

This app is built with [NextJS](https://nextjs.org/) and uses Next Auth, Prisma and a MySQL database (hosted on PlanetScale). because of the Next Auth dependency, Node 18 is not currently supported. Use [nvm](https://github.com/nvm-sh/nvm) to install and use version 16.

```bash
git clone git@github.com:airburst/bcc.git

cd bcc && npm install
```

Add a `.env` file: Copy `.env.example` and populate values for your database and auth provider. The convenience script `npm run connect` will create a proxy to a PlanetScale db if you choose to host there.

Run this command to publish the Prisma schema to db:

```bash
npm run pushdb
```

And then launch in dev mode:

```bash
npm run dev
```

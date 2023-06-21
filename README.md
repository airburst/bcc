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

## Making database schema changes

Schema changes cannot be pushed directly to production (main branch). Read more [here](https://www.prisma.io/docs/guides/database/using-prisma-with-planetscale).

1. Make desired DDL changes to `prisma/schema.prisma`
2. Connect to a non-production PlanetScale db instance:

```bash
yarn connect:dev
```

3. Deploy changes to a non-production database:

```bash
yarn pushdb
```

3. Once you are happy with your changes on your development branch, you can open a deploy request to deploy these to your production branch.

- Navigate to [https://app.planetscale.com/mark-fairhurst/bcc-rides/dev](https://app.planetscale.com/mark-fairhurst/bcc-rides/dev)
- Click `Create Deploy Request`
- If that passes, click `Deploy Changes`

## Making a copy of the app

See [Customisation docs](./CUSTOMISATION.md).

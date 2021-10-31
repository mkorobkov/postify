# Wrangler preparations

## for development on https://\*.\*.workers.dev/
```
# run and update wrangler.toml file
wrangler kv:namespace create DOCUMENTS_KV
wrangler secret put JWT_SECRET
wrangler secret put FAUNA_KEY
```
## for production
```
# run and update wrangler.toml file
wrangler kv:namespace create DOCUMENTS_KV --env production
wrangler secret put JWT_SECRET --env production
wrangler secret put FAUNA_KEY --env production
```

# fauna

Create database

https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers

```shell
CreateCollection({name: "Documents"})
```

Go to the Security section of the dashboard and create a new key with the Server role

`wrangler secret put FAUNA_KEY`

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte);

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

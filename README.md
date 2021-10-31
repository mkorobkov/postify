## What

Simple project to create sharable documents inspired by telegra.ph

## Why

For fun. To play with cloudflare workers & svelte. Serve documents across cloudflare network via KV. Using faunadb for data consistency.

___

## Wrangler preparations

### for development on https://\*.\*.workers.dev/
```
# run and update wrangler.toml file
wrangler kv:namespace create DOCUMENTS_KV
wrangler secret put JWT_SECRET
wrangler secret put FAUNA_KEY
```
### for production
```
# run and update wrangler.toml file
wrangler kv:namespace create DOCUMENTS_KV --env production
wrangler secret put JWT_SECRET --env production
wrangler secret put FAUNA_KEY --env production
```

## fauna

Create database

https://fauna.com/blog/getting-started-with-fauna-and-cloudflare-workers

```shell
CreateCollection({name: "Documents"})
```

Go to the Security section of the dashboard and create a new key with the Server role

`wrangler secret put FAUNA_KEY`

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@0.13.0 create --template minimal --types ts --add prettier eslint vitest="usages:unit,component" playwright tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:cloudflare+cfTarget:pages" devtools-json --install pnpm yf-team-web
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Cloudflare Pages Deployment

This project targets Cloudflare Pages (not a standalone Worker).

Use these commands locally:

```sh
pnpm run build
pnpm run deploy
```

The `deploy` script is:

```sh
wrangler pages deploy .svelte-kit/cloudflare --project-name yf-team-web
```

If your Cloudflare build logs show `Executing user deploy command: npx wrangler deploy`,
your project is using the wrong deploy command. Update your Cloudflare Pages build settings:

- Build command: `pnpm run build`
- Deploy command: `pnpm run deploy`

Do not use `npx wrangler deploy` for this project, because it is for Workers and will fail
with missing entry-point/assets errors.

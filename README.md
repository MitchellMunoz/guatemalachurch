# Content module
run npx nuxt module add content


# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev

```

## Prisma 
The Better Auth CLI allows you to generate or migrate your database schema 

npx @better-auth/cli@latest generate



## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Dev Environment settings:

### TL;DR - If you want eslint to run in vscode - consider node 20

Due to some odd runtime quirks (seemingly due to node wanting to fallback to electron-native bindings), node v22 doesn't seem to play nice with vscode and eslint. For the time being I'd encourage using node v20

- Use Node 20.x (nvm use auto-picks from .nvmrc) consider installing nvmrc `brew install nvmrc` and consider putting https://github.com/nvm-sh/nvm?tab=readme-ov-file#zsh in your zsh or bash
- Run npm install (postinstall generates .nuxt/ files)

If ESLint errors don’t show in vscode: View → Output → ESLint and ensure you’re on Node 20.

### IF you really really want to use node 22 and want a challenge.

If you see console errors fron the ESLint output `Cannot find native binding … unrs-resolver":`

- Try running `npm rebuild unrs-resolver --build-from-source` and God speed.




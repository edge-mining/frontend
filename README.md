# Edge Mining Frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### TODO

- Implement Backend Endpoints: Add the missing routes (GET/POST/DELETE for policies and rules, POST for start/stop miner) in the FastAPI adapter.
- Complete Actions in Stores: Implement the missing API calls in Pinia actions (start/stop miner, update/delete/activate policy).
- Polling/WebSockets: Implement a mechanism to update the miner status in real-time on the dashboard (e.g., setInterval in the miners store or use WebSockets if the backend supports them).
- Improve Forms: Add more robust validation to the forms, especially the rules form (perhaps with separate inputs for key/value condition instead of raw JSON).
- UI Error Handling: Display API errors to the user more clearly (e.g., using a notification/toast component).
- Loading States: Show more granular loading indicators during API calls.
- Styling: Apply a more refined style, perhaps using Tailwind CSS or another library to get closer to the look and feel of Mempool.space.
- Testing: Add unit and integration tests.
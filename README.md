# SoPra FS24 User Management Client

A React front end for registering, logging in, browsing registered users and viewing or editing a user profile, written for the individual assignment of the Software Engineering Lab (SoPra) at the University of Zurich, spring semester 2024. It is built on the course's React client template.

It talks to the REST API of [sopra-fs24-roger-server](https://github.com/rogerjeasy/sopra-fs24-roger-server).

## Status

The pages are implemented, but the current server does not support all of them: profile editing and logout call endpoints that are commented out on the server, and the server's login endpoint behaves like registration. See [Known gaps](#known-gaps).

## Pages

Routes are defined in `src/components/routing/routers/AppRouter.js`.

| Route | View | What it does | API call |
|---|---|---|---|
| `/` | `HomePage` | Buttons leading to Login and Register. | |
| `/register` | `Register` | Username and password form. On success stores the returned `token` and `id` in `localStorage` and opens the dashboard. | `POST /users` |
| `/login` | `Login` | Username and password form (password is masked). Only reachable without a stored token (`LoginGuard`). | `POST /users/login` |
| `/game/dashboard` | `Game` | List of registered users; clicking one opens its profile. Buttons for Edit My Profile and Logout. Requires a stored token (`GameGuard`). | `GET /users`, `POST /users/logout/{id}` |
| `/profile` | `Profile` | Shows username, status, creation date and birthday of the selected user. | `GET /users/{id}` |
| `/editProfile` | `EditProfile` | New username and a birthday date picker (future dates disabled). | `PUT /users/{id}` |

## Tech stack

- React 18, TypeScript and JavaScript, React Router 6
- Axios for HTTP (`src/helpers/api.js`), Sass for styles
- Create React App (`react-scripts` 5), Jest test runner
- Google App Engine (`app.yaml`), GitHub Actions

## Project structure

```
src/
  App.tsx                     header + router
  components/
    routing/routers/          AppRouter, GameRouter
    routing/routeProtectors/  GameGuard, LoginGuard
    views/                    HomePage, Login, Register, Game, Profile, EditProfile, Header
    ui/                       Button, BaseContainer, Spinner, ReactLogo
  helpers/                    api.js (Axios instance, error helper), getDomain.js, isProduction.js
  models/User.js
  styles/                     SCSS theme, UI and view styles
app.yaml                      App Engine static hosting config
.github/workflows/main.yml    build and deploy workflow
```

## Getting started

### Prerequisites

- Node.js 20 (`package.json` pins `engines.node` to 20.11.0) with npm
- The server running locally, see [sopra-fs24-roger-server](https://github.com/rogerjeasy/sopra-fs24-roger-server)

### Install and run

```bash
npm install
npm run dev
```

The app opens on http://localhost:3000 and reloads on changes.

### Backend URL

`src/helpers/getDomain.js` picks the API base URL: `http://localhost:8080` in development, and a hard-coded App Engine URL when `NODE_ENV` is `production` (that is, in `npm run build` output). Change the production URL there if you deploy the server elsewhere. There are no other environment variables.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server on port 3000. |
| `npm run build` | Production build into `build/`. |
| `npm start` | Serve `build/` with `serve -s build`. |
| `npm test` | Run Jest in watch mode (`react-scripts test --env=jsdom`). |

The only test is `src/App.test.js`, which checks that the app renders without crashing. On macOS, if you hit an `fsevents` error when running tests, see https://github.com/jest-community/vscode-jest/issues/423.

## Deployment

- `app.yaml` serves the built `build/` folder as static files on the App Engine `nodejs20` runtime, with every unknown path falling back to `index.html` so client-side routes work.
- `.github/workflows/main.yml` runs `npm install` and `npm run build` on every push to `main`, then deploys to App Engine using a `GCP_SERVICE_CREDENTIALS` repository secret.

The App Engine deployment from the course is no longer running.

## Known gaps

- `PUT /users/{id}` (Edit Profile) and `POST /users/logout/{id}` (Logout) are commented out in the current server (it answers 405 and 404), so these actions fail with an error alert.
- The server's `POST /users/login` registers new usernames and rejects existing ones, so logging in as an already registered user fails.
- The server's user response has no `token` field, so the client stores the string `undefined` as its token. The route guards only check that some token exists.
- `/profile` and `/editProfile` are not guarded. Both use the `id` in `localStorage`, which is overwritten when you open another user's profile from the list, so Edit Profile then targets that user.
- `Register` shows the "user name already exists" message only for 409, while the server answers 400 for a taken username.

## Context

Built on the React client template from the University of Zurich SoPra course (Software Engineering Lab, FS24), which provided the project setup, base UI components, route guards, Axios helper and App Engine workflow. The registration, profile and edit-profile views and the routing changes are the owner's own work.

## License

Apache License 2.0, see [LICENSE](LICENSE).

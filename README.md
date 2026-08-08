# ONYX Tools

A basic React + Vite app for a collection of administration tools used by ONYX Nails.

## Features

- Build on Node v22.23.2
- React 19 with Vite for fast development and build performance
- SASS support for component styles
- ESLint for code quality
- GitHub Pages deploy support via `gh-pages`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal. Vite supports hot module replacement (HMR) for fast UI iteration.

## Available Scripts

- `npm run dev` - start Vite development server
- `npm run build` - build the app for production
- `npm run preview` - locally preview the production build
- `npm run lint` - run ESLint across the project
- `npm run deploy` - deploy the `dist` folder to GitHub Pages

## Project Structure

```text
src/
  App.jsx
  main.jsx
  index.css
  App.css
  apps/             # app-specific pages or feature sections
  components/       # shared UI components
  fields/           # reusable form and input components
  styles/           # global styles and SCSS helpers
public/             # static assets served directly
vite.config.js      # Vite configuration
package.json        # dependencies and scripts
```

## Dependencies

- `react`
- `react-dom`
- `react-router`
- `bootstrap`
- `papaparse`
- `sass`

## Development Tips

- Keep shared UI and form logic in `src/components`
- Place page-specific app logic in `src/apps`
- Use `src/styles/_variables.scss` and `src/styles/_mixins.scss` for reusable styles

## Deployment

This project is configured to deploy to GitHub Pages using `gh-pages`.

```bash
npm run deploy
```

Make sure the `homepage` field in `package.json` matches your GitHub Pages URL.

## License

This project is released under the MIT License.

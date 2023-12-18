<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Image Echoes Front</h1>
</div>

---

Image Echoes Back is app where users can share images from your life. You can subscribe to other users and see what new blogs they have made.

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

#

### Prerequisites

- <img src="readme/assets/node.png" width="25" style="position: relative; top: 8px" /> _Node JS @14.X and up_
- <img src="readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> _npm @6 and up_

#

### Tech Stack

- <img src="readme/assets/vue.png" height="18" style="position: relative; top: 4px" /> [Vue ^3.3.2](https://vuejs.org/) - front-end framework.
- <img src="readme/assets/pinia.svg" height="18" style="position: relative; top: 4px; width: 18px" /> [Pinia ^2.0.36](https://pinia.vuejs.org/) - For global state management.
- <img src="readme/assets/axios.svg" height="18" style="position: relative; top: 4px; width: 18px" /> [axios @1.2.2](https://axios-http.com/) - Promise based HTTP client for the browser and node.js.
- <img src="readme/assets/tailwind.png" height="18" style="position: relative; top: 4px; width: 18px" /> [Tailwind @3.2.4](https://tailwindcss.com/) - Tailwind CSS is an open source CSS framework.
- <img src="readme/assets/echo.svg" height="18" style="position: relative; top: 4px; width: 18px" /> [Laravel Echo ^1.15.3](https://github.com/laravel/echo) - Library for beautiful Pusher and Ably integration.

#

### Getting Started

1\. First of all you need to clone Image Echoes Front repository from github:

```sh
git clone git@github.com:GiorgiTsukhishvili/Image-Echoes-Front.git
```

2\. Next step requires install all the dependencies.

```sh
npm ci
```

or

```sh
yarn
```

#

### Project Structure

```bash
├─── readme   # readme assets
├─── public      # public folder
│   ├─── assets       # project images and fonts
├─── src    # src folder
│   ├─── assets
│   ├─── components
│   ├─── config
│   ├─── helpers
│   ├─── router
│   ├─── services
│   ├─── stores
│   ├─── views
│   ├─── App.vue
│   ├─── main.js
- .env.example
- .eslintrc.json
- .prettierrc.js
- package.json
- tailwind.config.cjs
- vite.config.ts
- .gitignore
- README.md
- postcss.config.cjs

```

#

### Deployment

In order to deploye project on the server you must build existing Image Echoes Front from terminal:

```sh
npm run build
```

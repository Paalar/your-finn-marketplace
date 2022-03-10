# Developing with a modern framework

Today's web development is mostly done through more complex frameworks than simple Javascript, HTML, and CSS. Using JavaScript, HTML, CSS is viable with Podium as that is all it needs to create a microfrontend, most developers use more complex frameworks/libraries like React, Vue, Angular, Svelte, or many others.

In this lab we will go through how to add React to our header podlet. To make browsers understand what is written in React, we need to _bundle_ the code to regular JS. In Finn we use mostly `rollup`, but another common bundler is `webpack`.

## Step 1: Bundling

You can find an example Rollup config in `resources -> rollup.config.js`. You will have to install its dependencies
`npm i -D @rollup/plugin-node-resolve @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-replace`.

- The `input` value is where the main javascript file is.
- The `output` value is where Rollup will bundle its files to.

## Step 2: Babel

We need help from the package Babel to compile the modern JS and React code into browser-readable javascript.
We need to install these packages `npm i -D @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react`.
We also need a `.babelrc` file, this can be found in `resources > .babelrc`, just copy and paste this like you dide with rollup.

## Step 3: (optional, but reccomended) Watching client side code and run the server

We want to both bundle the client side code everytime there is a change. To run several commands in parallel (bundling client side code and running the server) we will install `npm-run-parallel`.

`npm i -D npm-run-all`

Add the scripts below to `package.json`

```
"watch:js": "rollup -cw",
"dev": "run-p watch:js node podlet.mjs`
```

You can now run the project with `npm run dev`, and everytime you

## Step 4: Add and render a simple React component

First off, we need React itself in our project, so install it with

`npm i react react-dom`

For React to put itself into the DOM, we need a root id for the header. In the server, add a unique id, e.g. `id="header"`

Create the file `client > index.jsx` and populate it with this

```jsx
import ReactDOM from "react-dom";

ReactDOM.render(<p>Hello, world!</p>, document.getElementById("header"));
```

When you now run `npm run dev` you can see a `dist` folder in root level with a file named `index.js`. In here is the React code, but at the bottom you should see

```js
ReactDOM.render(
  /*#__PURE__*/ jsxRuntime.exports.jsx("p", {
    children: "Hello, world!",
  }),
  document.getElementById("header")
);
```

Which means that the code has been bundled correctly.
Going to `http://localhost:3010` wil not show the text `Hello, world!`, this is because we have not added the javascript to our code. To do this, we need to serve our header app the `dist > index.js` file.

This is done by adding the following to our server file `podlet.mjs`

```js
app.use(express.static("./dist/"));

podlet.js({
  value: "/index.js",
  type: "module",
});
```

When you run the application again, you should see `Hello, World!` on your app.

## Step 5: Put our header app in React

First off, we want `index.jsx` to just render our app, and we can modify it somewhere else.

Create the file `App.jsx` beside `index.jsx` and lets move our header content from `res.podiumSend(...)` (except for the container element with `id="header"`) into a React component!  
\*\*React has some different attribute names than regular HTML, e.g. `class => className`

We have to remember to import the App into `index.jsx` as well. So your `App.jsx` and `index.jsx` files should look something like this:

```jsx
const logo = `<svg> ... </svg>`;

const App () => {
    return (
        <div className="flex items-center">
          <span>${logo}</span>
          <span className="ml-8">Mulighetens marked</span>
        </div>
        <div className="flex items-center space-x-8">
            <span>Varslinger</span>
            <span>Ny annonse</span>
            <span>Meldinger</span>
            <span>Min FINN</span>
        </div>
    )
}

export default App
```

```jsx
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("header"));
```

When running your app, you will now see your header! Albeit the logo is not working properly. This is because React sanetizes the input before putting it into a component. This is for safety reasons, but we know the SVG is safe and can safelty insert it into the code. This is done by using the appropriately named `dangerouslySetInnerHTML` attribute.

```jsx
<span dangerouslySetInnerHTML={{ __html: logo }} />
```

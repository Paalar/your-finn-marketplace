# Lab 1 - How to build a podlet using express

This guide will show you how to get started building podlets for Podium in Node js using the Express js HTTP framework and the core Podium libraries. It will walk you through the creation of a very simple bare bones podlet.

## Before you begin

Ideally, you should have some familiarity with building apps with JavaScript (even better if you have used Node.js before). You will also need to have Node.js installed at version 8 or higher. The NPM CLI will be installed automatically when you install Node.js

Create a root folder that will house all our own folders.

```bash
mkdir your-finn-marketplace
cd your-finn-marketplace
```

## Step 1: Project setup 🚀

First, initialize a new Node.js project in an empty directory.

Create directory and move into it

```bash
mkdir header-podlet
cd header-podlet
```

Create a package.json file

```bash
npm init -f
```

## Step 2: Install dependencies

Next, we need to install and import the dependencies `express` and `@podium/podlet`. To do so, run:

```bash
npm install express @podium/podlet
```

## Step 3: Import dependencies

Create a file `podlet.mjs` and import these 2 dependencies at the top

```js
import express from "express";
import Podlet from "@podium/podlet";
```

## Step 4: Instantiate instances

Create an Express app instance and instantiate the podlet

```js
const app = express();

const podlet = new Podlet({
  name: "my-header", // required
  version: "1.0.0", // required
  pathname: "/", // required
  development: true,
});
```

Read more about Podlet options in the [Podium podlet docs](https://podium-lib.io/docs/api/podlet).

## Step 5: Mount middleware

Mount the podlet instances [middleware](https://medium.com/@agoiabeladeyemi/a-simple-explanation-of-express-middleware-c68ea839f498) into the Express app, using the podlet instance's [middleware function](https://podium-lib.io/docs/api/podlet#middleware).

```js
app.use(podlet.middleware());
```

## Step 6: Create the content route

This is the route that the podlet server will use to return its HTML content.

We use the [`podiumSend`](https://podium-lib.io/docs/api/podlet#respodiumsendfragment) method here which will wrap the HTML provided in a template when the podlet is development mode making it easier to work on in isolation from a layout.

```js
app.get(podlet.content(), (req, res) => {
  res.podiumSend(
    `<div>
        <h1>Title</h1>
        <p>This is the podlet's HTML content</p>
    </div>`
  );
});
```

Here we use the podlet's helper method [`podlet.content()`](https://podium-lib.io/docs/api/podlet#contentoptions) which returns the default content path which is `"/"`.

_N.B. You can set an alternative path in the Podlet constructor using the `content` argument._

## Step 7: Create a manifest route

In Podium, each podlet must return meta data about itself in the form of a JSON document. By passing the podlet object to the send method, it will be automatically serialized with `JSON.stringify(podlet)` and returned as the route content.

```js
app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});
```

_N.B. As with the content route, we can use the podlets helper method [`podlet.manifest()`](https://podium-lib.io/docs/api/podlet#manifestoptions) to return the default manifest route, which is `'/manifest.json'`_

## Step 9: Start the server

Now, all thats left is to start the server and test it out

```js
app.listen(3010);
```

We call `.listen(port)` on the express app instance and pass it a port

We can run the app with:

```bash
node podlet.mjs
```

We can now visit `http://localhost:3010` to see our microfrontend podlet, and we can visit `http://localhost:3010/manifest.json` to view the manifest file.

The manifest url should render values of the json file, which should look something like this below.

```json
{
  "name": "my-header",
  "version": "1.0.0",
  "content": "/",
  "fallback": "",
  "assets": { "js": "", "css": "" },
  "css": [],
  "js": [],
  "proxy": {}
}
```

Next, move onto to [**lab 2**](https://github.com/Paalar/your-finn-marketplace/blob/main/labs/lab2.md) to learn more about Podium layouts!

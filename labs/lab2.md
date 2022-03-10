# Lab 2 - Building a Podium layout

## 🚀 Getting Started

This guide will walk you through how to get started building layouts for Podium in Node.js using the Express js HTTP framework and the core Podium module `@podium/layout`. At the end you will have created a fairly bare bones page displaying content from two podlet servers.

## Step 1: Project setup

First, we need to initialize a new node project in an empty directory.

```bash
mkdir layout
cd layout
npm init -f
```

## Step 2: Install dependencies

Next, we need to install and import our dependencies, `express` and
`@podium/layout`. To do so, run:

```bash
npm install express @podium/layout
```

## Step 3: Import dependencies

Create a file `layout.mjs`, open it in your favorite text editor and import the following 2 dependencies at the top of the file.

```js
import express from "express";
import Layout from "@podium/layout";
```

## Step 4: Instantiate the Layout

Create an express app instance and instantiate the layout. `name` and `pathname` are required parameters. `name` must be a unique identifier in camel casing. `pathname` is a prefix path to where your layout will appear online. For our example here we can say that our page will be served at `/` so `pathname` should be set to `/`. If our page was being served at `/demo`, `pathname` would need to be `/demo`. See the [ `@podium/layout` documentation](https://podium-lib.io/docs/api/layout).

```js
const app = express();

const layout = new Layout({
  name: "myLayout", // required
  pathname: "/", // required
});
```

## Step 5: Register a basic podlet for use in the page

Registering a podlet is simple. It requires a name (it does not have to match the name of the podlet it fetches from), and the url to the `manifest.json` of the podlet.

We already have a podlet we created in the first lab. We would like to put that podlet inside this layout. So we will register the podlet in the layout.

```js
const headerClient = layout.client.register({
  name: "header", // required
  uri: "http://localhost:3000/manifest.json", // required
});
```

_N.B. The `uri` here should point to the podlet's manifest file, not to its server root._

## Step 6: Mount middleware

Mount the layout instance's [middleware](https://podium-lib.io/docs/api/layout#middleware) into the express app. This important step adds layout specific middleware to the app to take care of such tasks as context parsing and proxying.

```js
app.use(layout.middleware());
```

## Step 7: Create a route to fetch and display a podlet's content

This is the route that the layout server will use to return its HTML page. We create our route using the same `pathname` value we gave the layout constructor.

In our route handler, we grab the [**Podium context**](https://podium-lib.io/docs/layout/context) from the response object and hand it to the fetch method of the two `podlet`'s podlet clients. This method returns a promise which resolves to the podlet's content which we can then insert into our page as shown below:

```js
app.get(layout.pathname(), async (req, res) => {
  const incoming = res.locals.podium;
  const [header, footer] = await Promise.all([headerClient.fetch(incoming)]);

  res.podiumSend(`
    ${header}
    <section>
      Main page content
    </section>
  `);
});
```

This podlet can be reused by anyone with a link and multiple times in the same context. Adding the header above and below or many other times in the HTML will also work.

```js
res.podiumSend(`
  ${header}
  ${header}
  <section>
    Main page content
  </section>
  ${header}
  ${header}
`);
```

## Step 8: Supply document template arguments

What we have so far will work, but we can configure additional parts of the page by setting template variables on the Podium HttpIncoming object (`res.locals.podium`).

We will, for example, want to set the page title. We can do so by setting a title on the `title` property of the HttpIncoming's view object like so:

```js
incoming.view.title = "This is my awesome page | FINN.no";
```

Podium has a default document template, but you can even supply your own. [This is what we use at FINN](https://github.schibsted.io/finn/html-template) to ensure correct metadata across all the different pages. [Read more about Podium templates](https://podium-lib.io/docs/api/document).

## Step 9: Start the server

Now, all thats left is to start the server and test it out

```js
app.listen(3000);
```

We call `.listen(port)` on the express app instance and pass it a port

We can run the app with:

```bash
node layout.mjs
```

And we can then visit our page in a browser at:

```bash
http://localhost:3000
```

You should now see the header your created as well as the other HTML supplied through the layout.

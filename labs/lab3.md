# Making your app look like Finn.no

Every brand has its own look and feel, this includes Finn. We have very talented designers that help us make the site look the way it looks, but we also have our own design systems. Our old design system is named `Troika`, while our new and improved design system is named `Fabric`.

Fabric is open source and is continuously being worked on by the core frontend team.
Here is a link to Fabric, [https://www.fabric-ds.io/](https://www.fabric-ds.io/)

## Step 1: Adding Fabric to the header

In Finn, we bundle and publish our files to a common server, this is handled by our open source project named `Eik`. Adding the Finn styles to our podlets and layouts is usually handled by Eik, but can easily be added with one line of code.

```js
podlet.css({
  value: "https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css",
});
```

If you run the podlet again, you can see that the styles and fonts have been applied to podlet.

## Step 2: Finn logo and slogan

To make our header look a bit more Finn-ish, we want to add the Finn-logo and the "Mulighetenes marked" slogan.

You can find the logo as an SVG in `resources > finnlogo.js`. Copy and paste the contents of the file to `podlet.mjs`.

Update the HTML to render the logo and the text "Mulighetenes marked" to look something like this.

```js
res.podiumSend(`
    <nav>
        <div>
            <span>${logo}</span>
            <span>Mulighetens marked</span>
        </div>
    </nav>
`);
```

The SVG should be rendered properly inside the span-tag.

## Step 3: Add styling

Fabric is built on Tailwind CSS with some custom properties that have been added, and some removed. So using [https://tailwindcss.com/](https://tailwindcss.com/) is essential for developing with Fabric.

Adding some CSS to the header will make it look more like Finn.no's header!
We want to align the logo and text, and center the text both vertically and horizontally. This can be achieved by adding this CSS.

```js
res.podiumSend(`
    <nav class="font-bold text-12 text-gray-800 flex justify-between">
      <div class="flex items-center">
          <span>${logo}</span>
          <span class="ml-8">Mulighetens marked</span>
      </div>
      <div class="flex items-center space-x-8">
          <span>Varslinger</span>
          <span>Ny annonse</span>
          <span>Meldinger</span>
          <span>Min FINN</span>
      </div>
    </nav>
`);
```

## Step 4: Update the layout

Adding the CSS to the podlet will only work for the podlet itself, but not when they are in a layot. So we have to add the CSS to the layout as well, much like Step 1.

The CSS helps a lot, but to contain the page in the correct width, set the class type `page-container` to a parent element in the layout. Now the header should look more correct!

import express from "express";
import Layout from "@podium/layout";

const app = express();

const layout = new Layout({
  name: "myLayout",
  pathname: "/",
});

layout.css({
  value: "https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css",
});

const headerClient = layout.client.register({
  name: "header",
  uri: "http://localhost:3010/manifest.json",
});

const footerClient = layout.client.register({
  name: "footer",
  uri: "http://localhost:3020/manifest.json",
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  const incoming = res.locals.podium;
  incoming.view.title = "This is my awesome page | FINN.no";

  const [header, footer] = await Promise.all([
    headerClient.fetch(incoming),
    footerClient.fetch(incoming),
  ]);

  res.podiumSend(`
  <div class="page-container">
    ${header}
    <section>
      Main page content
    </section>
    ${footer}
  </div>
  `);
});

app.listen(3000);

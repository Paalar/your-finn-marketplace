import express from "express";
import Layout from "@podium/layout";

const app = express();

const layout = new Layout({
  name: "myLayout",
  pathname: "/",
});

const headerClient = layout.client.register({
  name: "header",
  uri: "http://localhost:3010/manifest.json",
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  const incoming = res.locals.podium;
  incoming.view.title = "This is my awesome page | FINN.no";

  const [header] = await Promise.all([headerClient.fetch(incoming)]);

  res.podiumSend(`
    ${header}
    <section>
      Main page content
    </section>
  `);
});

app.listen(3000);

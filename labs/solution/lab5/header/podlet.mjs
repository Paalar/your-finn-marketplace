import express from "express";
import Podlet from "@podium/podlet";

const app = express();

const podlet = new Podlet({
  name: "my-header",
  version: "1.0.0",
  pathname: "/",
  development: true,
});

app.use(express.static("./dist/"));
app.use(podlet.middleware());

podlet.css({
  value: "https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css",
});

podlet.js({
  value: "/index.js",
  type: "module",
});

app.get(podlet.content(), (_, res) => {
  res.podiumSend(`
    <nav id="header" class="font-bold text-12 text-gray-800 flex justify-between">
    </nav>
    `);
});

app.get(podlet.manifest(), (_, res) => {
  res.status(200).send(podlet);
});

app.listen(3010);

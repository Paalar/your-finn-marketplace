import express from "express";
import Podlet from "@podium/podlet";

const app = express();

const podlet = new Podlet({
  name: "my-header",
  version: "1.0.0",
  pathname: "/",
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.content(), (_, res) => {
  res.podiumSend(`
        <div>
            <h1>Title</h1>
            <p>This is our first podlet!</p>
        <div>
    `);
});

app.get(podlet.manifest(), (_, res) => {
  res.status(200).send(podlet);
});

app.listen(3010);

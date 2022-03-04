import express from "express";
import Layout from "@podium/layout";

const app = express();

const layout = new Layout({
  name: "your-finn-marketplace",
  pathname: "/",
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  res.podiumSend(`<p>hello!</p>`);
});

app.listen(3000);

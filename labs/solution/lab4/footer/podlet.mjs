import express from "express";
import Podlet from "@podium/podlet";

const app = express();

const footer = new Podlet({
  name: "footer",
  version: "1.0.0",
  pathname: "/",
  development: true,
});

footer.css({
  value: "https://assets.finn.no/pkg/@fabric-ds/css/v1/fabric.min.css",
});

app.use(footer.middleware());

app.get(footer.content(), (req, res) => {
  res.podiumSend(`
        <footer class="p-24 text-center bg-aqua-100">
            <dl class="flex flex-row justify-between items-center">
                <span>
                    <dt>Name:</dt>
                    <dd>Pål-Edward Larsen</dd>
                </span>
                <span>
                    <dt>LinkedIn</dt>
                    <dd>https://www.linkedin.com/in/paal-larsen/</dd>
                </span>
                <span>
                    <dt>E-mail:</dt>
                    <dd>pal-edward.larsen@finn.no</dd>
                </span>
            </dl>
        </footer>
    `);
});

app.get(footer.manifest(), (req, res) => {
  res.status(200).send(footer);
});

app.listen(3020);

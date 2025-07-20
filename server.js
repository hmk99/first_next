const express = require("express");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // You can add custom routes here if needed:
  // server.get("/custom", (req, res) => {
  //   return app.render(req, res, "/custom", req.query);
  // });

  // Default: handle everything else
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`🚀 Server ready on http://localhost:${port}`);
  });
});

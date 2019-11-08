import * as express from "express";
import * as path from "path";

const app: express.Application = express.default();
const port = process.env.PORT || 8001;

// Static file declaration
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Production Mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Build Mode
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

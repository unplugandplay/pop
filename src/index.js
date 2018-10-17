const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const { PORT } = require("./config.js");
const Mailer = require("./mailer");
const { capture } = require("./sentry.js");

require("./passport")(passport);
require("./mongo");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
// /* Parse the ndjson as text for ES proxy*/
app.use(bodyParser.text({ type: "application/x-ndjson" }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.get("/", (_req, res) => {
  res.send("POP API listening.");
  console.log("POP API listening.");
});

app.use("/auth", require("./controllers/auth"));
app.use("/users", require("./controllers/users"));
app.use("/merimee", require("./controllers/merimee"));
app.use("/joconde", require("./controllers/joconde"));
app.use("/mnr", require("./controllers/mnr"));
app.use("/palissy", require("./controllers/palissy"));
app.use("/memoire", require("./controllers/memoire"));
app.use("/thesaurus", require("./controllers/thesaurus"));
app.use("/search", require("./controllers/search"));

app.post(
  "/mail",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("RECEIVE MAIL TO SEND", req.body);
    const { subject, to, body } = req.body;

    console.log("RECEIVE MAIL TO SEND 1");
    if (!subject || !to || !body) {
      console.log("RECEIVE MAIL TO SEND 1.1");
      capture("Mail information incomplete");
      res.status(500).send("Information incomplete");
      return;
    }

    console.log("RECEIVE MAIL TO SEND 2");
    Mailer.send(subject, to, body)
      .then(e => {
        return res.status(200).send({ success: true, msg: "OK" });
      })
      .catch(e => {
        console.log("ERROR", e);
        return res.status(200);
      });
  }
);

app.listen(PORT, () => console.log("Listening on port " + PORT));

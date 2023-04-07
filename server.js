require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const methodOverride = require("method-override");
const Log = require("./models/logs");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
});
mongoose.set("strictQuery", true);

db.on("error", (err) => console.log(`${err.message} is mongod not running?`));
db.on("open", () => console.log(`mongo connected: ${mongoURI}`));
db.on("close", () => console.log(`mongo disconnected`));

app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.urlencoded({ extended: true })); //body parser
app.use(methodOverride("_method"));

// app.get("/", (req, res) => {
//   res.send("new");
// });

app.get("/index", (req, res) => {
  Log.find({}, (error, allLogs) => {
    res.render("Index", { log: allLogs });
  });
});

app.get("/index/:id", (req, res) => {
  Log.findById(req.params.id, (error, foundLogs) => {
    res.render("Show", { log: foundLogs });
  });
});

app.get("/index/new", (req, res) => {
  res.render("New");
});

app.post("/logs", (req, res) => {
  req.body.shipIsBroken === "on"
    ? (req.body.shipIsBroken = true)
    : (req.body.shipIsBroken = false);
  Log.create(req.body, (error, createdLog) => {
    res.send(createdLog);
  });
});

app.get("/index/:id/edit", (req, res) => {
  Log.findById(req.params.id, (error, foundLogs) => {
    !error
      ? res.render("Edit", { log: foundLogs })
      : res.send({ msg: error.message });
  });
});

app.put("/index/:id", (req, res) => {
  req.body.shipIsBroken === "on"
    ? (req.body.shipIsBroken = true)
    : (req.body.shipIsBroken = false);
  Log.findByIdAndUpdate(req.params.id, req.body, (error, updatedLogs) => {
    console.log(
      "🚀 ~ file: server.js:65 ~ Log.findByIdAndUpdate ~ updatedLogs:",
      updatedLogs
    );
    res.redirect(`/index/${req.params.id}`);
  });
});

app.delete("/index/:id", (req, res) => {
  Log.findByIdAndDelete(req.params.id, (error, entry) => {
    res.redirect("/index");
  });
});

app.listen(PORT, () => console.log(`${PORT} is listening`));

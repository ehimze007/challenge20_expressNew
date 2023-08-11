const express = require("express");
const path = require("path");

const PORT = 3000;
const app = express();

function logDate(request, response, next) {
  const date = new Date();
  const day = date.getDay();
  const time = date.getHours();

  if (day < 1 || day > 5 || time < 9 || time > 17) {
    response.render("not-available");
    response.end();
    return;
  }
  next();
}

app.use("/static/", express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logDate);

app.get("/", (request, response) => {
  response.render("index");
});

app.get("/services", (request, response) => {
  response.render("services");
});

app.get("/contact", (request, response) => {
  response.render("contact");
});

app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});

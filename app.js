const express = require("express");
const bodyParser = require("body-parser");
const ClientManager = require("./lib/client_manager");
const ParametersParser = require("./lib/parameters_parser");

const app = express();
const port = 3000;

const manager = new ClientManager("./data/clients.json");

app.use(bodyParser.json());

app.get("/search", (req, res) => {
  debugger;

  const searchFields = ParametersParser.parse(req.query.q);

  if (searchFields) {
    const matchingClients = manager.searchClients(searchFields);

    if (matchingClients.length === 0) {
      res.status(404).json({ error: "No Results Found" });
    } else {
      res.json(matchingClients);
    }
  } else {
    res.status(400).json({ error: "Invalid search filters" });
  }
});

app.get("/duplicates", (req, res) => {
  const field = req.query.field || "email";

  const fieldsArray = field.split(",");

  if (fieldsArray) {
    const duplicateFieldValues = manager.findDuplicateFieldValues(fieldsArray);

    if (duplicateFieldValues.length === 0) {
      res.status(404).json({ error: "No Duplicate Results Found" });
    } else {
      res.json(duplicateFieldValues);
    }
  } else {
    res.status(400).json({ error: "Missing field parameter" });
  }
});
module.exports = app;
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

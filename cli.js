const yargs = require("yargs");
const ClientManager = require("./lib/client_manager");
const ParametersParser = require("./lib/parameters_parser"); 

const manager = new ClientManager("./data/clients.json");

const argv = yargs
  .command("search", "Search for clients based on query parameters", {
    query: {
      describe: "Query parameters",
      demandOption: true,
      type: "string",
    },
  })
  .command("duplicates", "Find duplicate field values", {
    fields: {
      describe: "Fields to check for duplicates",
      type: "array",
    },
  })
  .help().argv;

const command = argv._[0];

if (command === "search") {
  const query = ParametersParser.parse(argv.query);

  if (query) {
    const matchingClients = manager.searchClients(query);

    if (matchingClients.length === 0) {
      console.log("No Results Found");
    }

    matchingClients.forEach((client) => {
      console.log(`${client.full_name} (${client.email})`);
    });
  } else {
    console.log("Invalid query parameters");
  }
} else if (command === "duplicates") {
  const fields = argv.fields || ["email"];

  const duplicateValues = manager.findDuplicateFieldValues(...fields);

  if (duplicateValues.length === 0) {
    console.log("No Duplicate Results Found");
  }

  duplicateValues.forEach(({ fieldValues, data }) => {
    console.log(
      `${fieldValues}, count: ${data.count}\nrecords: ${JSON.stringify(
        data.records
      )}\n\n`
    );
  });
} else {
  console.log("Usage: node cli.js search --query field=value [field=value]...");
}

const fs = require("fs");
const ParametersParser = require("./parameters_parser");

class ClientManager {
  constructor(filePath) {
    this.data = this.loadData(filePath);
  }

  // Load client data from a JSON file
  loadData(filePath) {
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  }

  // Search for clients based on query parameters
  searchClients(query) {
    return this.data.filter((client) => {
      return Object.keys(query).some((field) => {
        const clientFieldValue = client[field];
        const queryValue = query[field];

        if (clientFieldValue !== undefined && clientFieldValue !== null) {
          return clientFieldValue
            .toString()
            .toLowerCase()
            .includes(queryValue.toLowerCase());
        }

        return false;
      });
    });
  }

  // Find duplicate field values in client data
  findDuplicateFieldValues(...fields) {
    fields = fields.flat();

    const fieldValuesCount = new Map();

    this.data.forEach((client) => {
      const fieldValues = fields.map((field) => client[field]);
      const fieldValuesStr = fieldValues.join(", ");

      if (!fieldValuesCount.has(fieldValuesStr)) {
        fieldValuesCount.set(fieldValuesStr, { count: 0, records: [] });
      }

      fieldValuesCount.get(fieldValuesStr).count += 1;
      fieldValuesCount.get(fieldValuesStr).records.push(client);
    });

    const duplicates = Array.from(fieldValuesCount.entries())
      .filter(([, data]) => data.count > 1)
      .map(([fieldValuesStr, data]) => ({ fieldValues: fieldValuesStr, data }));

    return duplicates;
  }
}

module.exports = ClientManager;

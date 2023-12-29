class ParametersParser {
  static parse(params) {
    if (typeof params === "object" && !Array.isArray(params)) {
      return params;
    }

    if (!params || (Array.isArray(params) && params.length === 0)) {
      return null;
    }

    const searchFields = {};

    const parametersArray = Array.isArray(params) ? params : [params];

    parametersArray.forEach((param) => {
      const [key, value] = param.split("=");
      searchFields[key] = value;
    });

    return searchFields;
  }
}

module.exports = ParametersParser;

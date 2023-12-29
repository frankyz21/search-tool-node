const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const expect = chai.expect;

describe("ClientManager API", function () {
  describe("GET /search", function () {
    it("returns matching clients for full_name", async function () {
      const res = await chai.request(app).get("/search?q[full_name]=john");
      expect(res).to.have.status(200);
      expect(res.body.length).to.be.greaterThan(0);
    });

    it("returns matching clients for email", async function () {
      const res = await chai
        .request(app)
        .get("/search?q[email]=john.doe@gmail.com");
      expect(res).to.have.status(200);
      expect(res.body.length).to.be.greaterThan(0);
    });

    it("returns matching clients for full_name and email", async function () {
      const res = await chai
        .request(app)
        .get("/search?q[full_name]=john&q[email]=john.doe@gmail.com");
      expect(res).to.have.status(200);
      expect(res.body.length).to.be.greaterThan(0);
    });

    it("returns an error for missing search parameters", async function () {
      const res = await chai.request(app).get("/search");
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal("Invalid search filters");
    });
  });

  it("returns duplicate emails", async function () {
    const res = await chai.request(app).get("/duplicates");
    expect(res).to.have.status(200);

    const duplicateEmails = res.body.map((entry) => entry.fieldValues);
    const expectedEmails = ["john.doe@gmail.com", "jane.smith@yahoo.com"];

    expect(duplicateEmails).to.have.members(expectedEmails);
  });

});

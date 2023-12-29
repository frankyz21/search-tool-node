const { exec } = require("child_process");
const { expect } = require("chai");

describe("Test CLI Commands", function () {
  context("search command", function () {
    it("returns matching clients by name", function (done) {
      exec(
        "node cli.js search --query full_name=John",
        (error, stdout, stderr) => {
          expect(stdout).to.include("John Doe (john.doe@gmail.com)");
          done(error);
        }
      );
    });

    it("returns matching clients by name and email", function (done) {
      exec(
        "node cli.js search --query full_name=John --query email=john.doe@gmail.com",
        (error, stdout, stderr) => {
          expect(stdout).to.include("John Doe (john.doe@gmail.com)");
          done(error);
        }
      );
    });
  });

  context("duplicates command", function () {
    it("returns duplicate", function (done) {
      exec("node cli.js duplicates", (error, stdout, stderr) => {
        expect(stdout).to.include("john.doe@gmail.com");
        expect(stdout).to.include("jane.smith@yahoo.com");
        done(error);
      });
    });

    it("returns duplicate emails", function (done) {
      exec("node cli.js duplicates --fields email", (error, stdout, stderr) => {
        expect(stdout).to.include("john.doe@gmail.com");
        expect(stdout).to.include("jane.smith@yahoo.com");
        done(error);
      });
    });

    it("returns duplicate emails and full_names", function (done) {
      exec(
        "node cli.js duplicates --fields email,full_name",
        (error, stdout, stderr) => {
          expect(stdout).to.include("john.doe@gmail.com");
          expect(stdout).to.include("John Doe");
          expect(stdout).to.include("jane.smith@yahoo.com");
          done(error);
        }
      );
    });
  });
});

const mongoose = require("mongoose");
const { User } = require("../models");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();
chai.use(chaiHttp);

describe("Testing Travis", () => {
  it("Print Data", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql(".AuthServices is active!.");
      });
    done();
  });
});

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe("Testing Travis", () => {
  it("Print Data", (done) => {
    chai
      .request(server)
      .get("/user/test/service")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have
          .property("message")
          .eql("!Test Route - AuthService is Up!");
        done();
      });
  });
});

const mongoose = require("mongoose");
const {User} = require('../app/Model/User')
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");
const should = chai.should();

const newUserData = {
  username:"New User 1",
  email:"email1@gmail.com",
  password: "qwerty1@3"
};

const existingUserData = {
  username: "Existing User 1",
  email: 'email2@gmail.com',
  password: "qwerty1#2"
};

let newUserToken
let newUserID
let existingUserToken
let existingUserID
chai.use(chaiHttp);

before(done => {
  User.create(newUserData,(err, user) =>{
    newUserID = user._id
    done();
  })
})

describe.skip("Test", () =>{
  it("Print Data", done =>{
    console.log(newUserID,'data')
  })
})

after(done =>{
  User.deleteOne({_id: newUserID})
  done()
})
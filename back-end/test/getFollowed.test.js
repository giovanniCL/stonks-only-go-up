const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

const app = require("../app.js")

chai.use(chaiHTTP)

describe("testing /followed/:user GET request", () => {
    it("should return 200 ok status", () =>{
        return chai.request(app).get('/followed/some-user').then(response =>{
            expect(response.status).to.equal(200)
        })
    })
    it("should return an array of objects where the first object has a \"user\" key with a \"some-user\" value", () =>{
        return chai.request(app).get('/followed/some-user').then(response =>{
            expect(JSON.parse(response.text)[0].user).to.equal("some-user")
        })
    })
})
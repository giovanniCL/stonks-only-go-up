const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

const app = require("../app.js")

chai.use(chaiHTTP)

describe("testing /dashboard GET request", () => {
    it("should return 200 ok status", () =>{
        return chai.request(app).get('/dashboard').then(response =>{
            expect(response.status).to.equal(200)
        })
    })
})
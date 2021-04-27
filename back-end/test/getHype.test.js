const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

const app = require("../app.js")

chai.use(chaiHTTP)

describe("testing /hype/stonks GET request", () => {
    it("should return an array of stonk objects sorted by stonkometer from highest to lowest", () =>{
        return chai.request(app).get('/hype/stonks').then(response =>{
            expect(response.status).to.equal(200)

            let response_object = JSON.parse(response.text)
            expect(response_object).to.be.a('array')
            expect(response_object[0]).to.be.a('object')
            expect(response_object[0].stonkometer >= response_object[1].stonkometer).to.be.true
        })
    })
})
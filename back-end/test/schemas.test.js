const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

const app = require("../app.js")

chai.use(chaiHTTP)

describe("testing User schema", () => {
    it("should return \"stonk_guy_420 saved to database\"", () =>{
        return chai.request(app).get('/user-schema-test').then(response =>{
            expect(response.text).to.equal("stonk_guy_420 saved to database")
        })
    })
})

describe("testing Stonk schema", () => {
    it("should return \"TEST saved to database\"", () =>{
        return chai.request(app).get('/stonk-schema-test').then(response =>{
            expect(response.text).to.equal("TEST saved to database")
        })
    })
})

describe("testing Tweet schema", () => {
    it("should return \"TWEET saved to database\"", () =>{
        return chai.request(app).get('/tweet-schema-test').then(response =>{
            expect(response.text).to.equal("TWEET saved to database")
        })
    })
})


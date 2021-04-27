const chai = require("chai")
const chaiHTTP = require("chai-http")
const expect = chai.expect

const app = require("../app.js")

chai.use(chaiHTTP)

describe("testing /follow/stonks user GET request and follow/:stonk GET request", () => {
    it("should return an array of stonk objects in which the first object has a \"symbol\" propoerty of value \"GME\"", () =>{
        chai.request(app).post("/api/auth/login").send({
            user_name : "Stonk_Guy_420", password: "PASSWORD"
        }).then(auth_response =>{
            let auth = JSON.parse(auth_response.text).token
            return chai.request(app).get('/follow/stonks').set("x-access-token", auth).then(response =>{
                expect(response.status).to.equal(200)
    
                let response_object = JSON.parse(response.text)
                expect(response_object).to.be.a('array')
                expect(response_object[0]).to.be.a('object')
                expect(response_object[0].symbol).to.equal('GME')
    
            })
        })
    })
    it("should return \"Stonk_Guy_420 followed/unfollowed SBUX\"", () => {
        chai.request(app).post("/api/auth/login").send({
            user_name : "Stonk_Guy_420", password: "PASSWORD"
        }).then(auth_response =>{
            let auth = JSON.parse(auth_response.text).token
            return chai.request(app).get('/follow/stonks/SBUX').set("x-access-token", auth).then(response =>{
                expect(response.status).to.equal(200)
                expect(response.text).to.equal("Stonk_Guy_420 followed/unfollowed SBUX")
            })
        })
    })
 
})
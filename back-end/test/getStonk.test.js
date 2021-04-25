
var chai = require('chai');
var chaiHttp = require('chai-http');
const app = require("../app.js")

var expect = chai.expect;

chai.use(chaiHttp);

describe('testing company info', function () {
    it('has company info, stonk quote, and graph data', function (done) {
        this.timeout(10000);
        chai.request(app)
            .post('/single-stonk/:name')
            .send({ "ticker": "SBUX" })
            .end(function (err, res) {
                
                // Initial Logging Good
                expect(res).to.have.status(200);

                // Basic Company Testing
                expect(res.body.tickerSymbol).to.equal("SBUX");
                
                // Company Info
                expect(res.body.stonkQuote["name"]).to.not.equal('')
                expect(res.body.stonkQuote["description"]).to.not.equal('')
                expect(res.body.stonkQuote["industry"]).to.not.equal('')
                expect(res.body.stonkQuote["country"]).to.not.equal('')
                expect(res.body.stonkQuote["website"]).to.not.equal('')
                expect(res.body.stonkQuote["logo"]).to.not.equal('')
                expect(res.body.stonkQuote["exchange"]).to.not.equal('')

                // Stonk Quote Testing
                expect(res.body.stonkQuote["Price"]).to.not.equal('--')
                expect(res.body.stonkQuote["EPS"]).to.not.equal('--')
                expect(res.body.stonkQuote["High"]).to.not.equal('--')
                expect(res.body.stonkQuote["Low"]).to.not.equal('--')
                expect(res.body.stonkQuote["Open"]).to.not.equal('--')
                expect(res.body.stonkQuote["Previous Close"]).to.not.equal('--')
                expect(res.body.stonkQuote["Market Cap."]).to.not.equal('--')
                expect(res.body.stonkQuote["Shares Out."]).to.not.equal('--')
                expect(res.body.stonkQuote["Dividend Yield"]).to.not.equal('--')
                expect(res.body.stonkQuote["Dividend Per Share"]).to.not.equal('--')

                // Graph Testing
                expect(res.body.graph).not.be.empty

                done();
            });
    });
});
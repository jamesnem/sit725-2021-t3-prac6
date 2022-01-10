const expect = require("chai").expect;
const request = require("request");

//Create testing suite
describe("Testing comparison of numbers", () => {

    //Select address
    const url = "http://localhost:8080/add/4/9";

    //Create test cases
    it("return status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("return number from a request", (done) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.be.a("number");
            done();
        });
    });

    it("return number from a request", (done) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.result).to.equal(13);
            done();
        });
    });
});

//Create testing suite
describe("Testing comparison of strings", () => {

    //Select address
    const url = "http://localhost:8080/add/4/j";

    //Create test cases
    it("return status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(300);
            done();
        });
    });

    it("return error message", (done) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.error).to.equal("Invalid inputs, should be 2 numbers");
            done();
        });
    });
});

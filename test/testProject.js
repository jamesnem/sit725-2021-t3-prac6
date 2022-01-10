const expect = require("chai").expect;
const request = require("request");

//create constant to link to database file
const dbo = require('../db/connection');

//Create testing suite
describe("Testing project recall", () => {

    //Select url
    const url = "http://localhost:8080/api/project";

    //Before test cases are executed
    before((done) => {
        dbo.connectToDatabase(() => {
            const projectCollection = dbo.getDb().collection("projectData");

            //Clear database
            projectCollection.deleteMany({});

            //Create testing instances in the database
            for (let i = 1; i < 5; i ++) {
                projectCollection.insertOne({
                    projectID: i,
                    title: 'title' + i,
                    info: 'info' + i,
                    img: 'image not avaiable'
                })
            }
            done();
        });
    });

    //Create test cases
    it("return status code 200 when calling api", (done) => {
        request(url, (err, response, body) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("return body of request", (done) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            console.log(body)
            expect(body).to.be.a("array");
            done();
        });
    });

    it("returns 4 testing projects", (done) => {
        request(url, (err, response, body) => {
            body = JSON.parse(body);
            expect(body.length).to.equal(4);
            done();
        });
    });

    //Before test cases are executed
    after((done) => {
        dbo.connectToDatabase(() => {
            const projectCollection = dbo.getDb().collection("projectData");

            //Clear database
            projectCollection.deleteMany({});
            done();
        });
    });
});
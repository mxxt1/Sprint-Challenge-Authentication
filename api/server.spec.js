const request = require('supertest');
const server = require('./server.js');


let token; 

beforeAll((done) => {
    request(server)
        .post('/api/auth/register')
        .send({
            "username":"test",
            "password":"password"
        })
        .end((err, response) => {
            token = response.body.token;
            done();
        });
});


//confirm test environment

it("should set up the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
});

describe("server.js", () => {
    describe('GET /', () => {
        it("should return status 200", () => {
            return request(server).get('/')
            .then(result => {
                expect(result.status).toBe(200);
            });
        });//return status 200
        it("should return json format", () => {
            return request(server).get('/')
            .then(result => {
                expect(result.type).toMatch(/json/i);
            });
        }); //return json 
    });//describe get /

    describe("POST /api/auth/register",  () =>{

        // const testUser = {
        //     username: "test",
        //     password: "password"
        // };

        it("should return 201 on successful post",  () => {
             request(server)
            .post('/api/auth/register')
            .send({
                "username":"test",
                "password":"password"
            })
            .then(result => {
                expect(result.status).toBe(201);
            });
        });//post for 201

        it("should return json on successful post",  () => {
            request(server)
           .post('/api/auth/register')
           .send({
               "username":"test",
               "password":"password"
           })
           .then(result => {
               expect(result.type).toMatch(/json/i);
           });
       });
    });//describe post register

    describe("POST /api/auth/login", () => {
        it("should return 200 on successful login", () => {
            request(server)
            .post('/api/auth/login')
            .send({
                "username":"test",
                "password":"password"
            })
            .then(result => {
                console.log(result)
                expect(result.status).toBe(200);
            });
        });//return 200 on login

        it("should return json on successful login", () => {
            request(server)
            .post('/api/auth/login')
            .send({
                "username":"test",
                "password":"password"
            })
            .then(result => {
                console.log(result)
                expect(result.type).toMatch(/json/i);
            });
        });
    });//describe post login

    describe("GET /api/jokes", () => {

        it("should return status 200", () => {
            request(server)
            .post('/api/auth/login')
            .send({
                "authorization":token
            })
            .then(result => {
                expect(result.status).toBe(200);
            });
        });//return 200
        
        it("should return json object", () => {
            request(server)
            .post('/api/auth/login')
            .send({
                "authorization":token
            })
            .then(result => {
                expect(result.type).toMatch(/json/i);
            });
        });
    });//describe get jokes

});//describe server.js
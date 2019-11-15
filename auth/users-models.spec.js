const db = require('../database/dbConfig.js');


const {getAll, findBy, findById, add} = require('./users-model');


describe("user model", () => {
    describe('All functions', () => {
        beforeEach(async () => {
            await db('users').truncate()
        });

        it("should add a user to the database", async () => {
           let newUser =  await add({
                username:"test model",
                password: "password"
            });

            expect(newUser.username).toBe("test model");
            expect(newUser.id).toBeDefined();

        });//it should add user

        it("should find a user by id", async ()=> {
            let findUser = await add({
                username:"find user",
                password:"password"
            });

            const foundUserById = await findById(findUser.id)

            expect(foundUserById.username).toBe("find user");
            
        });//find a user

        // it("should find a user by username", async ()=> {
        //     let findUser = await add({
        //         username:"find user 2",
        //         password:"password"
        //     });

        //     let foundUserByUsername = await findBy(findUser.id);

        //     expect(foundUserByUsername.username).toBe("find user 2");
            
        // });





    });//describe add user




});//describe user model
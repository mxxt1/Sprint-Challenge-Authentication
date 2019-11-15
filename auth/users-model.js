const db = require('../database/dbConfig.js');

module.exports = {
    getAll,
    findBy,
    findById,
    add
};

//get all
function getAll(){
    return db('users').select("id","username");
}


//findBy

function findBy(filter){
    return db('users').where(filter);
}


// add user

async function add(user){
    const [id] = await db('users').insert(user);

    return findById(id);

    // return db('users').insert(user);
}


// findById()
function findById(id){
    return db('users').select('id','username').where({id}).first();
} 
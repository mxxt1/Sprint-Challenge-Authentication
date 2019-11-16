module.exports = {
    validateUser
}

function validateUser(user){
    let errors = [];

    if(!user.username || user.username < 2){
        errors.push('Username must be at least 2 characters')
    }

    if(!user.password || user.password < 4){
        errors.push("Password must be at least 4 characters")
    }

    return{
        isSuccessful: errors.length > 0 ? false : true,
        errors
    };
};
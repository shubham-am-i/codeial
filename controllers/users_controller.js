module.exports.profile = function(req, res){
    res.end('<h1> User Profile</h1>')
}

// render sign up
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', { title: "Codeial | sign up"});
}

// render sign in
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', { title: "Codeial | sign in"});
}

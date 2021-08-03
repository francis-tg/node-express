//const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const Users = require("../models/Users")
const bcrypt = require("bcrypt")



PassportLocal = (passport)=>{



passport.use(new LocalStrategy({usernameField:'email'},
  function(username, password, done) {
    Users.findOne({where:{ email: username }}).then((user) => {
     //if (err) { return done(err); }
     if (!user) { return done(null, false,{message:"incorrect username"}); }
    //   if (!user.verifyPassword(password)) { return done(null, false); }
    //   return done(null, user);
    

    bcrypt.compare(password, user.password,function(err,isMatch){
        if(err) throw err;
   
        if(isMatch){
            return done(null, user);
        }else{
            return done(null, false, {message:"password incorrect"});
        }
    
        
    });
    
   
     });
}
))

passport.serializeUser((user, done)=>{
done(null, user.id)
})

passport.deserializeUser((id, cb)=>{
     Users.findByPk(id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
})


};



module.exports = PassportLocal
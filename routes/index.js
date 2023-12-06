var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./posts");
const passport = require("passport");

const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get('/profile',isLoggedIn, async function(req,res,next){
 const user=await userModel.findOne({
  username:req.session.passport.user //for the user data who is logged in
 })
//  console.log(user);
  res.render("profile",{user});
})

router.get('/login',function(req,res,next){
  // console.log(req.flash("error")); //error is an array
  res.render("login",{error:req.flash('error')});
});

router.get('/feed',function(req,res,next){
  res.render("feed");
});
// router.get('/alluserposts',async function(req,res,next){
//  let user= await userModel
//  .findOne({_id:"656e30df20175564de29d707"})
//  .populate('posts')
//  res.send(user);
// })

// router.get('/createuser', async function(req,res,next){
//  let createduser=await  userModel.create({
//     username: "md_kamran",
//     password: "1234",
//     fullName: "kamran",
//     email:"mdkamran0109@gmail.com",
//   });

//   res.send(createduser);
// })

// router.get('/createpost',async function(req,res,next){
//  let createdpost=await postModel.create({
//     postText:"Awesome",
//     user:"656e30df20175564de29d707"
//   });

//   // res.send(createdpost);
//   let user=await userModel.findOne({_id:"656e30df20175564de29d707"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done");
// });

router.post("/register", function (req, res) {
  // const userData=new userModel({
  //   username:req.body.username,
  //   email:req.body.email,
  //   fullname:req.body.fullname
  // })
  const { username, email, fullname } = req.body;
  //creating a new userModel instance with the extracted data.
  const userData = new userModel({ username, email, fullname });

  //Registering the new user using Passport's register method
  userModel.register(userData, req.body.password).then(function () {

    //Authenticating the user after successful registration
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true //if not logged in then flash will be shown
}),function(req,res){
  // res.redirect('/');
});

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});




function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;

const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('joi');
const express=require('express');
const User=require('../models/user');
const LoginInfo=require('../models/logininfo');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router=express.Router();

//Autenticar Utilizador
router.post('/', async (req,res)=>{   
    const { password, userName } = req.body;
  
    // Valida a existencia do user
    let user=await User.findOne({ where: {username:userName,active: true} });  
    if(!user) return res.status(400).send('Invalid username or  password');
    
   const validPassword=await bcrypt.compareSync(password,user.password);
   if(!validPassword) return res.status(400).send('Invalid username or  password');

    const token=await jwt.sign({_id:user._id,username:user.username,profile:user.profile,transactions:user.transactions,name:user.name,picture:user.picture,email:user.email},config.get('jwtPrivateKey'));
   
    res.send(token); 
    
});

router.post('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // the token is now available in req.user
  res.json({ token: req.user });
});

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), async(req, res) => {
    const user = req.user;
    const { User } = require('../models/user');
    const { id, name, emails, photos } = profile;
    var userDB = await User.findOne({ googleId: id });
   
    //User was not found, so create a new user
    if (!userDB) {
     userDB=  new User({ googleId:id,name, email:emails[0],photoUrl:photos[0] });
        await userDB.save();
    }

    //TODO: Update signin info

    //Generate JWT token to protect the routes
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
    res.json({ token });
});

module.exports=router;
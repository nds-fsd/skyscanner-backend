const User =require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");

const profileControllers = {};
try {
profileControllers.removeProfileById = (req, res) => {
  const id = req.params.id;
  
  User.findByIdAndDelete(id, {}, (error, result) =>{
   if(error){
       res.status(500).json({error: error.message});
   }else if(!result){
       res.status(404).send();
   }else{
       res.json(result);
   }
  })
};
}catch (error) {res.status(500).send(error)};

try  {
profileControllers.updateProfileById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const updatedUser = {
      
      firstname: data.firstname,
      lastname: data.lastname,
    
    };
  User.findByIdAndUpdate(id, updatedUser, {returnDocument: 'after'},(error, result) =>{
      if(error){
          res.status(500).json({error: error.message});
      }else if(!result){
          res.status(404);
      }else{
          res.status(200).send();
      }
     })
  

  res.json({message: "updated user", updatedUser})
};} catch (error) {res.status(500).send(error)};

try {
profileControllers.addAirportById = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const addAirport = {
      
      prefairport: data.prefairport,
     
    };
  //const user = await User.findById(id).exec();

  User.findByIdAndUpdate(id, addAirport, {returnDocument: 'after'},(error, result) =>{
      if(error){
          res.status(500).json({error: error.message});
      }else if(!result){
          res.status(404);
      }else{
        res.status(200).send();
          
      }
     })
  
  res.json({message: "Add airport"})
};}
catch (error) {res.status(500).send(error)};

try {
profileControllers.changePassword = (req, res, next) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(422).json({errors: errors.array()});
    } else {
      User.updateOne({password: req.body.password})
      .exec()
      .then(bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({error: err});
        } else {
          User.findById(req.params.id, (err, user) => {
            if (err) {
              return next(err);
            }
            user.password = hash
            user.save()
          })
          .then(result => {
            res.status(201).json({message: "password changed"});
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });
        }
      }));
    }
    };} catch (error) {res.status(500).send(error)};

try {
profileControllers.getOneUser = async (req, res) => {
      const id = req.params.id; 
      User.findById(id, {}, {} , (error, profile) => {
    
         if(error){
             res.status(500).json({error: error.message});
         } else if(!profile){
             res.status(404).send();
         } else {
             res.json(profile);
         }
     }); 
    };} catch (error) {res.status(500).send(error)};

try {  
profileControllers.getOneUserbyEmail = async (req, res) => {
  const email = req.params.email;
  const getUserbyEmail = await User.findOne({email: email}).exec();
  res.json({getUserbyEmail}); 
    };} catch (error) {res.status(500).send(error)};

try {
profileControllers.addToFavFlight = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const addFav = await User.findByIdAndUpdate({_id: id}, {$push: {fav: data.fav}});

  res.json({message: "Add flight to wishlist"});

};} catch (error) {res.status(500).send(error)};

profileControllers.addBooking = async (req, res) => {
  
  const id = req.params.id;
  const data = req.body;
  const addbooking = await User.findByIdAndUpdate({_id: id}, {$push: {booking: data.booking}});
  res.json({message: "Add booking"});

}

  
    module.exports = profileControllers;
    
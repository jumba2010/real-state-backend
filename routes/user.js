const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express=require('express');
const User=require('../models/user');
const Profile=require('../models/profile');
const Sucursal=require('../models/sucursal');
const UserSucursal=require('../models/usersucursal');
const Transaction=require('../models/transaction');
const ProfileTransaction=require('../models/profiletransaction');
var http = require("https");
const keys = require('./../config/keys');
const router=express.Router();

//Cria Utilizador
router.post('/', async (req,res)=>{   
    const {name,email,contact,address,picture,profileId,sucursals,username, password,activatedBy,createdBy}=req.body;
    const salt=await bcrypt.genSaltSync(10);
    let newpassword=await bcrypt.hashSync(username,salt);
      User.create({name,email,contact,address,picture,profileId,username, password: newpassword,activatedBy,createdBy}).then(async function(user) {
         
        //Criando as sucursais do user
         for (let index = 0; index < sucursals.length; index++) {
          UserSucursal.create({sucursalId:sucursals[index].id,userId:user.id,activatedBy,createdBy});
        } 
        
        res.send(_.pick(user,['id','username','active']));
      })   
});

router.put('/password/:id', async (req,res)=>{   
    var {password,updatedBy}=req.body;
    const salt=await bcrypt.genSalt(10);
    password= await bcrypt.hash(password,salt);
    User.update(
        { password,updatedBy },
        { where: { id:req.params.id,active:true } },
        {fields: ['password','updatedBy']},       
      )
        .then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

router.put('/inactivate/:id', async (req,res)=>{   
  var {updatedBy}=req.body;
  User.update(
      { active:false,updatedBy },
      { where: { id:req.params.id,active:true } },
      {fields: ['active','updatedBy']},       
    )
      .then(result =>
          res.send(result)
      )
      .catch(err =>
        console.log(err)
      )    
 
});

router.put('/activate/:id', async (req,res)=>{   
  var {updatedBy}=req.body;
  User.update(
      { active:true,updatedBy },
      { where: { id:req.params.id,active:false } },
      {fields: ['active','updatedBy']},       
    )
      .then(result =>
          res.send(result)
      )
      .catch(err =>
        console.log(err)
      )  
 
});

router.put('/:id', async (req,res)=>{   
  var {name,email,contact,address,picture,profileid,updatedBy}=req.body; 
  User.update(
      { name,email,contact,address,picture,profileid,updatedBy },
      { where: { id:req.params.id,active:true } },
      {fields: ['name','email','contact','address','picture','profileid','updatedBy']},     
    )
      .then(result =>
          res.send(result)
      )
      .catch(err =>
        console.log(err)
      );        

});


router.get('/all', async (req,res)=>{
 // var {sucursals}=req.body; 
  User.findAll({raw: true }).then(async function(users) {
       var newList=[]
        for (let index = 0; index < users.length; index++) {
          const element = users[index];

        //Busca o Perfil do User
         let profile=await  Profile.findOne({raw: true,where:{id:users[index].profileId}
         });  

        //Busca as transações do user
        var transactions=[]
         let profileTransactions=await  ProfileTransaction.findAll({raw: true,where:{profileId:users[index].profileId}
         });    
        for (let index = 0; index < profileTransactions.length; index++) {
                   let transaction=await  Transaction.findOne({raw: true,where:{id:profileTransactions[index].transactionId}
          });
          transactions.push(transaction)          
         }

        //Busca as sucursais do user
        var sucursals=[]
        let userSucursals=await  UserSucursal.findAll({raw: true,where:{userId:users[index].id}
        });    
       for (let index = 0; index < userSucursals.length; index++) {
                  let sucursal=await  Sucursal.findOne({raw: true,where:{id:userSucursals[index].sucursalId}
         });
         sucursals.push(sucursal)          
        }

         
         element.profile=profile;
         element.sucursals=sucursals;
         element.transactions=transactions;
        newList.push(element)   
         
        }   
         res.send(newList);
     
      });          
  
    });

    router.get('/unique/:userName', async (req,res)=>{
            User.findOne({raw: true,where:{username:req.params.userName}, }).then(async function(user) {
          
        //Busca o Perfil do User
             let profile=await  Profile.findOne({raw: true,where:{id:user.profileId}
             });  
    
            //Busca as transações do user
            var transactions=[]
             let profileTransactions=await  ProfileTransaction.findAll({raw: true,where:{profileId:user.profileId}
             });    
            for (let index = 0; index < profileTransactions.length; index++) {
                       let transaction=await  Transaction.findOne({raw: true,where:{id:profileTransactions[index].transactionId}
              });
              transactions.push(transaction)          
             }
    
            //Busca as sucursais do user
            var sucursals=[]
            let userSucursals=await  UserSucursal.findAll({raw: true,where:{userId:user.id}
            });    
   
           for (let index = 0; index < userSucursals.length; index++) {
                      let sucursal=await  Sucursal.findOne({raw: true,where:{id:userSucursals[index].sucursalId}
             });
             sucursals.push(sucursal)          
            }
             
            user.profile=profile;
            user.sucursals=sucursals;
            user.transactions=transactions;
             res.send(user);
         
          });          
      
        });

    

module.exports=router;
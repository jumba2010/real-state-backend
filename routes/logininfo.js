const express=require('express');
const LoginInfo=require('../models/logininfo');
const router=express.Router();
 
//Cria Membro
router.post('/', async (req,res)=>{
  const {ipaddress,userAgent,location,userId}=req.body;
  await LoginInfo.create({ipaddress,userAgent,location,userId,createdBy:1,activatedBy:1}).then(async function(logininfo) {    
    res.send(logininfo); 

            }); 
});

//Actualiza duracao
router.put('/:id', async (req,res)=>{
  const {duration}=req.body;  
  LoginInfo.update(
      {duration},  
      { where: { id:req.params.id} },    
       {fields: ['duration']},
     
    )
      .then(result =>
          res.send(result)
      )
      .catch(err =>
        console.log(err)
      )    
});
 
router.get('/:userId', async (req,res)=>{         
 LoginInfo.findAll({where:{userId:req.params.userId}, order: [
          ['loginDate', 'DESC']
      ],}).then(async function(logininfos) {       
    res.send(logininfos);           
            }); 
    });

module.exports=router;
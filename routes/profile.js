const express=require('express');
const Profile=require('../models/profile');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {code,description,createdBy,activatedBy}=req.body; 
    Profile.create({ code,description,createdBy,activatedBy}).then(function(result) {
        res.send(result);
      })

});


router.put('/:id', async (req,res)=>{
    const {description,updatedby}=req.body;  
    Profile.update(
        {description,updatedBy},
        {fields: ['description','updatedBy']},
        { where: { id:req.params.id} }
      )
        .then(result =>
            res.send(result)
        )
        .catch(err =>
          console.log(err)
        )    
});

//Busca Todos os Membros
router.get('/', async (req,res)=>{  
 Profile.findAll().then(function(profiles) {
        res.send(profiles);
      });   
});


module.exports=router;
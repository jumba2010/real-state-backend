const express=require('express');
const Sucursal=require('../models/sucursal');
const router=express.Router();

 
//Cria Membro
router.post('/', async (req,res)=>{
    const {code,description,createBy,activatedBy}=req.body; 
    Sucursal.create({ code,description,createBy,activatedBy}).then(function(result) {
        res.send(result);
      })

});


router.put('/:id', async (req,res)=>{
    const {description,updatedBy}=req.body;  
    Sucursal.update(
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

router.get('/', async (req,res)=>{  
 Sucursal.findAll().then(function(sucursals) {
        res.send(sucursals);
      });   
});


module.exports=router;
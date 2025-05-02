const express = require('express')
const router = express.Router()
const {Booking} = require('../models')

router.get('/',async(req,res)=>{
    try{
const data =await Booking.findAll()
res.json(data)}
catch(e){
    console.log(`Data Gagal dibaca : ${e}`)
}
})

router.post('/',async (req,res)=>{
    try{
const data = await Booking.create(req.body)
res.json(data)
    }catch(e){
console.log(`Data Gagal dikirim : ${e}`)
    }
})

router.put('/:id',async (req,res)=>{
    try{
const {status} = req.body
const { id } = req.params;  
const data = await Booking.findByPk(id);
if (data) {
  data.status = status;
  await data.save();  
  res.json(data);
} else {
  res.status(404).json({ error: 'Booking not found' });
}

    }catch(e){

    }
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    const data = await Booking.findByPk(id)
    if(data){
        await data.destroy()
        res.json(data)
    }
})
module.exports = router
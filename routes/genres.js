const Joi = require('joi');
const mongoose = require('mongoose');

const express = require('express');
const router = express.Router();

//router.use(express.json());





const genreSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

})

const Genre = mongoose.model('Genre', genreSchema);//class



router.get('/',async (req,res)=>{
    //res.send(genres)
    const genres = await Genre
        .find()
        .select({name:1});
        
    
        res.send(genres);
       
});

router.post('/',async (req,res)=>{
    // const { error } = validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

  
    const genre = new Genre({
        name: req.body.name
    });
    
    const result = await genre.save();
    res.send(result);
       
});

router.put('/:id',async (req,res)=>{
    // const { error } = validateGenre(req.body);
    // if (error) return res.status(400).send(error.details[0].message);


    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
        new: true
    });

    if (!genre) return res.status(404).send('The genre with given ID does not exist');
   
    res.send(genre);
});

router.delete('/:id',async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('No genre with the given ID');
    console.log(req.params);
    
    res.send(genre);
});

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('No genre with the given ID');
    
    res.send(genre);
});


function validateGenre(genre){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = router;
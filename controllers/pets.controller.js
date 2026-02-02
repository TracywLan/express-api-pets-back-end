const Pet = require('../models/pet');
const express = require('express');
const router = express.Router();

//routes
/*
HTTP Method	Controller	Response	URI	Use Case
POST	create	200	/pets	Create a pet
GET	index	200	/pets	List pets
GET	show	200	/pets/:petId	Get a single pet
PUT	update	200	/pets/:petId	Update a pet
DELETE	deletePet	204	/pets/:petId	Delete a pet
*/

// CREAT - POST - /pets

router.post('/', async (req, res) => {
    try {
        // throw new Error('This is a error message!');
        const createdPet = await Pet.create(req.body);
        // res.json({
        //     message: 'Successfully Created Pet',
        //     pet: newPet
        // })
        res.status(201).json(createdPet);
    } catch(error) {
        res.status(500).json({err:error.message})
        
    }
})





module.exports = router;

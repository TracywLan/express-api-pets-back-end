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

// READ - GET - /pets
router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);
        // throw new Error('This is an error message');
    } catch(error) {
        res.status(500).json({err:error.message})
    }
})

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);
        
        // If not pet is found, let us return 404 error message
        if(!foundPet) return res.status(404).json({ message:'Pet not found' });

        // Now we have found pet, return pet json
        res.status(200).json(foundPet);
    } catch(error) {
        res.status(500).json({err:error.message});
    }
})

// DELETE - DELETE - /pets/:petId
router.delete('/:petId', async(req, res) => {
    try {
        const deletePet = await Pet.findById(req.params.petId);
        if(!deletePet) {
            return res
                .status(404)
                .json({ message: 'Pet Id not found, cannot delete '});
        }

        await deletePet.deleteOne();
        return res.status(200).json({ message: 'delete success', pet:deletePet });
    } catch(error) {
        res.status(500).json({err:error.message});
    }
})

router.put('/:petId', async (req, res) => {
    try{
        const petId = req.params.petId

        // new: true makes sure the pet returned from the updated query
        const updatedPet = await Pet.findById(petId, req.body, {new:true,}); //Adding { new: true } as the third argument will give us the updated resource, instead of the original
        if(!updatedPet) return res.status(404).json({ message: 'Pet Id not found, try again!' });
        return res.status(200).json({ message:'Pet updated successfully', pet: updatedPet });
    } catch(error) {
        res.status(500).json({err:error.message});
    }
    
})


module.exports = router;

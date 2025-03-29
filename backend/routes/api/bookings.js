const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./session');

const router = express.Router();

//Validate Spot inputs
const validateSpot = [
  check('ownerId')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a valid owner ID.'),
  check('address')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a valid address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid city.'),
  check('state')
    .exists({ checkFalsy: true })
    .isLength({ max: 2 })
    .withMessage('Please provide the state abbreviation.'),
  check('country')
  .exists({ checkFalsy: true })
    .withMessage('Please provide a country.'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a latitude.'),
    check('lng')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a longitude.'),
  check('name')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a name for this spot.'),
  check('description')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a description.'),
  check('price')
  .exists({ checkFalsy: true})
  .withMessage('Please provide a price.'),
  handleValidationErrors
];

// Get all spots route 
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
      return res.json({
        spots
      });
    }
  );

  //Create a spot route
router.post('/', validateSpot, requireAuth, async (req, res) => {
      const { ownerId, address, city, state, country, lat, lng, name, description, price  } = req.body;
      
      const spot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price });
  
  
      return res.status(201).json({
        spot
      });
    }
  );

 // Get all spots from current user route 
router.get('/userspots', requireAuth, async (req, res) => {

  const { user } = req;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  });
    return res.json({
      spots
    });
  }
);



  
  module.exports = router;
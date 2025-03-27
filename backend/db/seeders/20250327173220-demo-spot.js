'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
        await Spot.bulkCreate([
          {
            ownerId: 1,
            address: '123 Bambam St',
            city: 'Cleveland',
            state: 'OH',
            country: 'United States',
            lat: 41.499321,
            lng: -81.694359,
            name: 'Bennys Place',
            description: 'Enjoy the scenic home in a safe neighborhood',
            price: 239.00,
            previewImage: 'url',
            avgRating: 3.5
          },
          {
            ownerId: 2,
            address: '5263 S Crimson Rd',
            city: 'Cloverfield',
            state: 'MD',
            country: 'United States',
            lat: 38.718153,
            lng: -76.886976,
            name: 'The Spot To Be!',
            description: 'Lots of fun to be had in the awesome home!',
            price: 384.00,
            previewImage: 'url',
            avgRating: 4.5
          },
          {
            ownerId: 3,
            address: '9678 Arrowhead Rd',
            city: 'Big Bear',
            state: 'CA',
            country: 'United States',
            lat: 34.243519,
            lng: -116.899429,
            name: 'Snow Fun',
            description: 'Come have some hot coco and ski in the snow',
            price: 178.00,
            previewImage: 'url',
            avgRating: 3.4
          },
        ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    
    return queryInterface.bulkDelete(options, null, {});
  }
};


const Hotel = require('../models/hoteloc')
const cities = require('./cities');
const { places,descriptors, images } = require('./seedHelpers')
const mongoose = require('mongoose');

main().catch(err =>{ 
    console.log("Connection Failed");
    console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Aroom');
    console.log("Connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const rootDB = async() =>{
    await Hotel.deleteMany({});
    const total = cities.length;
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random()*total);
        const price = Math.floor(Math.random()*20)*10;
        const hotel = new Hotel({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:`${sample(images)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo esse vero recusandae, fuga deserunt ab repudiandae non, explicabo sequi quos iure quasi asperiores commodi quae! Fugiat inventore pariatur perferendis fugit!',
            price
          })
      await hotel.save();
    }
}

rootDB();
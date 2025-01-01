const express = require('express');
const app = express();
const path = require('path');
const Hotel = require('./models/hoteloc');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
//error handling
const mongoose = require('mongoose');

main().catch(err =>{ 
    console.log("Connection Failed");
    console.log(err)});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Aroom');
    console.log("Connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));




app.get('/', (req,res) =>{
    res.send('NOTHING HERE!!!')
});

app.get('/hotels', async(req,res) =>{
  const hotels = await Hotel.find({})
  res.render('hotels/index', {hotels});
});

app.get('/hotels/new', (req,res) =>{
  res.render('hotels/new');
});

app.post('/hotels', async(req,res)=>{
  const hotel = new Hotel(req.body.hotel);
  await hotel.save();
  res.redirect(`/hotels/${hotel._id}`)
});

app.get('/hotels/:id', async (req,res) =>{
  console.log(req.params);
  const hotel = await Hotel.findById(req.params.id);
  res.render('hotels/show', {hotel});
});
// if n is here then it will be like uk ^

app.get('/hotels/:id/edit',async (req,res) =>{
  const hotel = await Hotel.findById(req.params.id);
  res.render('hotels/edit', {hotel});
});

app.put('/hotels/:id', async (req,res) =>{
  const { id } = req.params;
  const hotel = await Hotel.findByIdAndUpdate(id,{...req.body.hotel});
  res.redirect(`/hotels/${hotel._id}`);
})

//delete
app.delete('/hotels/:id', async (req,res) =>{
  const { id } = req.params;
  await Hotel.findByIdAndDelete(id);
  res.redirect('/hotels');

})

app.listen(7810, () =>{
    console.log('Server is running on port 7810');
});

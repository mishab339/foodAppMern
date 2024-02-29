const { response } = require('express');
const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const localUrl = 'mongodb://localhost:27017'
// const mongoURL = 'mongodb+srv://gofood:Aovf4vZTGI2OXR9Y@cluster0.ytnqqit.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0'
const mongoURL = 'mongodb://gofood:Aovf4vZTGI2OXR9Y@ac-ywqwuqj-shard-00-00.ytnqqit.mongodb.net:27017,ac-ywqwuqj-shard-00-01.ytnqqit.mongodb.net:27017,ac-ywqwuqj-shard-00-02.ytnqqit.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-jzs0hr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const mongoDB =async ()=>{
    // MongoClient.connect(mongoURL).then((client) => { 
  
    //     const connect = client.db('gofoodmern'); 
      
    //     // Connect to collection 
    //     const collection = connect 
    //             .collection("food_items"); 
      
    //     // Fetching the records having  
    //     // name as saini 
    //     collection.find({ }) 
    //         .toArray().then((ans) => { 
    //             console.log(ans); 
    //         }); 
    // }).catch((err) => { 
      
    //     // Printing the error message 
    //     console.log(err.Message); 
    // })
  const connect = mongoose.connect(mongoURL,{useNewUrlParser:true})
  connect.then(()=>{
    console.log('connected..');
   const foodSchema = new Schema({},{strict:false});
  
   const food_itemsData = mongoose.model('food_items',foodSchema);
  
   food_itemsData.find({}).then(async(foodItemsData)=>{
    // console.log(response)
    const foodCategorySchema = new Schema({},{strict:false});
    const food_CategoryData = mongoose.model('food_category',foodCategorySchema,'food_category');
    await food_CategoryData.find({}).then((foodCategoryData)=>{
      global.food_items = foodItemsData;
      global.food_category = foodCategoryData;
      console.log(global.food_category)
    })
    
   })
  
  }).catch((err)=>{
    console.log(err);
  })
}

module.exports = mongoDB;

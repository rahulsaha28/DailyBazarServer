const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()
const mongoose = require('mongoose');
const productSchema = require('./DataBase/ProductSchema');
const orderSchema = require('./DataBase/OrderSchema');

app.use(cors());
app.use(express.json());

// database connection
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ulntk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(url,  { useNewUrlParser: true,  useUnifiedTopology: true })

// connect with product
const Product  = new mongoose.model('Product', productSchema);

// get all product
app.get('/product/all', async(req, res)=>{
    await Product.find({}, (error, result)=>{
        if(error){
            res.status(500).json({error:"Can not find Product"})
        }
        else{
            res.status(200).json(result)
        }
    })
});

// get specific product by id
app.get('/product/:id', async(req, res)=>{

    await Product.find({_id:req.params.id}, (error, result)=>{
        if(error){
            res.status(500).json({error:"Can not find Product"})
        }
        else{
            res.status(200).json(result)
        }
    })
  });

// set a specific product 
  app.post('/product/create', async(req, res)=>{
      
     await Product.create(req.body, (err, result)=>{
         if(err){
             res.status(500).json({error:"Can not create Product"})
         }
         else{
             res.status(200).json({success:"Create Product successfully"})
         }
     })
  });

//   delete specific product by id
  app.delete('/product/delete', async(req, res)=>{
    
    await Product.deleteOne({_id:req.body.id}, (error, result)=>{
        if(error){
            res.status(500).json({error:"Can not find Product"})
        }
        else{
            res.status(200).json({success:"Successfully deleted the Product"})
        }
    })

  });


//   connect with Order
const Order = new mongoose.model('Order', orderSchema);

// creating a order
app.post('/order/create', async(req, res)=>{

    await Order.create(req.body, (error, result)=>{
        if(error){
            res.status(500).json({error:"Order not placed."});
        }
        else{
            res.status(200).json({success:"Order placed Successfully."});
        }
    });
});


// show order by email
app.post('/order/search', async(req, res)=>{

    await Order.find({email:req.body.email}, (error, result)=>{
        if(error){
            res.status(500).json({error:"You have no order yet."});
        }
        else{
            res.status(200).json(result);
        }
    });

});


app.listen(process.env.PORT, ()=>console.log("Listening ..."));
const express = require("express");
const cors = require("cors");     
require("dotenv").config();     
const app = express();           
const route = require('./src/routes/index.route'); 
const { connectToDatabase } = require('./config/db.config'); 
app.use(cors({origin: '*'}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) 

app.use("/api/",[route.task]) 
app.get('/', (req, res) => {
    return res.status(200).send(`Welcome To My APP`)   ;
})
connectToDatabase().then( async() => {
console.log('Database connection established successfully.');
    app.listen(process.env.PORT, "0.0.0.0", async () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})  

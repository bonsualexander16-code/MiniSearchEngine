const express = require("express");
const cors = require("cors") ;
const axios = require("axios") ;
const application = express() ;
require("dotenv").config() ;

application.use(express.static(__dirname));

application.use(cors()) ;
application.use(express.json()) ; 
application.use(express.urlencoded({extended : true})) ;
application.use(express.static("public")) ;

application.get("/search" , async (req , res)=>{
    const q = req.query.q ;
    if(!q){
        return res.json({
            "error" : "Query required"
        }) ;
    }
    
    try {
        const response = await axios.get("https://serpapi.com/search" , {
            params:{
                q : q ,
                api_key : process.env.API_KEY
            }
        }) ;
        
        const result = response.data.organic_results.map((r)=>({
            title : r.title,
            link :r.link ,
            snippet : r.snippet ,
            image : r.thumbnail || null 
        })) ;
        
        res.json(result) ;
        
        
    } catch (e) {
        return res.send("An Error occured") ;
    }
    
})

const PORT = process.env.PORT || 7777 ;

console.log(process.env.API_KEY) ;

application.listen(PORT , ()=>{
    console.log(`Server is Running on port ${PORT}`) ;
})
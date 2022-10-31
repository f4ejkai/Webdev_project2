const {MongoClient, Collection} = require("mongodb")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const fs = require("fs")
const express = require("express")
const app = express()
app.listen(3000,()=>{
    console.log("listening on port 3000")
})
app.use(express.static(__dirname))
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html") 
})
app.get("/loggedin", (req,res)=>{
    /*document.getElementById("name").innerHTML = foundUser.name*/
    res.sendFile(__dirname + "/loggedin.html")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(cors({
    origin: '*'
}))
const uri = `mongodb+srv://user:${process.env.PASSWORD}@cluster0.lwe1xbp.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)
app.post("/signup",function(req, res){
    const name = req.body.name
    const password = req.body.password
    const data = {
        "name":name,
        "password":password
    }
    MongoClient.connect(uri, function(err, db){
        if (err) throw err
        const dbo = db.db("mydb")
        dbo.collection("Users").insertOne(data,function(err, res){
            if (err) throw err
            console.log("one document inserted")
            db.close()
        })
    })
    return res.redirect("/")

})


app.post("/addBookmark", function(req, res){
    const name = "Joe"
    const bookmarks = [1,2]
    const data = {
        "name":name,
        // "password":password,
        "bookMarks":bookmarks
    };

    console.log(data)

    MongoClient.connect(uri, function(err, db){
        if (err) throw err
        const dbo = db.db("mydb")
        console.log("Testing")
        dbo.collection("Users").findOne({name:name},function(err, foundUser){
            if (!err){
                if (foundUser){
                    const dbo = db.db("mydb");
                    dbo.collection("Users").updateOne(name,data,function(err, res){
                        if (err) throw err
                        console.log("error adding bookmarks")
                        db.close()
                    })
                }
                else {
                    res.send("Username Not Found")
                }
            }
            db.close();
        })
    })
    /*return res.redirect("/")*/
});



app.post("/login",cors(), function(req, res){
    const name = req.body.name
    const password = req.body.password
    const data = {
        "name":name,
        "password":password
    }
    MongoClient.connect(uri, function(err, db){
        if (err) throw err
        const dbo = db.db("mydb")
        dbo.collection("Users").findOne({name:name},function(err, foundUser){
            if (!err){
                if (foundUser){
                    if(foundUser.password === password){
                        /*res.sendFile(__dirname + "/loggedin.html")*/
                        res.redirect("/loggedin")
                        fs.appendFile(".env", "NAME=foundUser.name", function (err) {
                            if(err) throw err
                            console.log("updated")
                        })
                        /*console.log(foundUser.name)*/
                    }
                    else {
                        res.send("Invalid Password")
                    }
                }
                else {
                    res.send("Username Not Found")
                }
            }
            db.close()
        })
    })
    /*return res.redirect("/")*/
})


/*MongoClient.connect(uri, function(err, db){
    if (err) throw err
    const dbo = db.db("mydb")
    const myObject = {
        name:"Elliot", password:"pass123"
    }
    dbo.collection("Users").insertOne(myObject,function(err, res){
        if (err) throw err
        console.log("one document inserted")
        db.close()
    })
})*/


/*async function run(){
    try {
        const database = client.db("sample_mflix")
        const movies = database.collection("movies")
        const query = {title: "Back to the Future"}
        const movie = await movies.findOne(query)
        console.log(movie)
    }
    finally{
        await client.close()
    }
}
run().catch(console.dir)*/
const express = require("express");
const path = require("path");
const { connectToMongo } = require("./connection/url");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const cors = require("cors");
const shortid =require("shortid");

const app = express();
const PORT = 8000;


connectToMongo("url").then(() => console.log("mongo connected"));


app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


app.get("/", async (req,res)=>{
  const getUrls = await URL.find({});
  return res.render("home.ejs")

})


app.post("/url" , async (req,res)=>{
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortID =  shortid();
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitedHIstory:[],
    })
    console.log(body.url)
    return res.json({id:shortID})
})
app.get("/:shortId", async (req, res) => {
  console.log("executed")
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId, 
    },
    {
      $push: {
        visitedHIstory: {
            timestamp: Date.now(),
        }
      },
    }
  );
  console.log(entry)
  res.redirect(entry.redirectUrl);
});


app.listen(PORT, () => {
  console.log(`server is listening on port:http://localhost:${PORT} `);
});






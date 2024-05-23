const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        requires:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        requires:true,

    },
    visitedHIstory:[ {
        timestamp:{type:Number}
    }]
})

const URL = mongoose.model("url",urlSchema);

module.exports = URL;
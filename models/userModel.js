var mongoose = require('mongoose');
const Schema =mongoose.Schema;
var userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    settings:[{
        settingTitle:{type:String},
        value:{type:String}
    }]

},{timestamps:true})

mongoose.model('Users',userSchema);
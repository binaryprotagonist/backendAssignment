const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema;

var settingSchema = new Schema({
    settings:[{
        settingType:{type:String},
        settingName:{type:String},
        options:[{
            name:{type:String }
        }],
        activeStatus:{type:Boolean,default:true}
    }],
    userId:{type:ObjectId}

})

mongoose.model('Settings',settingSchema);
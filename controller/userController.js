const mongoose= require('mongoose');
const Users = require('../models/userModel');
const Settings = require('../models/settingModel')
const userModel = mongoose.model('Users')
const settingModel = mongoose.model('Settings')
const objectId =mongoose.Types.objectId;

class userController{
    async createUser(req){
        try{
            let users = new userModel();
            const userData =req.body;
            users.firstName = userData.firstName;
            users.lastName = userData.lastName;
            let setting = userData.settings;
            return users.save().then((userSaved)=>{
                if(userSaved && userSaved._id){
                    let settingRecord = new settingModel({
                        userId:userSaved._id,
                        settings:[{
                            settingType:'radio',
                            settingName:'gender',
                            options:[{
                                name:'male'
                            },
                            {
                                name:'feamle'
                            }
                            
                            ],
                            activeStatus:false

                        }]
                    });
                    return settingRecord.save().then((resp)=>{
                        return {
                            status:200,
                            message:"user save successfully",
                            success:true,
                            data:resp
                        }
                    })
                    .catch((error)=>{
                        return error;
                    });
                }
            })
        }catch(error){
            console.log(error)
            return error ;
        }

    }

    /*function for add settings */
    async addSetting(req){
        console.log(req.body.userId,req.body.settings)
        try{
            if(req.body.userId){
                let setting=await settingModel.findOne({userId:req.body.userId})
                if(setting){
                    let settings= req.body.settings;
                    let settingDetails=await settingModel.updateOne({userId:req.body.userId},{$push:{settings:settings}})
                    if(settingDetails.nModified){
                        return{
                            status:200,
                            message:'setting update successfully',
                            success:'true'
                        }
                    }
                }else{
                    return{
                        status:400,
                        message:'Not valid user',
                        success:false,
                        data:""
                    }
                }
            }else{
                return{
                    status:400,
                    message:'variable is empty',
                    success:false,
                    data:""
                }
            }
        }catch(error){
            console.log(error)
            return error;
        }
    }

    /* get user list */
    async getUserLIst(){
        let userList = await userModel.find();
        if(userList && userList.length>0){
            
            return{
                status:200,
                success:true,
                data:userList,
                messag:""
            }
        }else{
            return{
                status:400,
                success:false,
                data:'',
                messag:"Data Not Found"
            }
        }
    }

    async getUserById(req){
        let userId = req.body.userId
        let userData= await userModel.findById({_id:userId});
        if(userData){
            return {
                status:200,
                success:true,
                data:userData
            }
        }else{
            return {
                status:400,
                success:false,
                data:'',
                message:'user not found'
            }
        }

    }

    async getSettings(req){
        if(req.body.userId){
            let setting=await settingModel.findOne({userId:req.body.userId})
            if(setting){
                return {
                    status:200,
                    success:true,
                    data:setting
                }
            }

        }else{
            return {
                status:400,
                success:false,
                data:'userSetting not found'
            }
        }

    }
}
module.exports = new userController();
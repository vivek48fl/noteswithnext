const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:[true,"Provide email"],
        unique:true,
    },
    password:{
        type :String,
        required:[true,"Password can not be blank"],
        minlength:[8,"Min length for password must be at least 8 characters"],
    }
});
module.exports =mongoose.models.Users ? mongoose.model("Users"): mongoose.model("Users",userSchema);
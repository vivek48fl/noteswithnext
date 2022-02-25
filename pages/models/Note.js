const mongoose=require("mongoose");
const NoteSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,"Add  the Title"],
        unique:"true",
        maxlength:[40,"Max length can not be less than 40 characters"]
    },
    description:{
        type :String,
        required:[true,"Description can not be blank"],
        maxlength:[200,"Max length can not be more than 200 characters"]
    }
});
module.exports =mongoose.models["Note"] ? mongoose.model("Note"): mongoose.model("Note",NoteSchema);
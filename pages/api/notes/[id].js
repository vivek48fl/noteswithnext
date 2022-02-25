import dbConnect from "../../../utils/dbConnect";
import Note from "../../models/Note";

dbConnect();
const handler=async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  if(method==="GET"){
    try {
      const note = await Note.findById(id);
      if (!note) {
        res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
      console.log(error.message);
    }

  }
  else if(method==="PUT"){
    try {
      const updateNote =await Note.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if(!updateNote){
          res.status(400).json({ success: false });
      }
      res.status(200).json({success: true,data: updateNote})
    } catch (error) {
        res.status(400).json({ success: false });
    }

  }
  else if(method==="DELETE"){
    try {
      const deleteOne=await Note.deleteOne({_id:id});
      if(!deleteOne){
          res.status(400).json({success: false})
      } 
      res.status(200).json({success: true,data:{}})
   } catch (error) {
     res.status(400).json({success: false})
   }

  }else{
    res.status(400).json({success: false})
  }
  /*switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        if (!note) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error.message);
      }
      break;
    case "PUT":
      try {
        const updateNote =await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if(!updateNote){
            res.status(400).json({ success: false });
        }
        res.status(200).json({success: true,data: updateNote})
      } catch (error) {
          res.status(400).json({ success: false });
      }
      break;
      case "DELETE":
          try {
             const deleteOne=await Note.deleteOne({_id:id});
             if(!deleteOne){
                 res.status(400).json({success: false})
             } 
             res.status(200).json({success: true,data:{}})
          } catch (error) {
            res.status(400).json({success: false})
          }
    default:
        res.status(400).json({success: false})
        break;
  }*/
};
export default handler;
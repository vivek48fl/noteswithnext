import dbConnect from "../../../utils/dbConnect";
import Note from "../../models/Note";

dbConnect();
 const handler=async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const notes = await Note.find({});
      res.status(200).json({ success: true, data: notes });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  } else if (method === "POST") {
    try {
      const note = await Note.create(body);
      res.status(201).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === "PUT") {
    const note=await Note.findByIdAndUpdate(id, req.body,{new:true,runValidators:true});
    res.status(200).json({ success: true, data: note });
  }
  else if (method === "DELETE") {
    const note=await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: note });
  }
  else{
    res.status(400).json({ success: false });
  }
  /* switch(method) {
      case "GET":
          try{
              const notes=await Note.find({});
              res.status(200).json({success:true,data:notes});
          }
          catch(err){
              res.status(400).json({success:false})
          }
          break;
          case 'POST':
              try {
                  const note= await Note.create(req.body);
                  res.status(201).json({success:true,data:note});
              } catch (error) {
                res.status(400).json({success:false});                 
              }
              break;
              default:
                res.status(400).json({success:false});

  }*/
};
export default handler;
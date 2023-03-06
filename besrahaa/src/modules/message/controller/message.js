import MessageModel from "../../../../DB/model/Message.model.js";
import UserModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getALLMessages = async (req, res, next) => {
const messages = await MessageModel.find({ receiverId:req.user._id }).populate({
  path: "receiverId",
  select: "-_id username",
});
  return res.json({ message: "Messagemodule", messages });
};
export const getoneMessage = async (req, res, next) => {
  const {id}= req.params
  const message = await MessageModel.findById(id)

  return message
  ? res.status(200).json({ message: "user message Done",message })
  : next(new Error("InValid-MessageId"));
  };


export const getMessageprivate = async (req, res, next) => {

    const {id}= req.params
  
  const messages = await UserModel.findById(id).populate({
    path: "messages",
    select: "-_id Message",
  });
  return res.json({ message: "Messagemodule", messages });
};

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { receiverId } = req.params;
  const { Message } = req.body;

  const user = await UserModel.findById(receiverId);

  if (!user) {
    return next(new Error("InValid - Account"));
  }

  const messageCreated = await MessageModel.create({
    receiverId: user._id,
    Message,
  });
  await UserModel.updateOne(
    { _id: req.user._id },
    { $push: { messages: messageCreated._id } }
  );
  return res
    .status(201)
    .json({ message: "messageCreated Successfully", messageCreated });
});

    //it is return object without modifiedCount( hardDeleted== deleted from database)
    export const findOneAndDeleteMessage = asyncHandler(async (req, res, next) => {
      const {messageId}= req.params;
      
   const user = await UserModel.findOneAndUpdate(
    { _id: req.user._id, isDeleted: false },{ $pull: { messages: messageId } });
    if(user){

      const message = await MessageModel.findOneAndDelete({ _id:messageId})

      return message
        ? res.status(200).json({ message: "user message is deleted from  database" })
        : next(new Error("InValid-MessageId"));
    }else{
      return next(new Error("InValid-User"));
    }

        
    });

    export const UpdateMessage = asyncHandler(async (req, res, next) => {
      const {messageId}= req.params;
      const {Message}=req.body;
      console.log(messageId ,Message ,req.user._id);
      const message = await MessageModel.findById(messageId)
      await UserModel.findOneAndUpdate({ _id: req.user._id, isDeleted: false },{ $pull: { messages: messageId } });
      if(message){
      const UpdatedMessage=  await MessageModel.findOneAndUpdate({ _id: messageId },req.body );
      const UpdatedUserMessage=  await UserModel.updateOne(
          { _id: req.user._id },
          { $push: { messages: UpdatedMessage._id } }
        );

        return UpdatedUserMessage
        ? res.json({ message: "user message is updated successfully" })
        : next(new Error("Failed To-Updated"));
        

      }else{
        next(new Error("Message_Not Found"))
      }



    });
    

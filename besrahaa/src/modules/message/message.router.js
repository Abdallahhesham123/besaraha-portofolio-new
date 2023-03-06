import {Router} from 'express'
import * as MessageController from  './controller/message.js'
import { validation } from '../../middleware/validation.js';
import { messageSchema ,messageDeleteSchema ,messageUpdateSchema} from "./message.validation.js";
import { AuthUser } from '../../middleware/auth.js';
const router = Router();


router.get("/getALLMessages" ,AuthUser, MessageController.getALLMessages)
router.get("/getoneMessage/:id" ,AuthUser, MessageController.getoneMessage)//allmessages
router.get("/getMessageprivate/:id" ,MessageController.getMessageprivate)


router.post("/add-message/:receiverId" ,validation(messageSchema),  AuthUser,MessageController.sendMessage)
router.delete("/findOneAndDeleteMessage/:messageId" , validation(messageDeleteSchema), AuthUser,MessageController.findOneAndDeleteMessage)
router.put("/UpdateMessage/:messageId" ,validation(messageUpdateSchema), AuthUser,MessageController.UpdateMessage)

export default  router
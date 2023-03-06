import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import messageRouter from './modules/message/message.router.js';
import connectDB from '../DB/connection.js';
import { globalErrorHandler } from './utils/errorHandling.js';
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';



const initApp = (app, express) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.json({}))
    //for image
    app.use("/images", express.static(path.join(__dirname, "../public/images")));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "public/images/besaraha/");
        },
        filename: (req, file, cb) => {
          cb(null, req.body.name);
        },
      });

      const upload = multer({ storage: storage });
    app.get('/', (req, res) => res.send('Hello World!'))

    app.use('/auth', authRouter)
    app.use('/user', upload.single("file"),userRouter)
    app.use('/message', messageRouter)

    app.all("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })

    app.use(globalErrorHandler)
    // connection DB
    connectDB()

}


export default initApp
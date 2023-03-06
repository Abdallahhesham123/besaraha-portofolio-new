export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      return next(new Error(err));
    });
  };
};


export const globalErrorHandler = (err , req,res,next) => {


    if(err){
        if(process.env.NODE_ENV === 'development'){

            return res.status(err.cause || 500).json({message: err.message , err , stack:err.stack});
        }

        return res.status(err.cause || 500).json({message: err.message });
    }
}
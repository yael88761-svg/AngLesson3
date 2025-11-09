export const msgGet=(req, res, next) => {
   if(req.method==="get"){
       console.log(`now its get ${req.currentDay}`);
   }
   next();
}
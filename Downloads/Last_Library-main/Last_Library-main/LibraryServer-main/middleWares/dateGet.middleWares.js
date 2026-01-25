
export const methodGet = (req, res, next) => {
    if(req.method === "GET"){
        console.log(`req is GET ${req.currentDay}`);
    }
    next();
};
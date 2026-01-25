/**
 * error handling middleware
 * @param {{ status?: number, message?: string, type?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const error = (err, req, res, next) => {
    const stat = (err.status !== undefined && err.status !== null) ? err.status : 500;
    const { message = 'Server Error!' } = err;
    if (stat === 404) {
        res.status(stat).json({ error: { message: 'Page not found!', fixMe: 'http://localhost:3000/index.html' } });
    } else {
        res.status(stat).json({
            error: {
                message: message, 
                status: stat,
                fixMe: 'http://localhost:3000/index.html'
            }
        });
    }
};

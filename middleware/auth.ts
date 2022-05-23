import jwt from 'jsonwebtoken';


export default function verifyToken(req: any, res: any, next: any) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log('decoded');
        console.log(decoded);

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(403);
    }
}
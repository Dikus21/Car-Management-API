import jwt from "jsonwebtoken";

export default function verifyToken(...allowedRoles: string[]) {
    return (req: any, res: any, next: any) => {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Please Login First' });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden: Invalid token' });
            }else if (!allowedRoles.includes(decoded.userRole) && !allowedRoles.includes('PUBLIC')) {
                return res.status(401).json({ error: `Unauthorized Role: ${decoded.userRole} role is not allowed` });
            }
            req.userId = decoded.userId;
            req.email = decoded.userEmail;
            req.role = decoded.userRole;
            next();
        });
    };
}
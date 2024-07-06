
import jwt from 'jsonwebtoken';
import {User} from "../entities/User";

export default class RefreshToken {
    public static async refreshToken(req: any, res: any) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (refreshToken == null) {
                return res.status(401).json({error: 'Unauthorized: Please Login First'});
            }
            const user = await User.findOne({
                where: {
                    refreshToken: refreshToken
                }
            });
            if (!user) {
                return res.status(403).json({error: 'Forbidden'});
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
                if (err) {
                    return res.status(403).json({error: 'Forbidden'});
                }
                const userId = decoded.userId;
                const userName = decoded.userName;
                const userEmail = decoded.userEmail;
                const userRole = decoded.userRole;
                const accessToken = jwt.sign({userId, userName, userEmail, userRole}, 
                    process.env.ACCESS_TOKEN_SECRET!, {
                    expiresIn: '5s',
                });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 5 * 1000,
                  });
                res.json({accessToken});
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: error});
        }
    }
}
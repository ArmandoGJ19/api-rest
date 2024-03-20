import jwt from "jsonwebtoken";
import User from "../models/User.js";
// validar si el token existe
export const verifyToken =async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(403).send({message: "no se a proporcionado el token"});
        }
        // extraer el id del token
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        console.log(decoded);
        // buscar usuario por id en la base de datos
        const user = await User.findById(req.userId, {password: 0});
        console.log(user);
        // validar si el usuario existe
        if (!user) {
            return res.status(404).send({message: "Usuario no encontrado"});
        }
        // continuar con la siguiente accion
        next();
    }catch (error) {
        return res.status(401).send({message: "token no válido"});
    }
}
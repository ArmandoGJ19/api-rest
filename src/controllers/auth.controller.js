import User from "../models/User.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import Role from "../models/Role.js";

// funcion para autenticar
export const signup = async (req, res) => {
    const {username, email, password, roles} = req.body;
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    // condicional para asignar roles, en caso de que no se envien roles, se le asigna el rol de usuario
    if (req.body.roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id]
    }
    // guardar usuario en la base de datos
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = createToken(savedUser)
    res.json({token})
}
// funcion para crear token
function createToken(user) {
    return jwt.sign({id: user._id}, process.env.SECRET, {
        expiresIn: 86400
    })
}
// funcion para obtener usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.json(users)
    }catch (error) {
        res.json({message: error})
    }
}
// funcion para iniciar sesion
export const signin = async (req, res) => {
   // buscar usuario por correo
   const userFound = await User.findOne(
       {email: req.body.email}).populate("roles");
   // condicional para verificar si el usuario existe
   if (!userFound) return res.status(401).json({
       message: "Usuario no encontrado"
   })
    const matchPassword = await User.comparePassword(
        req.body.password, userFound.password
    )
    if (!matchPassword) return res.status(401).json({token: null,
        message: "Contraseña incorrecta"
    })
    const token = jwt.sign({id: userFound._id}, process.env.SECRET, {
        expiresIn: 86400
    })
    // mostrar usuario encontrado
    // console.log(userFound);
   // Json de prueba en caso de que se encuentre el usuario
   res.json({token})
}
export const signout = (req, res) => {
try {
    res.json({message: "Sesión cerrada", token:token})
}catch (error) {
    res.json({message: error})
}
}

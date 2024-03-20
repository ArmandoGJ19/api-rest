import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
},
    {
        timestamps: true,
        versionKey: false
    })

userSchema.statics.encryptPassword = async (password) => {
    // generar un salt para encriptar la contraseña
    const salt = await bcrypt.genSalt(10)
    // retornar la contraseña encriptada
    return await bcrypt.hash(password, salt)
}
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    // comparar la contraseña encriptada con la recibida
    return await bcrypt.compare(password, receivedPassword)
}
export default model('User', userSchema)
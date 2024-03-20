// importar modelo de datos Role
import Role from "../models/Role.js";
// exportar la función para crear roles
export const createRoles = async () => {
    try {
        // verificamos si ya existen los roles
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        const values = await Promise.all([
            // crear roles por defecto envolviendo en una promesa
            new Role({ name: "user" }).save(),
            new Role({ name: "moderator" }).save(),
            new Role({ name: "admin" }).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.log(error);
    }
}
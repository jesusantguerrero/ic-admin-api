'use strict'
const User = use('App/Models/User')

class AuthController {
    async login ({ auth, request, response }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password);
    
        return response.json(token);
    }

    async registration ({ auth, request, response }) {
        const credentials = request.all();
        try {
            const user = await User.create(credentials) 

        } catch (e) {
            console.log(e);
            return response.status(400).json({
                status: {
                    message: e.sqlMessage
                }
            });
        }

        return "saved";
    }
}

module.exports = AuthController

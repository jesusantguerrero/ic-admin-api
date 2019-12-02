'use strict'
const User = use('App/Models/User')

class AuthController {
    async login ({ auth, request, response }) {
        const { email, password } = request.all();
        const token = await auth.attempt(email, password)
        return response.json(token);
    }

    async registration ({auth, request, response }) {
        const credentials = request.all();
        try {
            await User.create(credentials) 
        } catch (e) {
            return response.status(401).json({
                status: {
                    message: "Bad auth credentials"
                }
            });
        }

        const token = await auth.attempt(credentials.email, credentials.password);
        return response.json(token);
    }

    async currentUser ({auth}) {
        try {
            return await auth.getUser()
          } catch (error) {
            response.send('Missing or invalid jwt token')
        }
    }
}

module.exports = AuthController

const User = use('App/Models/User')

module.exports.getUser = () => {
    return User.findBy("email", "jesusant.guerrero@gmail.com")
}
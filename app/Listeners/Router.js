'use strict'

const Router = exports = module.exports = {}

Router.createIps = async (router) => {
    for (let i = 1; i < router.registros_posibles; i++) {
        await router.ips().create({
            id_company: router.id_company,
            codigo_final: i,
            estado: 1
        });                
    }
}

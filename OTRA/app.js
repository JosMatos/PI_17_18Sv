'use strict'

main(3000)

/**
 * The application's entry point.
 * @param {string} port - The port where the server will accept requests
 * app is being launched in debug mode
 */
function main(port) {

    const model = require('./Datatypes/OTRAObj')
    const app =   require('./routes/routes')
    const repoCinema =  require('./repo/cinema_repo').createRepository()
    const repoFilmes = require('./repo/filmes_repo').createRepository() 
    const repoReserva= require ('./repo/reserva_repo').createRepository()
    const repoSessao= require ('./repo/sessao_repo').createRepository()
    const server = app(repoCinema, repoFilmes,repoSessao,repoReserva, __dirname)
    server.listen(Number(port), () => console.log(`Server is listening on  http://localhost:${port}/OTRA/`))
}
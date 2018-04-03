'use strict'

/**
 * Entry point that starts the server at a given port.
 * 
 * @module server.app
 */

main(process.argv[2])

/**
 * The application's entry point.
 * @param {string?} port - Optionaly, the port where the server will accept requests
 */
function main(port) {

    const model = require('./src/datatypes/cinema')
    const app_cinema = require('./src/routes/routes_cinema')
    const repo_cinema = require('./src/repositories/cinema_repo')
        
    /*
    const app_filme = require('./src/routes/routes_filme')
    const repo_filme = require('./src/repositories/filme_repro')
    
    const app_sala = require('./src/routes/routes_sala')
    const repo_sala = require('./src/repositories/sala_repro')

    const app_sessao = require('./src/routes/routes_sessao')
    const repo_sessao = require('./src/repositories/sessao_repro')
    */
    
    const server = app_cinema(repo_cinema);

    server.listen(Number(port))
    console.log(`Server is listening on port ${port}`)
}

//METODOS REST 
const Pool = require ('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PizzaREST',
    password: 'pgadmin',
    port: 5432    
})

const getPizza = (request, response) => {
    pool.query('SELECT * FROM pizza ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPizzaById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM pizza WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const crearPizza = (request, response) => {
    const { id, name, origin } = request.body
    pool.query('INSERT INTO pizza (id, name, origin) VALUES ($1, $2, $3)', [id, name, origin], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Pizza creada con ID: ${id}`)
    })
    //insert into pizza(id,name,origin) values(4,'Pizza de Salami','Ecuador');
}

const actualizarPizza = (request, response) => {
    const { id, name, origin } = request.body
    pool.query(
        //UPDATE pizza set name='Pizza de Cuy', origin='Latacunga' WHERE id= 3;
        'UPDATE pizza SET name = $2, origin = $3 WHERE id = $1', [id, name, origin],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Pizza modificada con ID: ${id}`)
        }
    )
}

const eliminarPizza = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM pizza WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Pizza eliminada con ID: ${id}`)
    })
}

module.exports = {
    getPizza,
    getPizzaById,
    crearPizza,
    actualizarPizza,
    eliminarPizza
}
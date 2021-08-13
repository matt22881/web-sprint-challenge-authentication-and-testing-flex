const db = require('../../data/dbConfig')

function findBy(filter) {
    return db('users as u')
    .select('u.id', 'u.username', 'u.password')
    .where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

function findById(id) {
    return db('users as u')
      .select('u.id', 'u.username', 'u.password')
      .where('u.id', id)
      .first();
}

module.exports = {
    findBy,
    add,
    findById
}
const db = require('../dbConfig.js');

module.exports = {
  add,
  find,
  findByDepartment,
  findById,
};

function find() {
  return db('users').select('id', 'username', 'department');
}

function findByDepartment(department) {
  return db('users').where({department});
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
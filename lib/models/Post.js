const { post } = require('../app');
const pool = require('../utils/pool');

module.exports = class posts {
  id;
  description;

  constructor(row) {
    this.id = row.id;
    this.description = row.description;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from posts;');
    return rows.map((row) => new post(row));
    // Finish from Controllers
  }
};

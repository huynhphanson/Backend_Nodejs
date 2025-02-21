import { database } from '../config/database.js';
import { QUERY } from '../query/query.js';

export async function admin (req,res) {
  let results = await database.query(QUERY.SELECT_USERS);
  res.render('admin', {users: results[0]});
}

export function adminDel (req, res) {
  const userID = req.params.id;
  database.query(QUERY.DELETE_USER, userID);
  res.json({success: true});
}
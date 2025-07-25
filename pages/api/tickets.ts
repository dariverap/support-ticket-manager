import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { Ticket } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ticket[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id } = req.query;

  let query = `
    SELECT 
      t.id,
      t.user_id,
      t.title,
      t.description,
      t.category,
      t.priority,
      t.status,
      t.created_at as date,
      p.full_name as user_name
    FROM tickets t
    LEFT JOIN profiles p ON t.user_id = p.id
  `;
  let params: any[] = [];

  if (user_id) {
    query += " WHERE t.user_id = $1";
    params.push(user_id);
  }

  query += " ORDER BY t.created_at DESC";

  try {
    const { rows } = await pool.query(query, params);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
}
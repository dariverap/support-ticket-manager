import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { Ticket } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ticket | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, title, description, category, priority } = req.body;

  if (!user_id || !title || !description || !category || !priority) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Aseguramos que el status sea válido según la restricción CHECK
  const status = req.body.status || 'abierto'; // Valor por defecto permitido

  if (!['abierto', 'en_proceso', 'resuelto'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const { rows } = await pool.query(`
      INSERT INTO tickets (user_id, title, description, category, priority, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [user_id, title, description, category, priority, status]);
    
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
}

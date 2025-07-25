import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { TicketComment } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TicketComment[] | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ticketId } = req.query;

  if (!ticketId || typeof ticketId !== 'string') {
    return res.status(400).json({ error: 'Ticket ID is required' });
  }

  try {
    const { rows } = await pool.query(`
      SELECT 
        tc.id,
        tc.ticket_id,
        tc.user_id,
        tc.comment,
        tc.created_at,
        p.full_name as user_name
      FROM ticket_comments tc
      LEFT JOIN profiles p ON tc.user_id = p.id
      WHERE tc.ticket_id = $1
      ORDER BY tc.created_at ASC
    `, [ticketId]);
    
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ticketId } = req.query;

  if (req.method === "GET") {
    try {
      const query = `
        SELECT 
          t.id,
          t.title,
          t.description,
          t.category,
          t.priority,
          t.status,
          t.created_at as date,
          p.full_name as assigned_to
        FROM tickets t
        LEFT JOIN profiles p ON t.user_id = p.id
        WHERE t.id = $1
      `;
      
      const result = await pool.query(query, [ticketId]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Ticket no encontrado" });
      }

      const ticket = result.rows[0];
      
      // Obtener comentarios del ticket
      const commentsQuery = `
        SELECT 
          tc.id,
          tc.comment as content,
          tc.created_at as date,
          p.full_name as author,
          'comment' as type
        FROM ticket_comments tc
        JOIN profiles p ON tc.user_id = p.id
        WHERE tc.ticket_id = $1
        ORDER BY tc.created_at ASC
      `;
      
      const commentsResult = await pool.query(commentsQuery, [ticketId]);
      
      // Agregar comentario del sistema por creación
      const systemComment = {
        id: 0,
        author: "Sistema",
        content: "Ticket creado automáticamente",
        date: ticket.date,
        type: "system"
      };
      
      const comments = [systemComment, ...commentsResult.rows];
      
      res.status(200).json({
        ...ticket,
        comments
      });
    } catch (error) {
      console.error("Error al obtener ticket:", error);
      res.status(500).json({ error: "Error al obtener el ticket" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export interface Ticket {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  role: string;
  created_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  user_id: string;
  comment: string;
  created_at: string;
}

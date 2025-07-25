import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

type UserData = {
  id: string;
  email: string;
  full_name: string;
  role: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Registration attempt - Request body:', req.body);

  const { full_name, email, password, role = 'user' } = req.body;
  if (!full_name || !email || !password) {
    console.log('Registration failed - Missing fields:', { 
      full_name: !!full_name, 
      email: !!email, 
      password: !!password 
    });
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  console.log('Registration attempt for:', { email, full_name, role });

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); // Iniciar transacción
    console.log('Transaction started');

    // Verificar si el email ya existe en profiles
    const existingUser = await client.query<{id: string}>(
      'SELECT id FROM profiles WHERE email = $1',
      [email]
    );

    console.log('Email check result:', { 
      email, 
      exists: existingUser.rows.length > 0,
      existingCount: existingUser.rows.length 
    });

    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK');
      console.log('Registration failed - Email already exists:', email);
      return res.status(409).json({ error: 'El correo electrónico ya está registrado' });
    }

    const id = uuidv4();
    const hash = await bcrypt.hash(password, 10);

    console.log('Generated data:', { 
      id, 
      hashLength: hash.length,
      hashPrefix: hash.substring(0, 20)
    });

    // 1. Insertar en la tabla users primero
    console.log('Inserting into users table...');
    await client.query(
      'INSERT INTO users (id) VALUES ($1)',
      [id]
    );
    console.log('Successfully inserted into users table');

    // 2. Insertar en la tabla profiles
    console.log('Inserting into profiles table...');
    const { rows } = await client.query<UserData>(
      `INSERT INTO profiles (
        id, full_name, email, password_hash, role, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING id, full_name, email, role`,
      [id, full_name, email, hash, role]
    );
    console.log('Successfully inserted into profiles table:', rows[0]);

    await client.query('COMMIT');
    console.log('Transaction committed successfully');
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Registration error:', error);
    
    // Proporcionar más detalles del error para debugging
    if (error instanceof Error) {
      console.error('Registration error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Verificar si es un error específico de PostgreSQL
      if ('code' in error) {
        console.error('PostgreSQL error code:', (error as any).code);
        console.error('PostgreSQL error detail:', (error as any).detail);
      }
    }
    
    res.status(500).json({ error: 'Error al registrar el usuario' });
  } finally {
    client.release();
    console.log('Database connection released');
  }
}

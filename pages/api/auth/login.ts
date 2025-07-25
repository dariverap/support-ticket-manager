import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/lib/db';
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

  console.log('Login attempt - Request body:', req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Login failed - Missing credentials:', { email: !!email, password: !!password });
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  console.log('Login attempt for email:', email);

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Buscar el usuario en la tabla profiles
    const { rows } = await client.query<UserData & { password_hash: string }>(
      'SELECT id, full_name, email, role, password_hash FROM profiles WHERE email = $1',
      [email]
    );

    console.log('Database query result:', { found: rows.length > 0, email });

    if (rows.length === 0) {
      console.log('Login failed - User not found for email:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = rows[0];
    
    // Logging detallado para debugging
    console.log('Password comparison details:', {
      email,
      providedPassword: password,
      storedHashLength: user.password_hash.length,
      storedHashPrefix: user.password_hash.substring(0, 20),
      bcryptVersion: require('bcrypt/package.json').version
    });
    
    // Generar un hash de prueba para verificar que bcrypt funcione
    const testHash = await bcrypt.hash(password, 10);
    console.log('Test hash generated for same password:', testHash.substring(0, 20));
    
    // Verificar la contraseña
    const valid = await bcrypt.compare(password, user.password_hash);
    
    console.log('Password validation result:', { valid, email });
    
    // Prueba adicional: verificar si el hash de prueba funciona consigo mismo
    const testValid = await bcrypt.compare(password, testHash);
    console.log('Test hash validation (should be true):', testValid);
    
    if (!valid) {
      console.log('Login failed - Invalid password for email:', email);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    await client.query('COMMIT');
    
    console.log('Login successful for email:', email);
    
    // Devolver los datos del usuario (sin el password_hash)
    res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Login error:', error);
    
    // Proporcionar más detalles del error para debugging
    if (error instanceof Error) {
      console.error('Login error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    
    res.status(500).json({ error: 'Error al iniciar sesión' });
  } finally {
    client.release();
  }
}

-- 1. Agrega columnas nuevas (permitiendo NULL temporalmente)
ALTER TABLE profiles
ADD COLUMN email text UNIQUE,
ADD COLUMN password_hash text;

-- 2. Si tienes usuarios existentes, actualízalos manualmente después
-- Ejemplo:
-- UPDATE profiles SET email = 'admin@demo.com', password_hash = '$2b$10$hashdemoejemplo' WHERE id = '<ID_DEL_USUARIO>';

-- 3. Cuando todos los perfiles tengan email y password_hash, hazlos obligatorios
-- ALTER TABLE profiles
-- ALTER COLUMN email SET NOT NULL,
-- ALTER COLUMN password_hash SET NOT NULL;

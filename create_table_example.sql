-- Exemplo de criação de tabela no Supabase

-- Exemplo 1: Tabela simples de tarefas (todos)
CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exemplo 2: Tabela de perfis de usuários com referência à tabela de autenticação
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  website TEXT,
  
  -- Restrição para garantir que o nome de usuário tenha pelo menos 3 caracteres
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Configuração de Segurança a Nível de Linha (RLS) para a tabela profiles
ALTER TABLE profiles
  ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para a tabela profiles
CREATE POLICY "Perfis públicos podem ser visualizados por todos." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem inserir seu próprio perfil." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Exemplo 3: Tabela de produtos com relacionamentos
CREATE TABLE categories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  category_id BIGINT REFERENCES categories(id),
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exemplo 4: Criação de uma view
CREATE VIEW available_products AS
  SELECT p.id, p.name, p.description, p.price, c.name as category
  FROM products p
  JOIN categories c ON p.category_id = c.id
  WHERE p.in_stock = TRUE;

-- Exemplo 5: Criação de uma materialized view
CREATE MATERIALIZED VIEW product_stats AS
  SELECT 
    category_id,
    COUNT(*) as product_count,
    AVG(price) as average_price,
    MIN(price) as min_price,
    MAX(price) as max_price
  FROM products
  GROUP BY category_id;

-- Comando para atualizar uma materialized view
-- REFRESH MATERIALIZED VIEW product_stats;

-- Criar extensão UUID se não existir
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de sessões de chat
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    is_bot BOOLEAN DEFAULT FALSE,
    is_from_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_chat_sessions_client_id ON chat_sessions(client_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_status ON chat_sessions(status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_activity ON chat_sessions(last_activity);
CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_client_id ON messages(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas
DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
    BEFORE UPDATE ON clients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chat_sessions_updated_at ON chat_sessions;
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Políticas RLS (permitir tudo para usuários autenticados e anônimos)
CREATE POLICY "Allow all operations for authenticated users" ON clients
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON chat_sessions
    FOR ALL USING (true);

CREATE POLICY "Allow all operations for authenticated users" ON messages
    FOR ALL USING (true);

-- Inserir dados de exemplo para teste
INSERT INTO clients (first_name, last_name, email, phone) VALUES
('João', 'Silva', 'joao.silva@email.com', '(11) 99999-9999'),
('Maria', 'Santos', 'maria.santos@email.com', '(11) 88888-8888'),
('Pedro', 'Oliveira', 'pedro.oliveira@email.com', '(11) 77777-7777')
ON CONFLICT (email) DO NOTHING;

-- Inserir sessões de exemplo
DO $$
DECLARE
    client_joao UUID;
    client_maria UUID;
    session_joao UUID;
    session_maria UUID;
BEGIN
    -- Buscar IDs dos clientes
    SELECT id INTO client_joao FROM clients WHERE email = 'joao.silva@email.com';
    SELECT id INTO client_maria FROM clients WHERE email = 'maria.santos@email.com';
    
    -- Inserir sessões
    INSERT INTO chat_sessions (client_id, session_id, status) VALUES
    (client_joao, 'session-joao-' || extract(epoch from now()), 'active'),
    (client_maria, 'session-maria-' || extract(epoch from now()), 'active')
    ON CONFLICT (session_id) DO NOTHING
    RETURNING id INTO session_joao;
    
    -- Buscar ID da sessão do João
    SELECT id INTO session_joao FROM chat_sessions WHERE client_id = client_joao LIMIT 1;
    SELECT id INTO session_maria FROM chat_sessions WHERE client_id = client_maria LIMIT 1;
    
    -- Inserir mensagens de exemplo
    INSERT INTO messages (session_id, client_id, message_text, is_bot, is_from_admin) VALUES
    (session_joao, client_joao, 'Olá! Preciso de ajuda com um projeto de site.', false, false),
    (session_joao, client_joao, 'Olá João! Como posso ajudá-lo hoje?', true, false),
    (session_joao, client_joao, 'Gostaria de saber mais sobre desenvolvimento web.', false, false),
    (session_maria, client_maria, 'Oi! Vocês fazem aplicativos mobile?', false, false),
    (session_maria, client_maria, 'Olá Maria! Sim, desenvolvemos apps para iOS e Android.', true, false);
END $$;

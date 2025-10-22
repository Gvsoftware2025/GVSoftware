-- Criar tabela de estatísticas do site
CREATE TABLE IF NOT EXISTS site_stats (
  id SERIAL PRIMARY KEY,
  projects_completed INTEGER DEFAULT 50,
  satisfied_clients INTEGER DEFAULT 40,
  years_experience INTEGER DEFAULT 5,
  team_members INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados iniciais
INSERT INTO site_stats (projects_completed, satisfied_clients, years_experience, team_members)
VALUES (50, 40, 5, 10)
ON CONFLICT (id) DO NOTHING;

-- Comentários nas colunas
COMMENT ON TABLE site_stats IS 'Estatísticas gerais do site exibidas na home';
COMMENT ON COLUMN site_stats.projects_completed IS 'Número de projetos finalizados';
COMMENT ON COLUMN site_stats.satisfied_clients IS 'Número de clientes satisfeitos';
COMMENT ON COLUMN site_stats.years_experience IS 'Anos de experiência da empresa';
COMMENT ON COLUMN site_stats.team_members IS 'Número de membros da equipe';

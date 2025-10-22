-- Criar tabela de projetos em destaque
CREATE TABLE IF NOT EXISTS featured_projects_config (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_featured_projects_project_id ON featured_projects_config(project_id);
CREATE INDEX IF NOT EXISTS idx_featured_projects_display_order ON featured_projects_config(display_order);
CREATE INDEX IF NOT EXISTS idx_featured_projects_is_active ON featured_projects_config(is_active);

-- Criar constraint para garantir apenas um registro por projeto
CREATE UNIQUE INDEX IF NOT EXISTS idx_featured_projects_unique_project 
ON featured_projects_config(project_id) WHERE is_active = true;

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_featured_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_featured_projects_updated_at
  BEFORE UPDATE ON featured_projects_config
  FOR EACH ROW
  EXECUTE FUNCTION update_featured_projects_updated_at();

-- Desabilitar RLS (Row Level Security) para permitir acesso público
ALTER TABLE featured_projects_config DISABLE ROW LEVEL SECURITY;

-- Comentários na tabela
COMMENT ON TABLE featured_projects_config IS 'Tabela para gerenciar projetos em destaque na homepage';
COMMENT ON COLUMN featured_projects_config.project_id IS 'ID do projeto em destaque';
COMMENT ON COLUMN featured_projects_config.display_order IS 'Ordem de exibição (1, 2, 3)';
COMMENT ON COLUMN featured_projects_config.is_active IS 'Se o projeto está ativo nos destaques';

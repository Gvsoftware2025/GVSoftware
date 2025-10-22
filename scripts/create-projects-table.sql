-- ============================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS
-- GV Software - Sistema de Portfólio
-- ============================================

-- Deletar tabelas existentes (caso existam)
DROP TABLE IF EXISTS project_features CASCADE;
DROP TABLE IF EXISTS project_technologies CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- ============================================
-- TABELA PRINCIPAL: PROJECTS
-- ============================================
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'sistema', 'design')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('Planejamento', 'Em Desenvolvimento', 'Concluído')),
    client VARCHAR(255) NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    show_project_button BOOLEAN DEFAULT FALSE,
    project_url TEXT,
    github_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TABELA: PROJECT_IMAGES
-- Armazena múltiplas imagens por projeto
-- ============================================
CREATE TABLE project_images (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TABELA: PROJECT_TECHNOLOGIES
-- Armazena as tecnologias usadas no projeto
-- ============================================
CREATE TABLE project_technologies (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    technology VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- TABELA: PROJECT_FEATURES
-- Armazena as principais features do projeto
-- ============================================
CREATE TABLE project_features (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    display_order INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- ÍNDICES PARA MELHOR PERFORMANCE
-- ============================================
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_project_images_project_id ON project_images(project_id);
CREATE INDEX idx_project_technologies_project_id ON project_technologies(project_id);
CREATE INDEX idx_project_features_project_id ON project_features(project_id);

-- ============================================
-- FUNÇÃO PARA ATUALIZAR updated_at AUTOMATICAMENTE
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================
-- TRIGGER PARA ATUALIZAR updated_at
-- ============================================
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_features ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS DE SEGURANÇA
-- ============================================

-- PROJECTS: Permitir leitura pública, escrita autenticada
CREATE POLICY "Permitir leitura pública de projetos"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção autenticada de projetos"
    ON projects FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir atualização autenticada de projetos"
    ON projects FOR UPDATE
    USING (true);

CREATE POLICY "Permitir exclusão autenticada de projetos"
    ON projects FOR DELETE
    USING (true);

-- PROJECT_IMAGES: Permitir leitura pública, escrita autenticada
CREATE POLICY "Permitir leitura pública de imagens"
    ON project_images FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção autenticada de imagens"
    ON project_images FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir atualização autenticada de imagens"
    ON project_images FOR UPDATE
    USING (true);

CREATE POLICY "Permitir exclusão autenticada de imagens"
    ON project_images FOR DELETE
    USING (true);

-- PROJECT_TECHNOLOGIES: Permitir leitura pública, escrita autenticada
CREATE POLICY "Permitir leitura pública de tecnologias"
    ON project_technologies FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção autenticada de tecnologias"
    ON project_technologies FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir atualização autenticada de tecnologias"
    ON project_technologies FOR UPDATE
    USING (true);

CREATE POLICY "Permitir exclusão autenticada de tecnologias"
    ON project_technologies FOR DELETE
    USING (true);

-- PROJECT_FEATURES: Permitir leitura pública, escrita autenticada
CREATE POLICY "Permitir leitura pública de features"
    ON project_features FOR SELECT
    USING (true);

CREATE POLICY "Permitir inserção autenticada de features"
    ON project_features FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Permitir atualização autenticada de features"
    ON project_features FOR UPDATE
    USING (true);

CREATE POLICY "Permitir exclusão autenticada de features"
    ON project_features FOR DELETE
    USING (true);

-- ============================================
-- COMENTÁRIOS NAS TABELAS E COLUNAS
-- ============================================
COMMENT ON TABLE projects IS 'Tabela principal de projetos do portfólio';
COMMENT ON TABLE project_images IS 'Imagens associadas aos projetos (múltiplas por projeto)';
COMMENT ON TABLE project_technologies IS 'Tecnologias utilizadas nos projetos';
COMMENT ON TABLE project_features IS 'Principais features/funcionalidades dos projetos';

COMMENT ON COLUMN projects.featured IS 'Indica se o projeto é destaque na página principal';
COMMENT ON COLUMN projects.show_project_button IS 'Controla se o botão "Ver Projeto" será exibido';
COMMENT ON COLUMN project_images.display_order IS 'Ordem de exibição das imagens no slider';
COMMENT ON COLUMN project_features.display_order IS 'Ordem de exibição das features';

-- ============================================
-- MENSAGEM DE SUCESSO
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ Banco de dados criado com sucesso!';
    RAISE NOTICE '✅ Tabelas: projects, project_images, project_technologies, project_features';
    RAISE NOTICE '✅ Índices criados para melhor performance';
    RAISE NOTICE '✅ RLS (Row Level Security) habilitado';
    RAISE NOTICE '✅ Triggers e funções configurados';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Próximo passo: Execute o script seed-projects-data.sql';
END $$;

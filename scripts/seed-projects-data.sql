-- ============================================
-- SCRIPT DE DADOS INICIAIS (SEED)
-- GV Software - Sistema de Portfólio
-- ============================================

-- Limpar dados existentes (se houver)
TRUNCATE TABLE project_features, project_technologies, project_images, projects RESTART IDENTITY CASCADE;

-- ============================================
-- PROJETO 1: Sistema de Gestão Empresarial
-- ============================================
INSERT INTO projects (title, description, long_description, category, status, client, featured, show_project_button, project_url)
VALUES (
    'Sistema de Gestão Empresarial',
    'Plataforma completa para gerenciamento de empresas com módulos de vendas, estoque e financeiro.',
    'Sistema robusto desenvolvido para otimizar processos empresariais. Inclui dashboard analytics em tempo real, gestão de estoque automatizada, controle financeiro integrado e relatórios personalizáveis. Interface moderna e responsiva para acesso em qualquer dispositivo.',
    'sistema',
    'Concluído',
    'TechCorp Solutions',
    true,
    false,
    NULL
) RETURNING id;

-- Inserir imagens do Projeto 1 (usando o ID retornado)
INSERT INTO project_images (project_id, image_url, display_order)
VALUES 
    (1, '/em-desenvolvimento.png', 1),
    (1, '/placeholder.svg?height=400&width=600', 2),
    (1, '/placeholder.svg?height=400&width=600', 3);

-- Inserir tecnologias do Projeto 1
INSERT INTO project_technologies (project_id, technology)
VALUES 
    (1, 'React'),
    (1, 'TypeScript'),
    (1, 'Node.js'),
    (1, 'PostgreSQL'),
    (1, 'Prisma ORM'),
    (1, 'Tailwind CSS');

-- Inserir features do Projeto 1
INSERT INTO project_features (project_id, feature, display_order)
VALUES 
    (1, 'Dashboard analytics em tempo real', 1),
    (1, 'Gestão de estoque automatizada', 2),
    (1, 'Controle financeiro integrado', 3),
    (1, 'Relatórios personalizáveis', 4),
    (1, 'Sistema de notificações', 5);

-- ============================================
-- PROJETO 2: E-commerce Fashion
-- ============================================
INSERT INTO projects (title, description, long_description, category, status, client, featured, show_project_button, project_url, github_url)
VALUES (
    'E-commerce Fashion',
    'Loja virtual moderna para venda de roupas e acessórios com pagamento integrado.',
    'Plataforma de e-commerce completa com catálogo de produtos, carrinho de compras, checkout seguro, integração com gateways de pagamento, sistema de avaliações e área do cliente. Design responsivo e otimizado para conversão.',
    'web',
    'Concluído',
    'Fashion Store Brasil',
    true,
    true,
    'https://example.com/fashion-store',
    'https://github.com/gvsoftware/fashion-store'
);

-- Inserir imagens do Projeto 2
INSERT INTO project_images (project_id, image_url, display_order)
VALUES 
    (2, '/placeholder.svg?height=400&width=600', 1),
    (2, '/placeholder.svg?height=400&width=600', 2),
    (2, '/placeholder.svg?height=400&width=600', 3),
    (2, '/placeholder.svg?height=400&width=600', 4);

-- Inserir tecnologias do Projeto 2
INSERT INTO project_technologies (project_id, technology)
VALUES 
    (2, 'Next.js 14'),
    (2, 'React'),
    (2, 'Stripe'),
    (2, 'MongoDB'),
    (2, 'Vercel'),
    (2, 'Tailwind CSS');

-- Inserir features do Projeto 2
INSERT INTO project_features (project_id, feature, display_order)
VALUES 
    (2, 'Catálogo de produtos dinâmico', 1),
    (2, 'Carrinho de compras persistente', 2),
    (2, 'Pagamento seguro com Stripe', 3),
    (2, 'Sistema de avaliações', 4),
    (2, 'Painel administrativo', 5);

-- ============================================
-- PROJETO 3: App de Delivery
-- ============================================
INSERT INTO projects (title, description, long_description, category, status, client, featured, show_project_button)
VALUES (
    'App de Delivery',
    'Aplicativo mobile para pedidos de comida com rastreamento em tempo real.',
    'Aplicativo completo de delivery com interface intuitiva, geolocalização em tempo real, pagamento integrado, sistema de avaliações e notificações push. Desenvolvido com tecnologias nativas para melhor performance.',
    'mobile',
    'Em Desenvolvimento',
    'FoodExpress',
    false,
    false
);

-- Inserir imagens do Projeto 3
INSERT INTO project_images (project_id, image_url, display_order)
VALUES 
    (3, '/placeholder.svg?height=400&width=600', 1),
    (3, '/placeholder.svg?height=400&width=600', 2),
    (3, '/placeholder.svg?height=400&width=600', 3);

-- Inserir tecnologias do Projeto 3
INSERT INTO project_technologies (project_id, technology)
VALUES 
    (3, 'React Native'),
    (3, 'Expo'),
    (3, 'Firebase'),
    (3, 'Google Maps API'),
    (3, 'Redux Toolkit');

-- Inserir features do Projeto 3
INSERT INTO project_features (project_id, feature, display_order)
VALUES 
    (3, 'Rastreamento em tempo real', 1),
    (3, 'Pagamento integrado', 2),
    (3, 'Sistema de cupons', 3),
    (3, 'Notificações push', 4),
    (3, 'Histórico de pedidos', 5);

-- ============================================
-- PROJETO 4: Landing Page Corporativa
-- ============================================
INSERT INTO projects (title, description, long_description, category, status, client, featured, show_project_button, project_url)
VALUES (
    'Landing Page Corporativa',
    'Site institucional moderno com animações e design responsivo.',
    'Landing page desenvolvida com foco em conversão, utilizando as melhores práticas de UX/UI. Inclui animações suaves, formulário de contato integrado, seções de depoimentos e portfólio. Totalmente otimizada para SEO.',
    'design',
    'Concluído',
    'InnovaTech',
    false,
    true,
    'https://example.com/innovatech'
);

-- Inserir imagens do Projeto 4
INSERT INTO project_images (project_id, image_url, display_order)
VALUES 
    (4, '/placeholder.svg?height=400&width=600', 1),
    (4, '/placeholder.svg?height=400&width=600', 2);

-- Inserir tecnologias do Projeto 4
INSERT INTO project_technologies (project_id, technology)
VALUES 
    (4, 'Next.js'),
    (4, 'Framer Motion'),
    (4, 'Tailwind CSS'),
    (4, 'Vercel Analytics');

-- Inserir features do Projeto 4
INSERT INTO project_features (project_id, feature, display_order)
VALUES 
    (4, 'Animações suaves e modernas', 1),
    (4, 'Design totalmente responsivo', 2),
    (4, 'Formulário de contato integrado', 3),
    (4, 'Otimização SEO avançada', 4);

-- ============================================
-- PROJETO 5: Dashboard Analytics
-- ============================================
INSERT INTO projects (title, description, long_description, category, status, client, featured, show_project_button)
VALUES (
    'Dashboard Analytics',
    'Painel de análise de dados com gráficos interativos e relatórios em tempo real.',
    'Dashboard completo para visualização e análise de dados empresariais. Inclui gráficos interativos, filtros avançados, exportação de relatórios, e integração com múltiplas fontes de dados. Interface moderna e intuitiva.',
    'web',
    'Em Desenvolvimento',
    'DataViz Pro',
    true,
    false
);

-- Inserir imagens do Projeto 5
INSERT INTO project_images (project_id, image_url, display_order)
VALUES 
    (5, '/placeholder.svg?height=400&width=600', 1),
    (5, '/placeholder.svg?height=400&width=600', 2),
    (5, '/placeholder.svg?height=400&width=600', 3);

-- Inserir tecnologias do Projeto 5
INSERT INTO project_technologies (project_id, technology)
VALUES 
    (5, 'React'),
    (5, 'TypeScript'),
    (5, 'Chart.js'),
    (5, 'D3.js'),
    (5, 'Express.js'),
    (5, 'MySQL');

-- Inserir features do Projeto 5
INSERT INTO project_features (project_id, feature, display_order)
VALUES 
    (5, 'Gráficos interativos em tempo real', 1),
    (5, 'Filtros e segmentações avançadas', 2),
    (5, 'Exportação de relatórios PDF/Excel', 3),
    (5, 'Integração com múltiplas APIs', 4),
    (5, 'Dashboard personalizável', 5);

-- ============================================
-- ESTATÍSTICAS E VERIFICAÇÃO
-- ============================================
DO $$
DECLARE
    project_count INTEGER;
    image_count INTEGER;
    tech_count INTEGER;
    feature_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO project_count FROM projects;
    SELECT COUNT(*) INTO image_count FROM project_images;
    SELECT COUNT(*) INTO tech_count FROM project_technologies;
    SELECT COUNT(*) INTO feature_count FROM project_features;
    
    RAISE NOTICE '';
    RAISE NOTICE '✅ Dados iniciais inseridos com sucesso!';
    RAISE NOTICE '📊 Estatísticas:';
    RAISE NOTICE '   - % projetos criados', project_count;
    RAISE NOTICE '   - % imagens adicionadas', image_count;
    RAISE NOTICE '   - % tecnologias registradas', tech_count;
    RAISE NOTICE '   - % features cadastradas', feature_count;
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Banco de dados pronto para uso!';
    RAISE NOTICE '🚀 Acesse o painel admin em: /admin/portfolio';
    RAISE NOTICE '🔐 Senha: GVSoft@2025';
END $$;

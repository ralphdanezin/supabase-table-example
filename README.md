# Exemplos de Criação de Tabelas no Supabase

Este repositório contém exemplos de como criar tabelas no Supabase usando SQL. O Supabase é uma alternativa open-source ao Firebase, que oferece um banco de dados PostgreSQL completo com APIs automáticas.

## O que é o Supabase?

O Supabase é uma plataforma de desenvolvimento que fornece:

- Banco de dados PostgreSQL completo
- APIs RESTful automáticas para suas tabelas
- Autenticação e autorização
- Armazenamento de arquivos
- Funções serverless
- Recursos em tempo real

## Como Criar Tabelas no Supabase

Existem duas maneiras principais de criar tabelas no Supabase:

### 1. Usando o Painel de Controle (Dashboard)

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para a seção "Table Editor"
4. Clique em "New Table"
5. Preencha o nome da tabela e adicione as colunas necessárias
6. Clique em "Save"

### 2. Usando SQL (Recomendado para estruturas complexas)

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá para a seção "SQL Editor"
4. Escreva ou cole seu código SQL
5. Clique em "Run" para executar

## Exemplos Incluídos

O arquivo [create_table_example.sql](./create_table_example.sql) contém exemplos de:

1. Tabela simples de tarefas (todos)
2. Tabela de perfis de usuários com referência à tabela de autenticação
3. Tabela de produtos com relacionamentos
4. Criação de uma view
5. Criação de uma materialized view

## Boas Práticas

- Use nomes de tabelas em minúsculas e com underscores (ex: `user_profiles`, não `UserProfiles`)
- Sempre defina uma chave primária para suas tabelas
- Considere adicionar timestamps (`created_at`, `updated_at`) para rastreamento
- Configure Row Level Security (RLS) para controlar o acesso aos dados
- Use restrições (constraints) para garantir a integridade dos dados

## Tipos de Dados Comuns

- `TEXT`: Para strings de texto de qualquer tamanho
- `VARCHAR(n)`: Para strings de texto com limite de tamanho
- `INTEGER` ou `BIGINT`: Para números inteiros
- `NUMERIC(p,s)`: Para números decimais precisos
- `BOOLEAN`: Para valores verdadeiro/falso
- `TIMESTAMP WITH TIME ZONE`: Para datas e horas com fuso horário
- `UUID`: Para identificadores únicos universais
- `JSONB`: Para dados JSON

## Recursos Adicionais

- [Documentação do Supabase sobre Tabelas](https://supabase.com/docs/guides/database/tables)
- [Documentação do PostgreSQL](https://www.postgresql.org/docs/)
- [Guia de SQL do Supabase](https://supabase.com/docs/guides/database/sql)

## Como Contribuir

Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias ou novos exemplos!
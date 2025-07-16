// Exemplo de como interagir com tabelas do Supabase usando a biblioteca cliente JavaScript

// 1. Importar e inicializar o cliente Supabase
import { createClient } from '@supabase/supabase-js'

// Substitua com suas credenciais reais do projeto Supabase
const supabaseUrl = 'https://seu-projeto.supabase.co'
const supabaseAnonKey = 'sua-chave-anon-publica'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 2. Exemplos de operações CRUD básicas

// CREATE - Inserir dados em uma tabela
async function addTodo(task) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ task, completed: false }])
    .select()
  
  if (error) {
    console.error('Erro ao adicionar tarefa:', error)
    return null
  }
  
  return data[0]
}

// READ - Buscar todos os registros de uma tabela
async function getAllTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Erro ao buscar tarefas:', error)
    return []
  }
  
  return data
}

// READ - Buscar um registro específico
async function getTodoById(id) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error(`Erro ao buscar tarefa com id ${id}:`, error)
    return null
  }
  
  return data
}

// UPDATE - Atualizar um registro
async function updateTodo(id, updates) {
  const { data, error } = await supabase
    .from('todos')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error(`Erro ao atualizar tarefa com id ${id}:`, error)
    return null
  }
  
  return data[0]
}

// DELETE - Remover um registro
async function deleteTodo(id) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error(`Erro ao deletar tarefa com id ${id}:`, error)
    return false
  }
  
  return true
}

// 3. Consultas mais avançadas

// Filtrar registros com condições
async function getCompletedTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('completed', true)
  
  if (error) {
    console.error('Erro ao buscar tarefas completadas:', error)
    return []
  }
  
  return data
}

// Buscar registros com relacionamentos (JOIN)
async function getProductsWithCategories() {
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      description,
      price,
      categories(id, name)
    `)
  
  if (error) {
    console.error('Erro ao buscar produtos com categorias:', error)
    return []
  }
  
  return data
}

// 4. Trabalhando com autenticação e perfis de usuário

// Registrar um novo usuário
async function signUp(email, password, username) {
  // 1. Registrar o usuário com Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (authError) {
    console.error('Erro ao registrar usuário:', authError)
    return null
  }
  
  // 2. Criar um perfil para o usuário (opcional, pode ser feito via trigger)
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        username,
        updated_at: new Date()
      })
    
    if (profileError) {
      console.error('Erro ao criar perfil:', profileError)
    }
  }
  
  return authData
}

// Buscar perfil do usuário atual
async function getCurrentUserProfile() {
  // 1. Obter o usuário atual
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    console.error('Nenhum usuário autenticado')
    return null
  }
  
  // 2. Buscar o perfil do usuário
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  if (error) {
    console.error('Erro ao buscar perfil do usuário:', error)
    return null
  }
  
  return data
}

// 5. Inscrever-se para atualizações em tempo real

function subscribeToTodos(callback) {
  return supabase
    .channel('public:todos')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'todos' }, 
      (payload) => {
        callback(payload)
      }
    )
    .subscribe()
}

// Exemplo de uso:
// const subscription = subscribeToTodos((payload) => {
//   console.log('Mudança detectada:', payload)
//   // Atualizar UI ou estado da aplicação
// })
//
// Para cancelar a inscrição:
// subscription.unsubscribe()

// Exportar funções para uso em outros arquivos
export {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
  getProductsWithCategories,
  signUp,
  getCurrentUserProfile,
  subscribeToTodos
}

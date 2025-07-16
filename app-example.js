// Exemplo de aplicação simples usando as funções do cliente Supabase

import dotenv from 'dotenv'
import {
  addTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getCompletedTodos,
  subscribeToTodos
} from './supabase-client-example.js'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config()

// Função principal para demonstrar o uso das funções
async function demoApp() {
  console.log('🚀 Iniciando demonstração do Supabase')
  console.log('----------------------------------------')

  try {
    // 1. Adicionar algumas tarefas
    console.log('\n📝 Adicionando novas tarefas...')
    const task1 = await addTodo('Aprender sobre Supabase')
    console.log('Tarefa adicionada:', task1)
    
    const task2 = await addTodo('Criar tabelas no banco de dados')
    console.log('Tarefa adicionada:', task2)
    
    const task3 = await addTodo('Implementar autenticação')
    console.log('Tarefa adicionada:', task3)

    // 2. Listar todas as tarefas
    console.log('\n📋 Listando todas as tarefas:')
    const allTodos = await getAllTodos()
    allTodos.forEach(todo => {
      console.log(`- ${todo.id}: ${todo.task} (${todo.completed ? 'Concluída' : 'Pendente'})`)
    })

    // 3. Buscar uma tarefa específica
    if (task1) {
      console.log(`\n🔍 Buscando tarefa com ID ${task1.id}...`)
      const foundTodo = await getTodoById(task1.id)
      console.log('Tarefa encontrada:', foundTodo)
    }

    // 4. Atualizar uma tarefa
    if (task2) {
      console.log(`\n✏️ Atualizando tarefa com ID ${task2.id}...`)
      const updatedTodo = await updateTodo(task2.id, { 
        completed: true,
        task: 'Criar tabelas no banco de dados (Concluído)'
      })
      console.log('Tarefa atualizada:', updatedTodo)
    }

    // 5. Listar tarefas concluídas
    console.log('\n✅ Listando tarefas concluídas:')
    const completedTodos = await getCompletedTodos()
    completedTodos.forEach(todo => {
      console.log(`- ${todo.id}: ${todo.task}`)
    })

    // 6. Excluir uma tarefa
    if (task3) {
      console.log(`\n🗑️ Excluindo tarefa com ID ${task3.id}...`)
      const deleted = await deleteTodo(task3.id)
      console.log('Tarefa excluída com sucesso:', deleted)
    }

    // 7. Listar todas as tarefas novamente para verificar as alterações
    console.log('\n📋 Listando todas as tarefas após alterações:')
    const updatedTodos = await getAllTodos()
    updatedTodos.forEach(todo => {
      console.log(`- ${todo.id}: ${todo.task} (${todo.completed ? 'Concluída' : 'Pendente'})`)
    })

    // 8. Demonstrar inscrição em tempo real (opcional)
    console.log('\n🔄 Configurando inscrição em tempo real para alterações na tabela todos...')
    console.log('Faça alterações na tabela pelo painel do Supabase para ver as atualizações em tempo real.')
    console.log('Pressione Ctrl+C para encerrar o programa.')
    
    // Inscrever-se para atualizações em tempo real
    const subscription = subscribeToTodos((payload) => {
      console.log('\n🔔 Alteração detectada na tabela todos:')
      console.log('Evento:', payload.eventType)
      console.log('Registro:', payload.new || payload.old)
    })

    // Manter o programa em execução para receber atualizações em tempo real
    // Em uma aplicação real, isso seria gerenciado pelo ciclo de vida da aplicação
    await new Promise(resolve => setTimeout(resolve, 300000)) // 5 minutos
    
    // Cancelar inscrição
    subscription.unsubscribe()

  } catch (error) {
    console.error('❌ Erro durante a demonstração:', error)
  }
}

// Executar a demonstração
demoApp().catch(error => {
  console.error('❌ Erro fatal:', error)
})

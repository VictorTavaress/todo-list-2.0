# Kanban Todo App

Este projeto é uma aplicação para cadastro, listagem e gerenciamento de tarefas, desenvolvida como desafio técnico para vaga de desenvolvedor pleno.  
O sistema é composto por um frontend em **React** (com Vite e MUI) e um backend em **Node.js 20** (Express), com persistência de dados no **Firestore**.

---

![image](https://github.com/user-attachments/assets/ea1d35da-d322-4b7a-a1c9-8a3481988a4a)



https://github.com/user-attachments/assets/21ea93ae-12c7-4de5-a3b9-44f568e49948




## Funcionalidades

- **Cadastro de tarefas**: Crie tarefas informando descrição, responsável, status e cor.
- **Listagem de tarefas**: Visualize todas as tarefas cadastradas, com todos os campos exibidos.
- **Kanban Board**: Visualização das tarefas em três colunas (A Fazer, Fazendo, Finalizado), com drag-and-drop entre colunas.
- **Edição e exclusão**: Edite ou exclua tarefas existentes.
- **Persistência**: Todas as tarefas são salvas e recuperadas do Firestore.
- **Registro do computador**: O backend salva automaticamente o nome do computador que fez o cadastro da tarefa.
- **Testes unitários**: O frontend possui testes unitários com React Testing Library e Vitest.
- **Componentização**: Uso de componentes reutilizáveis do MUI (Button, TextField, Select, Dialog, etc).

---

## Tecnologias Utilizadas

- **Frontend**: React, Vite, React Hooks, MUI (Material UI), Typescript, Vitest, React Testing Library
- **Backend**: Node.js 20, Express, Firestore, Javascript
- **Testes**: Vitest, React Testing Library

---

## Requisitos Atendidos

### Funcionais

1. **Cadastrar tarefas**: O sistema permite cadastrar tarefas via frontend e via endpoint `/insert-tasks`.
2. **Exibir todos os dados**: Todos os campos das tarefas são exibidos no frontend e retornados pelo endpoint `/get-tasks`.
3. **Editar tarefas**: Via frontend e endpoint `/update-task/:id`.
4. **Excluir tarefas**: Via frontend e endpoint `/delete-task/:id`.

### Não Funcionais

1. **Frontend com React Hooks e Vite**: ✔️
2. **MUI para componentes**: ✔️
3. **Servidor Node 20, Express, Javascript**: ✔️
4. **Endpoint `/insert-tasks`**: ✔️
5. **Endpoint `/get-tasks`**: ✔️
6. **Endpoint `/update-task/:id`**: ✔️
7. **Endpoint `/delete-task/:id`**: ✔️
8. **Salva nome do computador no Firestore**: ✔️
9. **Testes unitários com Testing Library**: ✔️
10. **README com passo a passo**: ✔️

---

## Como rodar o projeto

### 1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/kanban-todo.git
cd kanban-todo
```

### 2. **Configuração do Backend**

#### a) Instale as dependências

```bash
cd backend
npm install
```

#### b) Configure o Firestore

- Crie um projeto no [Firebase](https://console.firebase.google.com/).
- Habilite o Firestore.
- Baixe o arquivo de credenciais (service account) e salve como `firebase-credentials.json` na pasta `backend`.
- **Atenção:** Não suba esse arquivo para o git (já está no `.gitignore`).

#### c) Inicie o servidor

```bash
npm start
```
O backend estará disponível em `http://localhost:8085`.

---

### 3. **Configuração do Frontend**

#### a) Instale as dependências

```bash
cd ../frontend
npm install
```

#### b) Inicie o frontend

```bash
npm run dev
```
O frontend estará disponível em `http://localhost:5173` (ou porta informada pelo Vite).

---

### 4. **Rodando os testes**

No diretório do frontend:

```bash
npm run test
```

Os testes cobrem os principais componentes e funcionalidades do sistema.

---

## Estrutura do Projeto

```
kanban-todo/
│
├── backend/
│   ├── index.js
│   ├── firebase-credentials.json
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── KanbanColumn.tsx
│   │   │   ├── KanbanCard.tsx
│   │   │   └── TaskDialog.tsx
│   │   ├── service/
│   │   │   └── taskService.ts
│   │   ├── __testes__/
│   │   │   └── *.test.tsx
│   │   └── App.tsx
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## Endpoints da API

### **POST `/insert-tasks`**
Cadastra uma ou mais tarefas. O backend adiciona automaticamente o campo `computer` com o nome do computador que fez o cadastro.

**Exemplo:**
```bash
curl -X POST -H "Content-Type: application/json" -d '[{"description":"Criar Login","responsable":"bruno","status":"done"}]' http://localhost:8085/insert-tasks
```

---

### **GET `/get-tasks`**
Retorna todas as tarefas cadastradas.

**Exemplo:**
```bash
curl http://localhost:8085/get-tasks
```

---

### **PUT `/update-task/:id`**
Atualiza uma tarefa existente pelo seu `id`.  
No corpo da requisição, envie os campos a serem atualizados: `description`, `responsable`, `status`, `color`.

**Exemplo:**
```bash
curl -X PUT -H "Content-Type: application/json" \
  -d '{"description":"Atualizado","responsable":"bruno","status":"done","color":"#1976d2"}' \
  http://localhost:8085/update-task/ID_DA_TAREFA
```

---

### **DELETE `/delete-task/:id`**
Remove uma tarefa pelo seu `id`.

**Exemplo:**
```bash
curl -X DELETE http://localhost:8085/delete-task/ID_DA_TAREFA
```

---

## Observações

- O nome do computador é capturado automaticamente no backend e salvo junto com cada tarefa.
- O frontend é totalmente responsivo e utiliza componentes do MUI para garantir padronização visual.
- O projeto está organizado em componentes reutilizáveis, com baixo acoplamento e fácil manutenção.
- O arquivo `.gitignore` já está configurado para não subir credenciais sensíveis.

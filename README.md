# 🥐 Sistema de Gerenciamento de Pastelaria - Frontend

> Sistema web moderno para gerenciamento completo de pastelaria/lanchonete, desenvolvido com Next.js 16 e TypeScript.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Comandos Disponíveis](#-comandos-disponíveis)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Sistema de Autenticação](#-sistema-de-autenticação)
- [Integração com Backend](#-integração-com-backend)
- [Convenções e Padrões](#-convenções-e-padrões)
- [Documentação Complementar](#-documentação-complementar)

---

## 🎯 Sobre o Projeto

Sistema frontend para gerenciamento de uma **pastelaria/lanchonete**, permitindo controle completo de:

- **Pedidos** - Criação, visualização e finalização de pedidos
- **Produtos** - Catálogo com categorias, preços e imagens
- **Adicionais** - Gestão de opcionais que podem ser adicionados aos produtos
- **Categorias** - Organização do catálogo de produtos
- **Usuários** - Controle de acesso com diferentes níveis de permissão (ADMIN/STAFF)

### Perfis de Acesso

| Perfil    | Descrição     | Permissões                                              |
| --------- | ------------- | ------------------------------------------------------- |
| **ADMIN** | Administrador | Acesso total (gerenciar produtos, categorias, usuários) |
| **STAFF** | Funcionário   | Gerenciar pedidos e visualizar catálogo                 |

---

## 🚀 Tecnologias Utilizadas

### Core

- **[Next.js 16.1.6](https://nextjs.org/)** - Framework React com App Router
- **[React 19.2.3](https://reactjs.org/)** - Biblioteca para construção de interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática

### UI e Estilização

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e customizáveis
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[class-variance-authority](https://cva.style/)** - Gerenciamento de variantes de componentes
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Suporte a tema claro/escuro

### Formulários e Validação

- **[React Hook Form 7.71.1](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod 4.3.6](https://zod.dev/)** - Validação de schemas TypeScript-first
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração React Hook Form + Zod

### Requisições HTTP

- **[Axios 1.13.4](https://axios-http.com/)** - Cliente HTTP
- **[nookies 2.5.2](https://github.com/maticzav/nookies)** - Gerenciamento de cookies no Next.js

### Notificações

- **[Sonner 2.0.7](https://sonner.emilkowal.ski/)** - Toast notifications elegantes

---

## ✨ Funcionalidades

### Dashboard Administrativo

- 📊 Visão geral de pedidos em andamento
- 📋 Listagem e gerenciamento de pedidos
- 🔔 Notificações de novos pedidos

### Gestão de Produtos

- ✏️ CRUD completo de produtos
- 🖼️ Upload de imagens para produtos
- 🏷️ Organização por categorias
- 💰 Gestão de preços
- 🔘 Ativação/desativação de produtos
- ➕ Vinculação de adicionais aos produtos

### Gestão de Categorias

- 📁 Criação e edição de categorias
- 📝 Descrição detalhada para cada categoria

### Gestão de Adicionais (Opcionais)

- 🍔 Criação de itens extras (ex: queijo, bacon)
- 💵 Definição de preços individuais
- 🔗 Vinculação a produtos específicos

### Gestão de Pedidos

- 🆕 Criação de novos pedidos
- 📍 Definição de número da mesa
- 👤 Nome opcional do cliente
- 🛒 Adição de produtos com opcionais
- 📨 Envio de pedidos para cozinha
- ✅ Finalização de pedidos concluídos
- 🗑️ Remoção de pedidos em rascunho

### Sistema de Autenticação

- 🔐 Login com email e senha
- 📝 Registro de novos usuários
- 🎫 Autenticação via JWT
- 🔒 Proteção de rotas por permissão
- 👥 Gestão de usuários e permissões

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**
- **Backend da Pastelaria** rodando (consulte o repositório do backend)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd frontend
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# URL da API para chamadas do lado do cliente (navegador)
NEXT_PUBLIC_API_URL=http://localhost:3333

# URL da API para chamadas do lado do servidor
API_URL=http://localhost:3333
```

### Diferença entre as Variáveis

- **`NEXT_PUBLIC_API_URL`**: Variável PÚBLICA exposta no bundle JavaScript, usada para requisições client-side (componentes do cliente)
- **`API_URL`**: Variável PRIVADA usada apenas no servidor (Server Components, Server Actions)

### Backend

Certifique-se de que o backend está rodando em `http://localhost:3333` (ou configure a URL correta nas variáveis de ambiente).

---

## 🎮 Comandos Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento em [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
```

Cria uma versão otimizada para produção

### Iniciar Produção

```bash
npm run start
```

Inicia o servidor em modo produção (após build)

---

## 📁 Estrutura do Projeto

```
frontend/
├── public/                      # Arquivos estáticos públicos
├── src/
│   ├── @types/                  # Definições de tipos TypeScript
│   │   ├── categories.d.ts      # Tipos para categorias
│   │   ├── optionals.d.ts       # Tipos para adicionais
│   │   ├── order.d.ts           # Tipos para pedidos
│   │   ├── products.d.ts        # Tipos para produtos
│   │   └── user.d.ts            # Tipos para usuários
│   │
│   ├── actions/                 # Server Actions (Next.js)
│   │   ├── category/            # Actions de categorias
│   │   ├── optionals/           # Actions de adicionais
│   │   ├── order/               # Actions de pedidos
│   │   ├── product/             # Actions de produtos
│   │   └── user/                # Actions de usuários
│   │
│   ├── app/                     # App Router (Next.js)
│   │   ├── globals.css          # Estilos globais
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Página inicial
│   │   ├── dashboard/           # Área administrativa
│   │   │   ├── categories/      # Gestão de categorias
│   │   │   ├── optionals/       # Gestão de adicionais
│   │   │   ├── products/        # Gestão de produtos
│   │   │   └── user/            # Gestão de usuários
│   │   ├── login/               # Página de login
│   │   └── register/            # Página de registro
│   │
│   ├── components/              # Componentes React
│   │   ├── categoriesForm/      # Formulário de categorias
│   │   ├── dashboard/           # Componentes do dashboard
│   │   ├── loginforms/          # Formulários de autenticação
│   │   ├── optionalsForm/       # Formulário de adicionais
│   │   ├── productFilter/       # Filtro de produtos
│   │   ├── productOptionals/    # Vinculação de opcionais
│   │   ├── productsForms/       # Formulários de produtos
│   │   ├── productsTable/       # Tabela de produtos
│   │   ├── profileform/         # Formulário de perfil
│   │   └── ui/                  # Componentes UI base (shadcn/ui)
│   │
│   ├── lib/                     # Bibliotecas e utilitários
│   │   ├── api.ts               # Configuração do cliente Axios
│   │   ├── auth.ts              # Funções de autenticação
│   │   └── utils.ts             # Funções utilitárias
│   │
│   └── schemas/                 # Schemas de validação (Zod)
│       ├── category.schema.ts   # Schema de categorias
│       ├── login.schema.ts      # Schema de login
│       ├── optional.schema.ts   # Schema de adicionais
│       ├── product.schema.ts    # Schema de produtos
│       └── profile.schema.ts    # Schema de perfil
│
├── .env.example                 # Exemplo de variáveis de ambiente
├── .env.local                   # Variáveis de ambiente local (git ignored)
├── components.json              # Configuração shadcn/ui
├── next.config.ts               # Configuração do Next.js
├── package.json                 # Dependências do projeto
├── postcss.config.mjs           # Configuração PostCSS
├── tsconfig.json                # Configuração TypeScript
├── CONTEXTO_TECNICO.md          # Documentação técnica do backend
└── endpoints.md                 # Documentação dos endpoints da API
```

---

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Login**: Usuário insere email e senha
2. **Backend**: Valida credenciais e retorna token JWT
3. **Frontend**: Armazena token em cookie httpOnly
4. **Requisições**: Token é enviado automaticamente nas requisições

### Proteção de Rotas

As rotas protegidas verificam:

- ✅ Existência do token JWT válido
- ✅ Permissões necessárias (ADMIN/STAFF)
- ✅ Redirecionamento automático se não autenticado

### Cookies

- **@pastelaria.token**: Token JWT de autenticação
- **Configuração**: httpOnly, secure (em produção), sameSite

---

## 🔗 Integração com Backend

### Cliente HTTP (Axios)

Configurado em `src/lib/api.ts`:

```typescript
import axios from "axios";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

### Server Actions

Utilizadas para requisições do lado do servidor:

```typescript
// Exemplo: src/actions/product/listProductsAction.ts
export async function listProductsAction(category_id?: string) {
	const response = await api.get("/products", {
		params: { category_id },
	});
	return response.data;
}
```

### Endpoints da API

Consulte a documentação completa em [`endpoints.md`](./endpoints.md)

**Principais endpoints:**

- **Autenticação**: `POST /session`, `POST /users`
- **Produtos**: `GET /products`, `POST /products`, `PATCH /products/:id`
- **Categorias**: `GET /categories`, `POST /categories`
- **Pedidos**: `GET /orders`, `POST /orders`, `PATCH /orders/send/:id`
- **Adicionais**: `GET /optionals`, `POST /optionals`

---

## 📐 Convenções e Padrões

### Nomenclatura

- **Componentes**: PascalCase (`ProductForm.tsx`)
- **Arquivos**: camelCase (`listProductsAction.ts`)
- **Pastas**: camelCase (`productsForms/`)
- **Variáveis**: camelCase (`userName`, `productId`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)

### Estrutura de Componentes

```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface ProductFormProps {
  productId?: string;
}

// 3. Component
export function ProductForm({ productId }: ProductFormProps) {
  // 4. Hooks
  const [loading, setLoading] = useState(false);

  // 5. Functions
  const handleSubmit = async () => {
    // ...
  };

  // 6. Render
  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}
```

### Validação com Zod

Todos os formulários utilizam schemas Zod para validação:

```typescript
// schemas/product.schema.ts
import { z } from "zod";

export const productSchema = z.object({
	name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
	price: z.number().positive("Preço deve ser positivo"),
	// ...
});

export type ProductFormData = z.infer<typeof productSchema>;
```

### Tratamento de Erros

```typescript
try {
	await api.post("/products", data);
	toast.success("Produto criado com sucesso!");
} catch (error) {
	if (axios.isAxiosError(error)) {
		toast.error(error.response?.data?.message || "Erro ao criar produto");
	}
}
```

---

## 📚 Documentação Complementar

### Documentos no Repositório

- **[CONTEXTO_TECNICO.md](./CONTEXTO_TECNICO.md)**: Documentação técnica completa do backend
  - Arquitetura do sistema
  - Modelagem de dados
  - Regras de negócio
  - Stack tecnológica

- **[endpoints.md](./endpoints.md)**: Documentação de todos os endpoints da API
  - Exemplos de requisições e respostas
  - Códigos de status HTTP
  - Regras de autorização

### Recursos Externos

- **[Next.js Documentation](https://nextjs.org/docs)** - Documentação oficial do Next.js
- **[React Documentation](https://react.dev/)** - Documentação oficial do React
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Documentação do Tailwind
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes base utilizados
- **[React Hook Form](https://react-hook-form.com/)** - Documentação de formulários
- **[Zod](https://zod.dev/)** - Documentação de validação

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Suporte

Para dúvidas ou problemas:

1. Consulte a [documentação técnica](./CONTEXTO_TECNICO.md)
2. Verifique os [endpoints disponíveis](./endpoints.md)
3. Abra uma issue no repositório

---

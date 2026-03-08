# Documento de Contexto Técnico - Backend Pastelaria

> **Versão:** 1.1  
> **Data:** 8 de março de 2026  
> **Última Atualização:** 8 de março de 2026  
> **Autor:** Análise automatizada do código-fonte

---

## 📖 Sobre este Documento

Este é um **documento técnico completo** que descreve em detalhes a arquitetura, estrutura e funcionamento interno do sistema backend da pastelaria.

**Quando usar:**

- 🔍 Para entender a arquitetura completa do sistema
- 📐 Para consultar padrões e convenções de código
- 🧩 Para compreender regras de negócio complexas
- 🔧 Para realizar manutenções ou evoluções no código
- 📊 Para onboarding de novos desenvolvedores

**Para uso rápido da API**, consulte o [README.md](./README.md) que contém exemplos práticos e guia de instalação.

---

## 📑 Índice

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Modelagem de Dados](#4-modelagem-de-dados)
5. [Fluxos Principais do Sistema](#5-fluxos-principais-do-sistema)
6. [Regras de Negócio Importantes](#6-regras-de-negócio-importantes)
7. [Validação e Segurança](#7-validação-e-segurança)
8. [Integrações Externas](#8-integrações-externas)
9. [Convenções e Padrões de Código](#9-convenções-e-padrões-de-código)
10. [Possíveis Pontos de Evolução](#10-possíveis-pontos-de-evolução)
11. [Comandos Úteis](#11-comandos-úteis)
12. [Variáveis de Ambiente](#12-variáveis-de-ambiente)
13. [Estrutura de Resposta da API](#13-estrutura-de-resposta-da-api)
14. [Diagrama de Estados do Pedido](#14-diagrama-de-estados-do-pedido)
15. [Fluxo de Upload de Imagem](#15-fluxo-de-upload-de-imagem)
16. [Considerações Finais](#16-considerações-finais)
17. [Glossário](#17-glossário)

---

## 1. Visão Geral do Sistema

### 1.1 Objetivo do Backend

Sistema backend para gerenciamento completo de uma **pastelaria/lanchonete**, controlando pedidos, produtos, categorias, adicionais (opcionais) e usuários. O sistema permite que funcionários (STAFF) realizem pedidos e administradores (ADMIN) gerenciem todo o catálogo de produtos e configurações.

### 1.2 Tipo de Sistema

- **Arquitetura:** API REST
- **Padrão:** Monólito modular com separação clara de responsabilidades (MVC + Service Layer)
- **Comunicação:** JSON via HTTP/HTTPS
- **Autenticação:** JWT (JSON Web Token) com validade de 30 dias

### 1.3 Domínio do Negócio

O sistema cobre os seguintes domínios principais:

- **Usuários:** Cadastro, autenticação e controle de permissões (ADMIN/STAFF)
- **Categorias:** Organização de produtos em grupos (ex: Pastéis, Bebidas, Sobremesas)
- **Produtos:** Catálogo de itens vendáveis com preço, descrição e imagem
- **Adicionais (Optionals):** Itens extras que podem ser adicionados aos produtos (ex: Queijo extra, Bacon)
- **Pedidos (Orders):** Gestão completa do ciclo de vida de pedidos desde rascunho até finalização

---

## 2. Stack Tecnológica

### 2.1 Linguagem e Runtime

- **Node.js** (versão não especificada, compatível com ES2020)
- **TypeScript 5.9.3** com configuração strict habilitada

### 2.2 Framework Web

- **Express 5.2.1** - Framework web minimalista para Node.js

### 2.3 Banco de Dados e ORM

- **PostgreSQL** (via adaptador Prisma)
- **Prisma ORM 7.2.0** - ORM type-safe para TypeScript
  - Cliente gerado em: `src/generated/prisma`
  - Migrações localizadas em: `prisma/migrations/`

### 2.4 Autenticação e Segurança

- **bcryptjs 3.0.3** - Hash de senhas com salt rounds = 8
- **jsonwebtoken 9.0.3** - Geração e validação de tokens JWT
- **cors 2.8.5** - Controle de Cross-Origin Resource Sharing

### 2.5 Validação

- **Zod 4.3.5** - Schema validation library com suporte a TypeScript

### 2.6 Upload e Armazenamento de Arquivos

- **Multer 2.0.2** - Middleware para upload de arquivos (multipart/form-data)
  - Storage: Memory (buffer)
  - Limite: 5MB por arquivo
  - Tipos aceitos: JPEG, PNG, GIF
- **Cloudinary 2.9.0** - Serviço de hospedagem de imagens na nuvem

### 2.7 Desenvolvimento e Qualidade de Código

- **tsx 4.21.0** - TypeScript executor com hot reload
- **ESLint 9.39.2** - Linter com configuração TypeScript
- **Prettier 3.8.0** - Formatação automática de código
- **colors 1.4.0** - Formatação de logs coloridos no terminal

### 2.8 Outros

- **dotenv 17.2.3** - Gerenciamento de variáveis de ambiente
- **pg 8.17.1** - Driver nativo PostgreSQL para Node.js

---

## 3. Estrutura de Pastas

```
backend/
├── prisma/
│   ├── schema.prisma          # Definição do modelo de dados (Prisma Schema)
│   └── migrations/            # Histórico de migrações do banco
│
├── src/
│   ├── server.ts              # Ponto de entrada da aplicação
│   ├── routes.ts              # Agregador central de todas as rotas
│   │
│   ├── @types/                # Definições de tipos TypeScript customizados
│   │   └── express/
│   │       └── index.d.ts     # Extensão do Request do Express (user_id, role)
│   │
│   ├── config/                # Configurações de serviços externos
│   │   ├── cloudinary.ts      # Setup do Cloudinary (upload de imagens)
│   │   └── multer.ts          # Configuração do Multer (validação e limites)
│   │
│   ├── controllers/           # Camada de controle (recebe requisições HTTP)
│   │   ├── category/          # CRUD de categorias
│   │   ├── optional/          # CRUD de adicionais
│   │   ├── order/             # Gestão de pedidos
│   │   ├── product/           # CRUD e gestão de produtos
│   │   └── user/              # Autenticação e gestão de usuários
│   │
│   ├── middlewares/           # Middlewares do Express
│   │   ├── isAuthenticated.ts # Valida token JWT e extrai user_id/role
│   │   ├── isAdmin.ts         # Valida se usuário tem permissão ADMIN
│   │   └── validateSchema.ts  # Valida dados da requisição usando Zod
│   │
│   ├── schemas/               # Schemas de validação (Zod)
│   │   ├── userSchema.ts
│   │   ├── categorySchema.ts
│   │   ├── productSchema.ts
│   │   ├── optionalSchema.ts
│   │   └── orderSchema.ts
│   │
│   ├── services/              # Camada de negócio (regras e lógica)
│   │   ├── user/              # Lógica de usuários
│   │   ├── category/          # Lógica de categorias
│   │   ├── product/           # Lógica de produtos
│   │   ├── optional/          # Lógica de adicionais
│   │   └── order/             # Lógica de pedidos
│   │
│   ├── routes/                # Definição de rotas por domínio
│   │   ├── users/
│   │   ├── categories/
│   │   ├── products/
│   │   ├── optionals/
│   │   └── orders/
│   │
│   ├── prisma/                # Cliente Prisma instanciado
│   │   └── prismaclient.ts    # Singleton do PrismaClient
│   │
│   ├── generated/             # Código gerado pelo Prisma (não editar)
│   │   └── prisma/
│   │
│   └── utils/                 # Utilitários diversos
│       └── logger/
│           └── listen.ts      # Logger formatado para inicialização do servidor
│
├── package.json               # Dependências e scripts npm
├── tsconfig.json              # Configuração do TypeScript
└── prisma.config.ts           # Configuração adicional do Prisma (se existir)
```

### 3.1 Responsabilidade das Camadas

| Camada          | Responsabilidade                                                                  |
| --------------- | --------------------------------------------------------------------------------- |
| **Routes**      | Definir endpoints HTTP, aplicar middlewares, conectar controllers                 |
| **Controllers** | Receber requisições, extrair parâmetros, invocar services, retornar respostas     |
| **Services**    | Implementar regras de negócio, validações complexas, interagir com banco de dados |
| **Middlewares** | Autenticação, autorização, validação de schemas, tratamento de erros              |
| **Schemas**     | Definir estrutura e validações de dados de entrada (Zod)                          |
| **Config**      | Configuração de bibliotecas e serviços externos                                   |

---

## 4. Modelagem de Dados

### 4.1 Entidades Principais

#### **User** (Usuário)

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String   // hash bcrypt
  role      Role     @default(STAFF)  // ADMIN | STAFF
  isRoot    Boolean  @default(false)  // Primeiro usuário criado
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Regras:**

- Primeiro usuário cadastrado é automaticamente **ADMIN** e **isRoot = true**
- Usuários subsequentes são **STAFF** por padrão
- Usuário root **não pode ter seu role alterado**
- Usuário **não pode alterar o próprio role**

---

#### **Category** (Categoria)

```prisma
model Category {
  id          String    @id @default(uuid())
  name        String
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

**Regras:**

- Categoria com produtos em pedidos **não pode ser excluída**
- Deleção em cascata para produtos (se não houver pedidos)

---

#### **Product** (Produto)

````prisma
```prisma
model Product {
  id                String              @id @default(uuid())
  name              String
  description       String
  price             Int                 // em centavos (ex: 1200 = R$ 12,00)
  bannerUrl         String              // URL do Cloudinary
  disabled          Boolean             @default(false)
  category_id       String
  category          Category            @relation
  itemsOrders       ItemsOrder[]
  productsOptionals ProductsOptionals[]
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
}
````

**Regras:**

- Preço armazenado em **centavos** (Int) para evitar problemas de ponto flutuante
  - Exemplo: `1200` = R$ 12,00 | `599` = R$ 5,99
- Produtos podem ser **desabilitados** (soft delete) sem serem removidos
- Ao desabilitar produto, todos seus **opcionais são desabilitados** automaticamente
- Deleção da categoria **deleta produtos em cascata**

---

#### **Optional** (Adicional)

```prisma
model Optional {
  id                String              @id @default(uuid())
  name              String              @unique
  price             Int                 // em centavos (ex: 200 = R$ 2,00)
  productsOptionals ProductsOptionals[]
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
}
```

**Regras:**

- Nome deve ser **único** no sistema
- Preço em **centavos** (exemplo: `200` = R$ 2,00)

---

#### **ProductsOptionals** (Relação N:N entre Produto e Opcional)

```prisma
model ProductsOptionals {
  id             String          @id @default(uuid())
  disabled       Boolean         @default(false)
  product_id     String?
  product        Product?        @relation
  optional_id    String?
  optional       Optional?       @relation
  itemsOptionals ItemsOptionals[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  @@unique([product_id, optional_id])
}
```

**Regras:**

- Um produto **não pode ter o mesmo opcional duplicado** (unique constraint)
- Opcional pode ser **desabilitado** sem ser removido
- Ao desabilitar produto, todos os **ProductsOptionals** relacionados são desabilitados

---

#### **Order** (Pedido)

```prisma
model Order {
  id        String       @id @default(uuid())
  table     Int          // número da mesa
  status    Boolean      @default(false)  // false=em andamento, true=finalizado
  draft     Boolean      @default(true)   // true=rascunho, false=enviado
  name      String?      // nome do cliente - opcional
  items     ItemsOrder[]
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
}
```

**Estados do Pedido:**

1. **Rascunho** (`draft=true`, `status=false`) - Pedido sendo montado
2. **Enviado** (`draft=false`, `status=false`) - Pedido confirmado, em preparo
3. **Finalizado** (`draft=false`, `status=true`) - Pedido entregue/concluído

**Regras:**

- Não pode enviar pedido **vazio** (sem itens)
- Não pode enviar pedido já **enviado**
- Não pode finalizar pedido em **rascunho** ou já **finalizado**

---

#### **ItemsOrder** (Item do Pedido)

```prisma
model ItemsOrder {
  id             String           @id @default(uuid())
  amount         Int              // quantidade
  order_id       String
  order          Order            @relation
  product_id     String
  product        Product          @relation
  itemsOptionals ItemsOptionals[]
  createdAt      DateTime         @default(now())
  updatedAt      DateTime         @updatedAt
}
```

**Regras:**

- Ao adicionar produto ao pedido:
  - Se já existe item com **mesmo produto e mesmos opcionais**, apenas **incrementa quantidade**
  - Caso contrário, **cria novo item**
- Deleção do pedido **deleta itens em cascata**

---

#### **ItemsOptionals** (Opcionais do Item)

```prisma
model ItemsOptionals {
  id                  String            @id @default(uuid())
  items_order_id      String
  items_order         ItemsOrder        @relation
  product_optional_id String
  product_optional    ProductsOptionals @relation
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt
}
```

**Regras:**

- Armazena quais **opcionais específicos** foram escolhidos para cada item
- Deleção do item **deleta opcionais em cascata**

---

### 4.2 Relacionamentos

```
User (sem relações diretas)

Category 1---N Product
Product  N---N Optional (via ProductsOptionals)
Order    1---N ItemsOrder
ItemsOrder N---1 Product
ItemsOrder 1---N ItemsOptionals
ItemsOptionals N---1 ProductsOptionals
```

### 4.3 Cascade Deletes

| Entidade Pai      | Entidade Filha | Comportamento |
| ----------------- | -------------- | ------------- |
| Category          | Product        | **CASCADE**   |
| Product           | ItemsOrder     | **CASCADE**   |
| Order             | ItemsOrder     | **CASCADE**   |
| ItemsOrder        | ItemsOptionals | **CASCADE**   |
| ProductsOptionals | ItemsOptionals | **CASCADE**   |

---

## 5. Fluxos Principais do Sistema

### 5.1 Cadastro e Autenticação de Usuários

#### **Cadastro (POST /users)**

```
1. Usuário envia: name, email, password
2. Sistema valida dados (Zod schema)
3. Verifica se email já existe (erro se sim)
4. Faz hash da senha (bcrypt, 8 rounds)
5. Inicia transação Prisma:
   a. Conta total de usuários
   b. Se count = 0:
      - Cria usuário com role=ADMIN e isRoot=true
   c. Se count > 0:
      - Cria usuário com role=STAFF
6. Retorna dados do usuário (sem senha)
```

#### **Login (POST /session)**

```
1. Usuário envia: email, password
2. Sistema valida dados
3. Busca usuário por email (erro se não existir)
4. Compara senha com hash (bcrypt.compare)
5. Se senha correta:
   - Gera JWT com payload: {name, email, role}
   - Subject: user.id
   - Expiration: 30 dias
6. Retorna: {id, name, email, role, token}
```

#### **Detalhes do Usuário Logado (GET /me)**

```
1. Middleware isAuthenticated extrai user_id do token JWT
2. Busca usuário no banco
3. Retorna dados (sem senha)
```

#### **Alterar Role de Usuário (PATCH /users/role)** [ADMIN only]

```
1. Admin envia: email, role (ADMIN|STAFF)
2. Sistema busca usuário alvo
3. Valida:
   - Usuário existe?
   - Não é o próprio admin fazendo a alteração?
   - Não é o usuário root?
4. Atualiza role
5. Retorna usuário atualizado
```

---

### 5.2 Gestão de Categorias

#### **Criar Categoria (POST /categories)** [ADMIN only]

```
1. Admin envia: name, description (opcional)
2. Valida schema
3. Cria categoria
4. Retorna categoria criada
```

#### **Listar Categorias (GET /categories)** [Autenticado]

```
1. Busca todas as categorias
2. Retorna lista ordenada
```

#### **Remover Categoria (DELETE /categories/:category_id)** [ADMIN only]

```
1. Admin envia category_id
2. Verifica se categoria existe
3. Busca pedidos que contenham produtos desta categoria
4. Se existem pedidos:
   - ERRO: "Cannot delete category because there are orders..."
5. Senão:
   - Deleta categoria (produtos são deletados em cascade)
```

---

### 5.3 Gestão de Produtos

#### **Criar Produto (POST /products)** [ADMIN only]

```
1. Admin envia: name, price, description, category_id, file (imagem)
2. Valida schema
3. Verifica se categoria existe
4. Valida preço (não pode ser ≤ 0 ou NaN)
5. Upload da imagem para Cloudinary:
   - Pasta: products/{user_id}
   - Nome: {timestamp}_{originalname}
   - Retorna: secure_url
6. Cria produto com bannerUrl
7. Retorna produto criado
```

#### **Listar Produtos (GET /products?category_id=X&status=false)** [Autenticado]

```
1. Recebe: category_id, status (opcional, padrão=false)
2. Verifica se categoria existe
3. Busca produtos:
   - Filtra por category_id
   - Filtra por disabled=status
   - Ordena por createdAt desc
   - Inclui productsOptionals com seus optionals
4. Retorna lista de produtos
```

#### **Adicionar Opcional ao Produto (POST /products/optionals)** [ADMIN only]

```
1. Admin envia: product_id, optional_id
2. Verifica se produto e opcional existem
3. Verifica se relação já existe (erro se sim)
4. Cria ProductsOptionals
5. Retorna relação criada com optional e product incluídos
```

#### **Desabilitar Produto (PUT /products/disable)** [ADMIN only]

```
1. Admin envia: product_id
2. Verifica se produto existe
3. Executa Promise.all:
   a. Atualiza produto: disabled=true
   b. Atualiza todos ProductsOptionals: disabled=true
4. Retorna produto atualizado
```

#### **Atualizar Produto (PUT /products/:product_id)** [ADMIN only]

```
1. Admin pode enviar: name, price, description, file (todos opcionais)
2. Valida schema
3. Atualiza campos fornecidos
4. Se file fornecido, faz novo upload e atualiza bannerUrl
5. Retorna produto atualizado
```

---

### 5.4 Gestão de Pedidos (Order Flow)

#### **Criar Pedido (POST /orders)** [Autenticado]

```
1. Usuário envia: table, name (opcional)
2. Cria pedido:
   - draft=true
   - status=false
   - items=[]
3. Retorna pedido criado
```

#### **Adicionar Produto ao Pedido (POST /orders/items)** [Autenticado]

```
1. Usuário envia:
   - order_id
   - product_id
   - amount
   - product_optionals_id[] (opcional)

2. Valida se produto e pedido existem

3. Normaliza opcionais:
   - Remove duplicatas
   - Ordena IDs

4. Em TRANSAÇÃO:
   a. Busca itens existentes no pedido com mesmo product_id
   b. Para cada item, busca seus itemsOptionals
   c. Compara arrays de optional_ids ordenados
   d. Se encontrou item com MESMOS opcionais:
      - Incrementa amount do item existente
   e. Senão:
      - Cria novo ItemsOrder
      - Cria ItemsOptionals para cada opcional

5. Retorna pedido completo com:
   - items[]
     - product {id, name, price, bannerUrl}
     - itemsOptionals[]
       - optional {id, name, price}
```

**Lógica de Deduplicação:**

```typescript
// Exemplo:
// Item 1: Pizza + [Queijo, Bacon]
// Item 2: Pizza + [Bacon, Queijo]  // MESMO item, apenas ordem diferente
// Item 3: Pizza + [Queijo]         // item DIFERENTE

// Sistema identifica itens 1 e 2 como iguais e incrementa quantidade
```

#### **Enviar Pedido (PATCH /orders/:order_id/send)** [Autenticado]

```
1. Valida se pedido existe
2. Valida se pedido não está vazio (items.length > 0)
3. Valida se ainda está em draft (draft=true)
4. Atualiza: draft=false
5. Retorna pedido atualizado
```

#### **Finalizar Pedido (PATCH /orders/:order_id/finish)** [Autenticado]

```
1. Valida se pedido existe
2. Valida se pedido foi enviado (draft=false)
3. Valida se ainda não foi finalizado (status=false)
4. Atualiza: status=true
5. Retorna pedido atualizado
```

#### **Listar Pedidos (GET /orders)** [Autenticado]

```
1. Busca todos os pedidos
2. Retorna lista com dados básicos
```

#### **Detalhes do Pedido (GET /orders/details/:order_id)** [Autenticado]

```
1. Busca pedido por ID
2. Retorna estrutura completa:
   - Dados do pedido
   - items[]
     - amount
     - product {id, name, description, price, bannerUrl}
     - itemsOptionals[]
       - product_optional
         - optional {id, name, price}
```

#### **Remover Item do Pedido (DELETE /orders/remove/:item_id?order_id=X)** [Autenticado]

```
1. Remove ItemsOrder (ItemsOptionals deletados em cascade)
2. Retorna confirmação
```

#### **Remover Pedido (DELETE /orders/:order_id)** [Autenticado]

```
1. Deleta Order (ItemsOrder e ItemsOptionals deletados em cascade)
2. Retorna confirmação
```

---

## 6. Regras de Negócio Importantes

### 6.1 Usuários

| Regra                  | Descrição                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| **Primeiro é Admin**   | Primeiro usuário cadastrado é automaticamente ADMIN e isRoot=true |
| **Proteção do Root**   | Usuário root não pode ter role alterado                           |
| **Autopreservação**    | Usuário não pode alterar próprio role                             |
| **Unicidade de Email** | Email deve ser único no sistema                                   |
| **Senha Segura**       | Mínimo 6 caracteres, hash bcrypt com 8 rounds                     |

### 6.2 Categorias

| Regra                       | Descrição                                                                 |
| --------------------------- | ------------------------------------------------------------------------- |
| **Proteção de Integridade** | Não pode deletar categoria se houver pedidos com produtos dessa categoria |
| **Cascade Delete**          | Deletar categoria deleta produtos (se não houver pedidos)                 |

### 6.3 Produtos

| Regra                  | Descrição                                           |
| ---------------------- | --------------------------------------------------- |
| **Preço Positivo**     | Preço deve ser > 0 e número válido                  |
| **Imagem Obrigatória** | Produto deve ter imagem no Cloudinary               |
| **Soft Delete**        | Produtos são desabilitados, não deletados           |
| **Cascade Disable**    | Desabilitar produto desabilita todos seus opcionais |
| **Limite de Upload**   | Imagens limitadas a 5MB                             |
| **Formatos Aceitos**   | Apenas JPEG, PNG, GIF                               |

### 6.4 Opcionais

| Regra                 | Descrição                                                     |
| --------------------- | ------------------------------------------------------------- |
| **Nome Único**        | Nome do opcional deve ser único no sistema                    |
| **Preço em Centavos** | Armazenado como Int para evitar problemas de ponto flutuante  |
| **Não Duplicar**      | Não pode adicionar mesmo opcional duas vezes ao mesmo produto |

### 6.5 Pedidos

| Regra                        | Descrição                                                            | Erro                                     |
| ---------------------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| **Não Enviar Vazio**         | Pedido deve ter pelo menos 1 item                                    | "Cannot send an empty order."            |
| **Não Reenviar**             | Pedido enviado não pode ser enviado novamente                        | "Order has already been sent."           |
| **Finalizar Apenas Enviado** | Só pode finalizar pedido enviado (draft=false)                       | "Order not found or cannot be finished." |
| **Não Refinalizar**          | Pedido finalizado não pode ser finalizado novamente                  | "Order not found or cannot be finished." |
| **Deduplicação Inteligente** | Produto com mesmos opcionais incrementa quantidade, não duplica item | -                                        |

### 6.6 Segurança e Permissões

| Endpoint                       | Autenticação | Autorização                  |
| ------------------------------ | ------------ | ---------------------------- |
| POST /users                    | ❌ Não       | -                            |
| POST /session                  | ❌ Não       | -                            |
| GET /me                        | ✅ Sim       | Qualquer usuário autenticado |
| PATCH /users/role              | ✅ Sim       | **ADMIN** apenas             |
| POST /categories               | ✅ Sim       | **ADMIN** apenas             |
| GET /categories                | ✅ Sim       | Qualquer usuário autenticado |
| DELETE /categories/:id         | ✅ Sim       | **ADMIN** apenas             |
| PATCH /categories/:id          | ✅ Sim       | **ADMIN** apenas             |
| POST /products                 | ✅ Sim       | **ADMIN** apenas             |
| PUT /products/:id              | ✅ Sim       | **ADMIN** apenas             |
| GET /products                  | ✅ Sim       | Qualquer usuário autenticado |
| POST /products/optionals       | ✅ Sim       | **ADMIN** apenas             |
| PUT /products/disable          | ✅ Sim       | **ADMIN** apenas             |
| DELETE /products/optionals     | ✅ Sim       | **ADMIN** apenas             |
| POST /orders                   | ✅ Sim       | Qualquer usuário autenticado |
| POST /orders/items             | ✅ Sim       | Qualquer usuário autenticado |
| PATCH /orders/:id/send         | ✅ Sim       | Qualquer usuário autenticado |
| PATCH /orders/:id/finish       | ✅ Sim       | Qualquer usuário autenticado |
| GET /orders                    | ✅ Sim       | Qualquer usuário autenticado |
| GET /orders/details/:id        | ✅ Sim       | Qualquer usuário autenticado |
| DELETE /orders/remove/:item_id | ✅ Sim       | Qualquer usuário autenticado |
| DELETE /orders/:id             | ✅ Sim       | Qualquer usuário autenticado |

---

## 7. Validação e Segurança

### 7.1 Validação de Dados (Zod)

**Middleware de Validação:**

```typescript
validateSchema(schema: ZodType)
```

**Valida automaticamente:**

- `req.body`
- `req.params`
- `req.query`

**Em caso de erro:**

```json
{
	"message": "Validation failed",
	"details": [
		{
			"field": "body.email",
			"message": "Invalid email address"
		}
	]
}
```

### 7.2 Exemplos de Schemas

**Usuário:**

- `name`: mínimo 3 caracteres
- `email`: formato de email válido
- `password`: mínimo 6 caracteres
- `role`: enum ["ADMIN", "STAFF"]

**Produto:**

- `name`: mínimo 3 caracteres
- `price`: string numérica (regex /^\d+$/)
- `description`: mínimo 10 caracteres
- `category_id`: string UUID válida

**Pedido:**

- `table`: número ≥ 1
- `amount`: número ≥ 1
- `product_optionals_id`: array de strings UUID (opcional)

### 7.3 Autenticação JWT

**Processo de Validação (middleware isAuthenticated):**

```typescript
1. Extrai header Authorization
2. Valida formato: "Bearer <token>"
3. Verifica token usando JWT_SECRET
4. Extrai payload: {sub: user_id, role: "ADMIN"|"STAFF"}
5. Injeta no req: req.user_id e req.role
6. Continua para próximo middleware/controller
```

**Erros:**

- `401 "Token missing"` - Header Authorization não fornecido
- `401 "Invalid token"` - Token malformado, expirado ou assinatura inválida

### 7.4 Autorização (middleware isAdmin)

```typescript
1. Verifica se req.role === "ADMIN"
2. Se não: retorna 403 "Insufficient permissions"
3. Se sim: continua
```

### 7.5 Tratamento de Erros

**Middleware Global de Erros:**

```typescript
app.use((error: Error, _, res: Response, _next) => {
	if (error instanceof Error) {
		return res.status(400).json({ error: error.message });
	}
	return res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
});
```

**Erros de Negócio (throw new Error):**

- Retornam status **400 Bad Request**
- Mensagens explícitas e em inglês
- Exemplos:
  - "User already exists"
  - "Email or password incorrect"
  - "Category does not exist"
  - "Cannot delete category because there are orders..."

**Erros Não Previstos:**

- Retornam status **500 Internal Server Error**
- Não expõem detalhes internos

### 7.6 Variáveis de Ambiente (.env)

**Obrigatórias:**

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@host:port/database"

# JWT
JWT_SECRET="sua_chave_secreta_super_forte"

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="sua_api_secret"

# Servidor (opcional)
PORT=3333
```

### 7.7 Pontos de Atenção de Segurança

| Item              | Status              | Observação                                     |
| ----------------- | ------------------- | ---------------------------------------------- |
| **Senha em Hash** | ✅ Implementado     | bcrypt com 8 rounds                            |
| **JWT Secret**    | ⚠️ Atenção          | Deve ser forte e em variável de ambiente       |
| **CORS**          | ✅ Habilitado       | Configurado para aceitar qualquer origem (dev) |
| **Rate Limiting** | ❌ Não implementado | Considerar adicionar                           |
| **Helmet**        | ❌ Não implementado | Considerar adicionar headers de segurança      |
| **SQL Injection** | ✅ Protegido        | Prisma usa prepared statements                 |
| **XSS**           | ⚠️ Parcial          | Sem sanitização explícita de inputs            |
| **File Upload**   | ✅ Validado         | Tipo MIME e tamanho verificados                |
| **HTTPS**         | ❌ Não forçado      | Implementar em produção                        |

---

## 8. Integrações Externas

### 8.1 Cloudinary (Upload de Imagens)

**Configuração:**

```typescript
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

**Processo de Upload:**

```typescript
1. Multer recebe arquivo via multipart/form-data
2. Arquivo armazenado em buffer (memória)
3. Buffer convertido para stream (Readable.from)
4. Stream enviado para Cloudinary via upload_stream
5. Configuração:
   - folder: "products/{user_id}"
   - resource_type: "image"
   - public_id: "{timestamp}_{originalname}"
6. Cloudinary retorna: secure_url (HTTPS)
7. URL armazenada no campo bannerUrl do produto
```

**Vantagens:**

- Armazenamento externo (não sobrecarrega servidor)
- CDN global (entrega rápida de imagens)
- Transformações automáticas de imagem
- HTTPS por padrão

**Possíveis Melhorias:**

- Adicionar transformações (resize, crop, otimização)
- Implementar exclusão de imagens antigas ao atualizar produto
- Adicionar fallback para falhas de upload

---

## 9. Convenções e Padrões de Código

### 9.1 Padrões de Nomenclatura

| Tipo                    | Convenção                     | Exemplo                                   |
| ----------------------- | ----------------------------- | ----------------------------------------- |
| **Variáveis e funções** | camelCase                     | `createUser`, `productExists`             |
| **Classes**             | PascalCase                    | `CreateUserService`, `AuthUserController` |
| **Interfaces**          | PascalCase + Request/Response | `CreateUserRequest`, `AuthUserResponse`   |
| **Arquivos**            | PascalCase (classes)          | `CreateUserService.ts`                    |
| **Constantes**          | UPPER_SNAKE_CASE              | `JWT_SECRET`, `DATABASE_URL`              |
| **Banco de Dados**      | snake_case                    | `user_id`, `category_id`, `items_orders`  |

### 9.2 Estrutura de Services

**Padrão Consistente:**

```typescript
interface [Action][Entity]Request {
  // parâmetros necessários
}

class [Action][Entity]Service {
  async execute({ param1, param2 }: [Action][Entity]Request) {
    // 1. Validações de existência
    // 2. Validações de regras de negócio
    // 3. Operações no banco de dados
    // 4. Retorno do resultado
  }
}

export { [Action][Entity]Service };
```

**Exemplos:**

- `CreateUserService.execute()`
- `AuthUserService.execute()`
- `AddProductOrderService.execute()`

### 9.3 Estrutura de Controllers

**Padrão Consistente:**

```typescript
class [Action][Entity]Controller {
  async handle(req: Request, res: Response) {
    // 1. Extração de parâmetros (body, params, query)
    // 2. Extração de user_id/role (se autenticado)
    // 3. Instância do service
    // 4. Execução do service
    // 5. Retorno da resposta JSON
  }
}

export { [Action][Entity]Controller };
```

### 9.4 Organização de Rotas

```typescript
const [entity]Router = Router();

[entity]Router.method(
  "/path",
  middleware1,
  middleware2,
  validateSchema(schema),
  new Controller().handle
);

export { [entity]Router };
```

**Ordem dos Middlewares:**

1. `isAuthenticated` (se necessário)
2. `isAdmin` (se necessário)
3. `upload.single()` / `upload.array()` (se upload de arquivo)
4. `validateSchema(schema)` (validação Zod)
5. `Controller.handle` (sempre por último)

### 9.5 TypeScript Strict Mode

**Configurações Ativadas:**

- `strict: true` - Todas as verificações estritas
- `noImplicitAny: true` - Não permitir tipo `any` implícito
- `strictNullChecks: true` - `null` e `undefined` são tipos distintos
- `noUnusedLocals: true` - Erro para variáveis não usadas
- `noUnusedParameters: true` - Erro para parâmetros não usados
- `noImplicitReturns: true` - Todos os caminhos devem retornar valor

### 9.6 Boas Práticas Adotadas

| Prática                            | Implementação                                        |
| ---------------------------------- | ---------------------------------------------------- |
| **Separação de Responsabilidades** | Controller → Service → Prisma                        |
| **Single Responsibility**          | Cada service faz uma coisa                           |
| **DRY**                            | Middlewares reutilizáveis                            |
| **Type Safety**                    | TypeScript strict + Prisma Client                    |
| **Validação em Camadas**           | Zod (entrada) + Lógica (service)                     |
| **Async/Await**                    | Sem callbacks, código síncrono                       |
| **Error Handling**                 | Throw errors em services, catch em middleware global |
| **Transaction Management**         | Prisma transactions para operações complexas         |
| **Select Explícito**               | Nunca retornar senhas (userSelect)                   |
| **Logs Formatados**                | Logger com cores e timestamps                        |

---

## 10. Possíveis Pontos de Evolução

### 10.1 Melhorias Arquiteturais

#### **A. Implementar Repository Pattern**

**Motivação:** Desacoplar serviços do Prisma

```typescript
// Exemplo:
interface UserRepository {
	findByEmail(email: string): Promise<User | null>;
	create(data: CreateUserDTO): Promise<User>;
}

class PrismaUserRepository implements UserRepository {
	// implementação específica do Prisma
}
```

**Benefícios:**

- Facilita testes unitários (mock do repository)
- Permite trocar ORM sem alterar services
- Melhor testabilidade

---

#### **B. Adicionar DTOs (Data Transfer Objects)**

**Motivação:** Separar tipos de entrada/saída do modelo de domínio

```typescript
// Exemplo:
class CreateProductDTO {
	name: string;
	price: number;
	description: string;
	category_id: string;
	file: Express.Multer.File;
}

class ProductResponseDTO {
	id: string;
	name: string;
	price: number;
	bannerUrl: string;
	// sem campos internos
}
```

---

#### **C. Implementar Use Cases / Application Layer**

**Motivação:** Separar orquestração de lógica de negócio

```typescript
// Use Case orquestra múltiplos services
class CreateOrderWithItemsUseCase {
	execute() {
		// 1. CreateOrderService
		// 2. AddProductOrderService (múltiplas vezes)
		// 3. SendOrderService
	}
}
```

---

#### **D. Event-Driven Architecture**

**Motivação:** Desacoplar ações secundárias

```typescript
// Exemplo:
eventEmitter.on("order.sent", async (order) => {
	await notificationService.notifyKitchen(order);
	await analyticsService.track("order_sent", order);
});
```

**Casos de Uso:**

- Enviar notificação quando pedido for enviado
- Atualizar estoque quando produto for adicionado
- Gerar relatórios assíncronos

---

### 10.2 Otimizações de Performance

#### **A. Adicionar Cache Redis**

**Alvos:**

- Lista de categorias (altera pouco)
- Lista de produtos por categoria
- Detalhes de produto

```typescript
// Exemplo:
async listCategories() {
  const cached = await redis.get('categories:all');
  if (cached) return JSON.parse(cached);

  const categories = await prisma.category.findMany();
  await redis.set('categories:all', JSON.stringify(categories), 'EX', 300);
  return categories;
}
```

---

#### **B. Implementar Paginação**

**Motivação:** Listas grandes sobrecarregam memória e rede

```typescript
// Exemplo:
GET /products?category_id=X&page=1&limit=20

async listProducts({ category_id, page = 1, limit = 20 }) {
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    prisma.product.findMany({ skip, take: limit }),
    prisma.product.count({ where: { category_id } })
  ]);
  return { products, total, page, totalPages: Math.ceil(total / limit) };
}
```

---

#### **C. Otimizar Queries N+1**

**Problema Atual:** Algumas queries podem gerar múltiplas consultas

**Solução:** Usar Prisma `include` e `select` estrategicamente

```typescript
// Ruim:
const orders = await prisma.order.findMany();
for (const order of orders) {
	order.items = await prisma.itemsOrder.findMany({
		where: { order_id: order.id },
	});
}

// Bom:
const orders = await prisma.order.findMany({
	include: { items: true },
});
```

---

#### **D. Adicionar Índices no Banco**

**Sugestões:**

```sql
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_disabled ON products(disabled);
CREATE INDEX idx_orders_draft_status ON orders(draft, status);
CREATE INDEX idx_items_order_order_id ON items_orders(order_id);
```

---

### 10.3 Refactors Sugeridos

#### **A. Extrair Lógica de Upload para Service**

**Atual:** Upload no `CreateProductService`

**Proposta:**

```typescript
class CloudinaryUploadService {
	async uploadProductImage(file: Buffer, user_id: string): Promise<string> {
		// lógica de upload
		return secure_url;
	}
}

// CreateProductService usa CloudinaryUploadService
```

---

#### **B. Adicionar Soft Delete Global**

**Motivação:** Manter histórico de registros deletados

```prisma
model Product {
  // ...
  deletedAt DateTime?
}

// Prisma Middleware
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args.data = { deletedAt: new Date() };
  }
  return next(params);
});
```

---

#### **C. Centralizar Mensagens de Erro**

**Atual:** Strings espalhadas pelo código

**Proposta:**

```typescript
// errors/messages.ts
export const ErrorMessages = {
	USER_ALREADY_EXISTS: "User already exists",
	INVALID_CREDENTIALS: "Email or password incorrect",
	CATEGORY_NOT_FOUND: "Category does not exist",
	// ...
} as const;
```

---

#### **D. Adicionar Logging Estruturado**

**Atual:** `console.log` esporádico

**Proposta:** Winston ou Pino

```typescript
logger.info("User created", { user_id, email, role });
logger.error("Upload failed", { error, user_id, file_name });
```

---

### 10.4 Segurança

#### **A. Implementar Rate Limiting**

```typescript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, // máximo 100 requisições por IP
});

app.use("/api", limiter);
```

---

#### **B. Adicionar Helmet.js**

```typescript
import helmet from "helmet";
app.use(helmet()); // Headers de segurança
```

---

#### **C. Sanitização de Inputs**

```typescript
import validator from "validator";

const sanitizedName = validator.escape(req.body.name);
```

---

#### **D. Rotação de Secrets**

- JWT_SECRET deve ser rotacionado periodicamente
- Implementar refresh tokens

---

### 10.5 Funcionalidades Futuras

#### **A. Sistema de Notificações**

- WebSocket para pedidos em tempo real
- Notificar cozinha quando pedido enviado
- Notificar garçom quando pedido pronto

#### **B. Relatórios e Analytics**

- Produtos mais vendidos
- Faturamento por período
- Itens mais combinados (adicionais)
- Horários de pico

#### **C. Gestão de Estoque**

- Controlar quantidade disponível de produtos
- Alertas de estoque baixo
- Desabilitar produto quando estoque zerado

#### **D. Sistema de Pagamento**

- Integração com Stripe/Mercado Pago
- Fechamento de comanda
- Divisão de conta

#### **E. Multi-tenancy**

- Suportar múltiplas unidades/restaurantes
- Isolamento de dados por tenant
- Configurações por unidade

#### **F. Cupons e Promoções**

- Descontos percentuais
- Descontos fixos
- Combos promocionais

#### **G. Avaliações e Feedbacks**

- Clientes avaliarem produtos
- Sistema de comentários
- Moderação de avaliações

#### **H. Impressão de Comandas**

- Geração de PDF
- Integração com impressoras térmicas
- QR Code para rastreamento

---

## 11. Comandos Úteis

### 11.1 Desenvolvimento

```bash
# Iniciar servidor em modo desenvolvimento (hot reload)
yarn dev

# Executar linter
yarn lint

# Corrigir problemas de lint automaticamente
yarn lint:fix

# Formatar código com Prettier
yarn format
```

### 11.2 Prisma

```bash
# Criar nova migration
yarn prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
yarn prisma migrate deploy

# Gerar Prisma Client (após alterar schema)
yarn prisma generate

# Resetar banco de dados (CUIDADO!)
yarn prisma migrate reset

# Abrir Prisma Studio (GUI para visualizar dados)
yarn prisma studio

# Verificar status das migrations
yarn prisma migrate status
```

### 11.3 Build e Deploy

```bash
# Compilar TypeScript
npx tsc

# Executar build compilado
node dist/server.js
```

---

## 12. Variáveis de Ambiente

### 12.1 Arquivo .env (Exemplo)

```env
# Servidor
PORT=3333
NODE_ENV=development

# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/pastelaria?schema=public"

# JWT
JWT_SECRET="chave_secreta_super_forte_e_aleatoria_minimo_32_caracteres"

# Cloudinary
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="sua_secret_key_cloudinary"
```

### 12.2 Variáveis Obrigatórias

| Variável                | Descrição                     | Exemplo                |
| ----------------------- | ----------------------------- | ---------------------- |
| `DATABASE_URL`          | Connection string PostgreSQL  | `postgresql://...`     |
| `JWT_SECRET`            | Chave para assinar tokens JWT | String aleatória forte |
| `CLOUDINARY_CLOUD_NAME` | Nome da conta Cloudinary      | `my-cloud`             |
| `CLOUDINARY_API_KEY`    | API Key do Cloudinary         | `123456789`            |
| `CLOUDINARY_API_SECRET` | API Secret do Cloudinary      | `abc123...`            |

### 12.3 Variáveis Opcionais

| Variável   | Padrão | Descrição                         |
| ---------- | ------ | --------------------------------- |
| `PORT`     | `3333` | Porta do servidor                 |
| `NODE_ENV` | -      | Ambiente (development/production) |

---

## 13. Estrutura de Resposta da API

### 13.1 Sucesso

```json
// Status: 200 OK / 201 Created
{
	"id": "uuid",
	"name": "string",
	"email": "string"
	// ... outros campos
}
```

### 13.2 Erro de Validação (Zod)

```json
// Status: 400 Bad Request
{
	"message": "Validation failed",
	"details": [
		{
			"field": "body.email",
			"message": "Invalid email address"
		},
		{
			"field": "body.password",
			"message": "Password must be at least 6 characters long"
		}
	]
}
```

### 13.3 Erro de Negócio

```json
// Status: 400 Bad Request
{
	"error": "User already exists"
}
```

### 13.4 Erro de Autenticação

```json
// Status: 401 Unauthorized
{
  "error": "Token missing"
}
// ou
{
  "error": "Invalid token"
}
```

### 13.5 Erro de Autorização

```json
// Status: 403 Forbidden
{
	"error": "Insufficient permissions"
}
```

### 13.6 Erro Interno

```json
// Status: 500 Internal Server Error
{
	"status": "error",
	"message": "Internal Server Error"
}
```

---

## 14. Diagrama de Estados do Pedido

```
┌─────────────┐
│   CRIADO    │
│ draft=true  │
│ status=false│
└──────┬──────┘
       │ Adicionar items
       ▼
┌─────────────┐
│  RASCUNHO   │
│ (draft=true)│  ◄── Pode adicionar/remover items
│             │  ◄── Pode ser deletado
└──────┬──────┘
       │ SEND (POST /orders/:id/send)
       │ ✓ Valida: items.length > 0
       ▼
┌─────────────┐
│   ENVIADO   │
│draft=false  │  ◄── Não pode mais adicionar items
│status=false │  ◄── Não pode mais ser deletado
└──────┬──────┘
       │ FINISH (PATCH /orders/:id/finish)
       ▼
┌─────────────┐
│ FINALIZADO  │
│draft=false  │  ◄── Estado final
│ status=true │  ◄── Não pode ser modificado
└─────────────┘
```

---

## 15. Fluxo de Upload de Imagem

```
Cliente                    Backend                   Cloudinary
   │                          │                          │
   │  POST /products          │                          │
   │  multipart/form-data     │                          │
   ├─────────────────────────►│                          │
   │                          │                          │
   │                          │ 1. Multer intercepta     │
   │                          │    file em buffer        │
   │                          │                          │
   │                          │ 2. Valida tipo MIME      │
   │                          │    (jpeg/png/gif)        │
   │                          │                          │
   │                          │ 3. Valida tamanho        │
   │                          │    (max 5MB)             │
   │                          │                          │
   │                          │ 4. Converte buffer       │
   │                          │    para stream           │
   │                          │                          │
   │                          │ 5. Upload via stream     │
   │                          ├─────────────────────────►│
   │                          │                          │
   │                          │                          │ 6. Processa imagem
   │                          │                          │
   │                          │ 7. Retorna secure_url    │
   │                          │◄─────────────────────────┤
   │                          │                          │
   │                          │ 8. Salva URL no banco    │
   │                          │    (Product.bannerUrl)   │
   │                          │                          │
   │  Response com produto    │                          │
   │◄─────────────────────────┤                          │
   │                          │                          │
```

---

## 16. Considerações Finais

### 16.1 Pontos Fortes do Sistema

✅ **Arquitetura clara e bem organizada** - Separação de responsabilidades  
✅ **Type safety** - TypeScript strict + Prisma  
✅ **Validação robusta** - Zod em todas as entradas  
✅ **Segurança básica** - JWT, bcrypt, validação de permissões  
✅ **Regras de negócio bem definidas** - Proteção de integridade de dados  
✅ **Upload externo** - Cloudinary para escalabilidade  
✅ **Transactions** - Garantia de consistência em operações complexas

### 16.2 Pontos de Atenção

⚠️ **Sem paginação** - Pode gerar problemas com muitos dados  
⚠️ **Sem cache** - Todas as requisições vão ao banco  
⚠️ **Sem rate limiting** - Vulnerável a ataques de força bruta  
⚠️ **CORS aberto** - Configurado para aceitar qualquer origem  
⚠️ **Logs básicos** - Dificulta debugging em produção  
⚠️ **Sem testes** - Nenhum teste unitário ou de integração detectado

### 16.3 Recomendações para Produção

1. **Adicionar testes** (Jest + Supertest)
2. **Implementar rate limiting** (express-rate-limit)
3. **Configurar CORS restrito** (apenas domínios autorizados)
4. **Adicionar Helmet.js** (headers de segurança)
5. **Implementar logging estruturado** (Winston/Pino)
6. **Adicionar health checks** (GET /health)
7. **Configurar CI/CD** (GitHub Actions, GitLab CI)
8. **Implementar monitoramento** (Sentry, DataDog)
9. **Adicionar paginação** em todas as listagens
10. **Configurar backups automáticos** do PostgreSQL
11. **Usar variáveis de ambiente por ambiente** (.env.dev, .env.prod)
12. **Implementar HTTPS** (certificado SSL/TLS)

---

## 17. Glossário

| Termo                 | Definição                                               |
| --------------------- | ------------------------------------------------------- |
| **Draft**             | Estado de pedido em rascunho, ainda pode ser modificado |
| **Status**            | Flag booleana indicando se pedido foi finalizado        |
| **Disabled**          | Produto ou opcional desabilitado (soft delete)          |
| **isRoot**            | Flag indicando se usuário é o primeiro admin criado     |
| **ItemsOrder**        | Item individual em um pedido (produto + quantidade)     |
| **ItemsOptionals**    | Adicionais escolhidos para um item específico           |
| **ProductsOptionals** | Relação entre produto e opcional disponível             |
| **bannerUrl**         | URL da imagem do produto no Cloudinary                  |
| **Cascade Delete**    | Deleção automática de registros relacionados            |
| **Soft Delete**       | Marcar como deletado sem remover do banco               |
| **JWT**               | JSON Web Token - Token de autenticação                  |
| **Payload**           | Dados contidos dentro do token JWT                      |
| **Middleware**        | Função executada antes do controller                    |
| **Service Layer**     | Camada contendo lógica de negócio                       |
| **ORM**               | Object-Relational Mapping - Prisma                      |

---

**Documento gerado em:** 27 de janeiro de 2026  
**Última revisão:** 8 de março de 2026  
**Versão do Sistema:** 1.1  
**Baseado em:** Análise automatizada do código-fonte completo

---

## 📚 Recursos Adicionais

Para começar a usar a API, consulte o [README.md](./README.md) que contém:

- Guia de instalação rápida
- Exemplos práticos de uso
- Comandos úteis do dia a dia
- Configuração de variáveis de ambiente

Para documentação completa dos endpoints, consulte [endpoints.md](./endpoints.md).

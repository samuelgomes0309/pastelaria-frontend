# Documentação de Endpoints - API Pastelaria

## Índice

1. [Autenticação](#autenticação)
2. [Usuários](#usuários)
3. [Categorias](#categorias)
4. [Produtos](#produtos)
5. [Opcionais](#opcionais)
6. [Pedidos](#pedidos)

---

## Tabela Resumida de Endpoints

| Método | Endpoint | Descrição | Autenticação | Role |
|--------|----------|-----------|--------------|------|
| **USUÁRIOS** |
| POST | `/users` | Criar novo usuário | Não | - |
| POST | `/session` | Login/autenticação | Não | - |
| GET | `/me` | Detalhes do usuário logado | Sim | - |
| PATCH | `/users/role` | Atualizar role do usuário | Sim | ADMIN |
| **CATEGORIAS** |
| POST | `/categories` | Criar categoria | Sim | ADMIN |
| GET | `/categories` | Listar categorias | Sim | - |
| GET | `/categories/:category_id` | Detalhes da categoria | Sim | - |
| PATCH | `/categories/:category_id` | Atualizar categoria | Sim | ADMIN |
| DELETE | `/categories/:category_id` | Remover categoria | Sim | ADMIN |
| **PRODUTOS** |
| POST | `/products` | Criar produto | Sim | ADMIN |
| PUT | `/products/:product_id` | Atualizar produto | Sim | ADMIN |
| GET | `/products` | Listar produtos | Sim | - |
| GET | `/products/detail` | Detalhes do produto | Sim | - |
| PUT | `/products/disable` | Desabilitar/habilitar produto | Sim | ADMIN |
| POST | `/products/optionals` | Adicionar opcional ao produto | Sim | ADMIN |
| DELETE | `/products/optionals` | Remover opcional do produto | Sim | ADMIN |
| **OPCIONAIS** |
| POST | `/optionals` | Criar opcional | Sim | ADMIN |
| GET | `/optionals` | Listar opcionais | Sim | - |
| GET | `/optionals/:optional_id` | Detalhes do opcional | Sim | - |
| **PEDIDOS** |
| POST | `/orders` | Criar pedido | Sim | - |
| POST | `/orders/items` | Adicionar produto ao pedido | Sim | - |
| DELETE | `/orders/remove/:item_id` | Remover produto do pedido | Sim | - |
| GET | `/orders` | Listar pedidos | Sim | - |
| GET | `/orders/details/:order_id` | Detalhes do pedido | Sim | - |
| DELETE | `/orders/:order_id` | Remover pedido | Sim | - |
| PATCH | `/orders/:order_id/send` | Enviar pedido para cozinha | Sim | - |
| PATCH | `/orders/:order_id/finish` | Finalizar pedido | Sim | - |

---

## Autenticação

Todos os endpoints (exceto criação de usuário e login) requerem autenticação via token JWT no header:

```
Authorization: Bearer <seu_token_jwt>
```

**Roles:**
- `ADMIN`: Acesso completo a todas as funcionalidades
- `STAFF`: Acesso limitado (sem permissões administrativas)

---

## Usuários

### 1. Criar Usuário

**POST** `/users`

Cria um novo usuário no sistema.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Validações:**
- `name`: mínimo 3 caracteres
- `email`: formato de email válido
- `password`: mínimo 6 caracteres

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "STAFF",
  "createdAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 2. Login (Autenticação)

**POST** `/session`

Autentica um usuário e retorna um token JWT.

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "joao@exemplo.com",
  "password": "senha123"
}
```

**Validações:**
- `email`: formato de email válido
- `password`: mínimo 6 caracteres

**Resposta de Sucesso (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. Detalhes do Usuário Logado

**GET** `/me`

Retorna os dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "STAFF",
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 4. Atualizar Role do Usuário

**PATCH** `/users/role`

Atualiza a role (função) de um usuário. **Requer role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "joao@exemplo.com",
  "role": "ADMIN"
}
```

**Validações:**
- `email`: formato de email válido
- `role`: deve ser "ADMIN" ou "STAFF"

**Resposta de Sucesso (200):**
```json
{
  "id": "uuid-do-usuario",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "role": "ADMIN",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

## Categorias

### 1. Criar Categoria

**POST** `/categories`

Cria uma nova categoria de produtos. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Pastéis Salgados",
  "description": "Deliciosos pastéis salgados variados"
}
```

**Validações:**
- `name`: mínimo 3 caracteres
- `description`: opcional

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-da-categoria",
  "name": "Pastéis Salgados",
  "description": "Deliciosos pastéis salgados variados",
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 2. Listar Categorias

**GET** `/categories`

Lista todas as categorias cadastradas. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "uuid-da-categoria-1",
    "name": "Pastéis Salgados",
    "description": "Deliciosos pastéis salgados variados",
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  },
  {
    "id": "uuid-da-categoria-2",
    "name": "Pastéis Doces",
    "description": "Pastéis doces para sobremesa",
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  }
]
```

---

### 3. Detalhes da Categoria

**GET** `/categories/:category_id`

Retorna os detalhes de uma categoria específica. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `category_id`: UUID da categoria

**Exemplo de Request:**
```
GET /categories/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Pastéis Salgados",
  "description": "Deliciosos pastéis salgados variados",
  "products": [
    {
      "id": "uuid-produto-1",
      "name": "Pastel de Carne",
      "price": 800,
      "disabled": false
    }
  ],
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 4. Atualizar Categoria

**PATCH** `/categories/:category_id`

Atualiza os dados de uma categoria. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parâmetros de URL:**
- `category_id`: UUID da categoria

**Body:**
```json
{
  "name": "Pastéis Especiais",
  "description": "Nossa linha especial de pastéis"
}
```

**Validações:**
- `name`: mínimo 3 caracteres (opcional)
- `description`: opcional

**Exemplo de Request:**
```
PATCH /categories/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Pastéis Especiais",
  "description": "Nossa linha especial de pastéis",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 5. Remover Categoria

**DELETE** `/categories/:category_id`

Remove uma categoria do sistema. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `category_id`: UUID da categoria

**Exemplo de Request:**
```
DELETE /categories/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Categoria removida com sucesso"
}
```

---

## Produtos

### 1. Criar Produto

**POST** `/products`

Cria um novo produto. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body (FormData):**
```
name: "Pastel de Carne"
price: "800"
description: "Delicioso pastel recheado com carne moída temperada"
category_id: "uuid-da-categoria"
file: (arquivo de imagem)
```

**Validações:**
- `name`: mínimo 3 caracteres
- `price`: string numérica (em centavos)
- `description`: mínimo 10 caracteres
- `category_id`: UUID válido
- `file`: imagem (upload)

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-do-produto",
  "name": "Pastel de Carne",
  "price": 800,
  "description": "Delicioso pastel recheado com carne moída temperada",
  "bannerUrl": "https://res.cloudinary.com/...",
  "category_id": "uuid-da-categoria",
  "disabled": false,
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 2. Atualizar Produto

**PUT** `/products/:product_id`

Atualiza os dados de um produto. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Parâmetros de URL:**
- `product_id`: UUID do produto

**Body (FormData):**
```
name: "Pastel de Carne Premium"
price: "1000"
description: "Pastel de carne com recheio especial"
product_id: "uuid-do-produto"
file: (arquivo de imagem - opcional)
```

**Validações:**
- `name`: mínimo 3 caracteres (opcional)
- `price`: string numérica (opcional)
- `description`: mínimo 10 caracteres (opcional)
- `product_id`: UUID válido
- `file`: imagem (opcional)

**Exemplo de Request:**
```
PUT /products/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Pastel de Carne Premium",
  "price": 1000,
  "description": "Pastel de carne com recheio especial",
  "bannerUrl": "https://res.cloudinary.com/...",
  "disabled": false,
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 3. Listar Produtos

**GET** `/products`

Lista produtos de uma categoria específica. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `category_id`: UUID da categoria (obrigatório)
- `status`: "true" ou "false" - filtrar por status ativo/inativo (opcional)

**Exemplo de Request:**
```
GET /products?category_id=550e8400-e29b-41d4-a716-446655440000&status=true
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "uuid-produto-1",
    "name": "Pastel de Carne",
    "price": 800,
    "description": "Delicioso pastel recheado com carne moída temperada",
    "bannerUrl": "https://res.cloudinary.com/...",
    "category_id": "uuid-da-categoria",
    "disabled": false,
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  },
  {
    "id": "uuid-produto-2",
    "name": "Pastel de Queijo",
    "price": 700,
    "description": "Pastel de queijo derretido muito saboroso",
    "bannerUrl": "https://res.cloudinary.com/...",
    "category_id": "uuid-da-categoria",
    "disabled": false,
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  }
]
```

---

### 4. Detalhes do Produto

**GET** `/products/detail`

Retorna os detalhes completos de um produto específico. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `product_id`: UUID do produto (obrigatório)

**Exemplo de Request:**
```
GET /products/detail?product_id=550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Pastel de Carne",
  "price": 800,
  "description": "Delicioso pastel recheado com carne moída temperada",
  "bannerUrl": "https://res.cloudinary.com/...",
  "category_id": "uuid-da-categoria",
  "disabled": false,
  "category": {
    "id": "uuid-da-categoria",
    "name": "Pastéis Salgados"
  },
  "productsOptionals": [
    {
      "id": "uuid-product-optional-1",
      "disabled": false,
      "optional": {
        "id": "uuid-opcional-1",
        "name": "Queijo Extra",
        "price": 200
      }
    }
  ],
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 5. Desabilitar/Habilitar Produto

**PUT** `/products/disable`

Alterna o status ativo/inativo de um produto. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "product_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Pastel de Carne",
  "disabled": true,
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 6. Adicionar Opcional ao Produto

**POST** `/products/optionals`

Vincula um opcional a um produto. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "product_id": "uuid-do-produto",
  "optional_id": "uuid-do-opcional"
}
```

**Validações:**
- `product_id`: UUID válido
- `optional_id`: UUID válido

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-product-optional",
  "product_id": "uuid-do-produto",
  "optional_id": "uuid-do-opcional",
  "disabled": false,
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 7. Remover Opcional do Produto

**DELETE** `/products/optionals`

Remove a vinculação de um opcional com um produto. **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `product_optional_id`: UUID da vinculação produto-opcional

**Exemplo de Request:**
```
DELETE /products/optionals?product_optional_id=550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Opcional removido do produto com sucesso"
}
```

---

## Opcionais

### 1. Criar Opcional

**POST** `/optionals`

Cria um novo item opcional (adicional). **Requer autenticação e role ADMIN**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Queijo Extra",
  "price": 200
}
```

**Validações:**
- `name`: obrigatório
- `price`: número, mínimo 0

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-do-opcional",
  "name": "Queijo Extra",
  "price": 200,
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 2. Listar Opcionais

**GET** `/optionals`

Lista todos os opcionais cadastrados. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "uuid-opcional-1",
    "name": "Queijo Extra",
    "price": 200,
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  },
  {
    "id": "uuid-opcional-2",
    "name": "Bacon",
    "price": 300,
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  }
]
```

---

### 3. Detalhes do Opcional

**GET** `/optionals/:optional_id`

Retorna os detalhes de um opcional específico. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `optional_id`: UUID do opcional

**Exemplo de Request:**
```
GET /optionals/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Queijo Extra",
  "price": 200,
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

## Pedidos

### 1. Criar Pedido

**POST** `/orders`

Cria um novo pedido. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "table": 5,
  "name": "Maria Silva"
}
```

**Validações:**
- `table`: número, mínimo 1
- `name`: opcional

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-do-pedido",
  "table": 5,
  "name": "Maria Silva",
  "status": false,
  "draft": true,
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 2. Adicionar Produto ao Pedido

**POST** `/orders/items`

Adiciona um produto (com opcionais) a um pedido. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "order_id": "uuid-do-pedido",
  "product_id": "uuid-do-produto",
  "amount": 2,
  "product_optionals_id": [
    "uuid-product-optional-1",
    "uuid-product-optional-2"
  ]
}
```

**Validações:**
- `order_id`: UUID válido
- `product_id`: UUID válido
- `amount`: número, mínimo 1
- `product_optionals_id`: array de UUIDs (opcional)

**Resposta de Sucesso (201):**
```json
{
  "id": "uuid-do-item",
  "order_id": "uuid-do-pedido",
  "product_id": "uuid-do-produto",
  "amount": 2,
  "product": {
    "id": "uuid-do-produto",
    "name": "Pastel de Carne",
    "price": 800
  },
  "itemsOptionals": [
    {
      "id": "uuid-item-opcional-1",
      "product_optional": {
        "optional": {
          "name": "Queijo Extra",
          "price": 200
        }
      }
    }
  ],
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 3. Remover Produto do Pedido

**DELETE** `/orders/remove/:item_id`

Remove um item (produto) de um pedido. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `item_id`: UUID do item do pedido

**Query Parameters:**
- `order_id`: UUID do pedido

**Exemplo de Request:**
```
DELETE /orders/remove/550e8400-e29b-41d4-a716-446655440000?order_id=660e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Item removido do pedido com sucesso"
}
```

---

### 4. Listar Pedidos

**GET** `/orders`

Lista todos os pedidos. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Resposta de Sucesso (200):**
```json
[
  {
    "id": "uuid-pedido-1",
    "table": 5,
    "name": "Maria Silva",
    "status": false,
    "draft": true,
    "createdAt": "2026-01-28T12:00:00.000Z",
    "updatedAt": "2026-01-28T12:00:00.000Z"
  },
  {
    "id": "uuid-pedido-2",
    "table": 3,
    "name": "João Santos",
    "status": true,
    "draft": false,
    "createdAt": "2026-01-28T11:00:00.000Z",
    "updatedAt": "2026-01-28T11:30:00.000Z"
  }
]
```

---

### 5. Detalhes do Pedido

**GET** `/orders/details/:order_id`

Retorna os detalhes completos de um pedido específico. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `order_id`: UUID do pedido

**Exemplo de Request:**
```
GET /orders/details/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "table": 5,
  "name": "Maria Silva",
  "status": false,
  "draft": true,
  "items": [
    {
      "id": "uuid-item-1",
      "amount": 2,
      "product": {
        "id": "uuid-produto-1",
        "name": "Pastel de Carne",
        "price": 800,
        "bannerUrl": "https://res.cloudinary.com/..."
      },
      "itemsOptionals": [
        {
          "id": "uuid-item-opcional-1",
          "product_optional": {
            "id": "uuid-product-optional-1",
            "optional": {
              "id": "uuid-opcional-1",
              "name": "Queijo Extra",
              "price": 200
            }
          }
        }
      ]
    }
  ],
  "createdAt": "2026-01-28T12:00:00.000Z",
  "updatedAt": "2026-01-28T12:00:00.000Z"
}
```

---

### 6. Remover Pedido

**DELETE** `/orders/:order_id`

Remove um pedido completo do sistema. **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `order_id`: UUID do pedido

**Exemplo de Request:**
```
DELETE /orders/550e8400-e29b-41d4-a716-446655440000
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Pedido removido com sucesso"
}
```

---

### 7. Enviar Pedido (Remover do Rascunho)

**PATCH** `/orders/:order_id/send`

Envia o pedido para a cozinha (altera `draft` para `false`). **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `order_id`: UUID do pedido

**Exemplo de Request:**
```
PATCH /orders/550e8400-e29b-41d4-a716-446655440000/send
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "table": 5,
  "name": "Maria Silva",
  "status": false,
  "draft": false,
  "updatedAt": "2026-01-28T12:05:00.000Z"
}
```

---

### 8. Finalizar Pedido

**PATCH** `/orders/:order_id/finish`

Marca o pedido como finalizado (altera `status` para `true`). **Requer autenticação**.

**Headers:**
```
Authorization: Bearer <token>
```

**Parâmetros de URL:**
- `order_id`: UUID do pedido

**Exemplo de Request:**
```
PATCH /orders/550e8400-e29b-41d4-a716-446655440000/finish
```

**Resposta de Sucesso (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "table": 5,
  "name": "Maria Silva",
  "status": true,
  "draft": false,
  "updatedAt": "2026-01-28T12:30:00.000Z"
}
```

---

## Códigos de Status HTTP

### Sucesso
- **200 OK**: Requisição bem-sucedida
- **201 Created**: Recurso criado com sucesso

### Erros do Cliente
- **400 Bad Request**: Dados inválidos ou malformados
- **401 Unauthorized**: Token de autenticação ausente ou inválido
- **403 Forbidden**: Usuário não tem permissão para acessar o recurso
- **404 Not Found**: Recurso não encontrado

### Erros do Servidor
- **500 Internal Server Error**: Erro interno do servidor

---

## Notas Importantes

1. **Preços**: Todos os preços são armazenados em centavos (ex: R$ 8,00 = 800)

2. **UUIDs**: Todos os IDs são UUIDs no formato: `550e8400-e29b-41d4-a716-446655440000`

3. **Datas**: Todas as datas seguem o formato ISO 8601: `2026-01-28T12:00:00.000Z`

4. **Upload de Imagens**: 
   - Aceitos formatos: JPG, PNG, WEBP
   - As imagens são armazenadas no Cloudinary
   - Use `multipart/form-data` para enviar arquivos

5. **Status do Pedido**:
   - `draft: true` - Pedido em rascunho (ainda não enviado para cozinha)
   - `draft: false` - Pedido enviado para cozinha
   - `status: false` - Pedido em preparo
   - `status: true` - Pedido finalizado/entregue

6. **Roles**:
   - Apenas usuários com role `ADMIN` podem criar, atualizar e deletar categorias, produtos e opcionais
   - Usuários `STAFF` podem apenas visualizar e gerenciar pedidos

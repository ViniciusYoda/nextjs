# Agenda Next

Projeto didático de gerenciamento de contatos construído para demonstrar, de forma incremental, as principais funcionalidades do Next.js moderno.

A aplicação possui autenticação, CRUD de contatos, SQLite, API HTTP, busca, filtros, paginação, Server Actions e modais com rotas interceptadas. A interface foi construída com Tailwind CSS e funciona em telas pequenas e grandes.

## Tecnologias

- Next.js 16.3 com App Router e Turbopack
- React 19.2
- TypeScript 5
- Tailwind CSS 4
- SQLite nativo do Node.js (`node:sqlite`)
- ESLint 9

## Funcionalidades

- Login didático com sessão assinada por HMAC SHA-256
- Cookie de sessão `httpOnly`, `SameSite=Lax` e `Secure` em produção
- Proteção de `/contatos` e `/dashboard` por `proxy.ts`
- Autorização adicional nas Server Actions e mutações da API
- Cadastro, listagem, visualização, edição e exclusão de contatos
- Persistência local em SQLite
- Busca por nome ou e-mail
- Filtro por categoria
- Paginação registrada na URL com `searchParams`
- API REST com `GET`, `POST`, `PATCH` e `DELETE`
- Metadata estática e dinâmica
- Estados personalizados de loading, erro e página não encontrada
- Modal acessível com Parallel Routes e Intercepting Routes
- Página completa preservada para links diretos de contatos
- Dashboard com métricas calculadas no servidor

## Pré-requisitos

- Node.js 24 ou superior
- npm 11 ou superior

O projeto utiliza `node:sqlite`. Em versões anteriores do Node.js, esse módulo pode não estar disponível ou não possuir os tipos necessários.

## Instalação

Clone o repositório, entre na pasta e instale as dependências:

```bash
npm install
```

No Windows PowerShell, caso a política de execução bloqueie `npm.ps1`, utilize:

```powershell
npm.cmd install
```

Crie o arquivo de ambiente local a partir do exemplo:

```bash
cp .env.example .env.local
```

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Preencha as variáveis:

```dotenv
AUTH_SECRET=uma-chave-aleatoria-forte
DEMO_EMAIL=admin@agenda.local
DEMO_PASSWORD=uma-senha-forte
```

`AUTH_SECRET` deve ser longo, aleatório e privado. O arquivo `.env.local` é ignorado pelo Git.

## Executando localmente

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Ou, no PowerShell com restrição de scripts:

```powershell
npm.cmd run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Use as credenciais definidas em `DEMO_EMAIL` e `DEMO_PASSWORD`. A configuração local criada durante o tutorial utiliza:

```text
E-mail: admin@agenda.local
Senha:  AprenderNext!2026
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Cria e valida o build de produção |
| `npm run start` | Executa o build de produção |
| `npm run lint` | Analisa o código com ESLint |

## Rotas da aplicação

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | Público | Apresentação do projeto |
| `/login` | Público | Formulário de autenticação |
| `/contatos` | Protegido | Lista, busca, filtros, paginação e cadastro |
| `/contatos/[id]` | Protegido | Detalhes de um contato |
| `/contatos/[id]/editar` | Protegido | Edição de um contato |
| `/dashboard` | Protegido | Métricas da agenda e encerramento da sessão |

### Busca e paginação

Os filtros da lista são representados por query parameters:

```text
/contatos?q=ana
/contatos?categoria=Trabalho
/contatos?q=ana&categoria=Trabalho&page=2
```

Como o estado está na URL, a busca pode ser compartilhada, recarregada e percorrida com o histórico do navegador.

## API

### Endpoints

| Método | Endpoint | Autenticação | Descrição |
| --- | --- | --- | --- |
| `GET` | `/api/contacts` | Não | Lista contatos com busca e paginação |
| `POST` | `/api/contacts` | Sim | Cria um contato |
| `GET` | `/api/contacts/[id]` | Não | Retorna um contato |
| `PATCH` | `/api/contacts/[id]` | Sim | Atualiza um contato |
| `DELETE` | `/api/contacts/[id]` | Sim | Exclui um contato |

O endpoint de listagem aceita `q`, `categoria` e `page`:

```bash
curl "http://localhost:3000/api/contacts?q=ana&categoria=Trabalho&page=1"
```

Exemplo de resposta:

```json
{
  "contacts": [],
  "page": 1,
  "total": 0,
  "totalPages": 1
}
```

Corpo utilizado para criação e atualização:

```json
{
  "name": "Marina Costa",
  "email": "marina@exemplo.com",
  "phone": "(11) 99999-9999",
  "category": "Amigos"
}
```

As mutações exigem o cookie de uma sessão autenticada. Respostas relevantes:

| Status | Significado |
| --- | --- |
| `200` | Consulta ou atualização concluída |
| `201` | Contato criado |
| `204` | Contato excluído |
| `400` | Requisição ou ID inválido |
| `401` | Sessão ausente ou inválida |
| `404` | Contato não encontrado |
| `422` | Campos não passaram pela validação |

## Banco de dados

O SQLite é inicializado automaticamente na primeira execução:

```text
data/agenda.db
```

A tabela `contacts` possui as colunas:

```text
id, name, email, phone, category, created_at
```

Consultas utilizam parâmetros (`?`) em vez de concatenar valores recebidos, reduzindo o risco de SQL injection.

Arquivos `.db`, `.db-shm` e `.db-wal` são ignorados pelo Git. O arquivo `src/data/custom-contacts.json` existe apenas para migrar registros criados em uma etapa anterior do tutorial quando o banco ainda estiver vazio.

## Autenticação

A autenticação deste projeto é propositalmente didática:

1. O formulário chama uma Server Action.
2. As credenciais são comparadas no servidor.
3. Uma sessão com validade de uma hora é assinada com HMAC SHA-256.
4. O token é armazenado em um cookie `httpOnly`.
5. `src/proxy.ts` faz uma verificação otimista antes de renderizar rotas protegidas.
6. O dashboard, as Server Actions e a API verificam novamente a sessão.

O Proxy não é usado como única barreira de segurança. Toda mutação também verifica autorização no servidor.

Para produção, prefira uma biblioteca especializada de autenticação, armazenamento seguro de usuários, hashes de senha, recuperação de conta, limitação de tentativas e proteção contra abuso.

## Rotas paralelas e modal

O modal de contatos demonstra duas convenções específicas do App Router:

```text
src/app/@modal/                    slot paralelo
src/app/@modal/(.)contatos/[id]/  rota interceptada
```

Ao navegar da lista para um contato usando `Link`, a rota é interceptada e aparece em um modal. A URL continua sendo `/contatos/[id]`. Se essa URL for aberta diretamente ou atualizada, a página completa é renderizada.

O modal pode ser fechado por:

- botão ×;
- tecla Escape;
- clique no fundo;
- ação de voltar do navegador.

## Estrutura principal

```text
src/
├── app/
│   ├── @modal/                  # Slot paralelo e rota interceptada
│   ├── api/contacts/            # Route Handlers
│   ├── contatos/                # Lista, detalhes, edição e Server Actions
│   ├── dashboard/               # Área protegida
│   ├── login/                   # Login e logout
│   ├── globals.css              # Tailwind e estilos globais
│   └── layout.tsx               # Layout raiz
├── components/                  # Componentes visuais e interativos
├── data/contacts.ts             # Acesso ao SQLite e validação
├── lib/auth.ts                  # Verificação de sessão no servidor
├── lib/session-token.ts         # Assinatura e validação do token
└── proxy.ts                     # Proteção antecipada de rotas
```

## Conceitos estudados

O projeto serve como referência prática para:

1. App Router, páginas e layouts
2. Server Components e Client Components
3. Componentes, props e listas
4. Tailwind CSS 4
5. Rotas dinâmicas e `params` assíncronos
6. Metadata estática e dinâmica
7. Formulários e `useActionState`
8. Server Actions e `revalidatePath`
9. Route Handlers e APIs HTTP
10. SQLite e CRUD
11. `searchParams`, filtros e paginação
12. Cookies, sessões, Proxy e autorização
13. `loading.tsx`, `error.tsx` e `not-found.tsx`
14. Parallel Routes e Intercepting Routes

## Build de produção

Valide o projeto antes de publicar:

```bash
npm run lint
npm run build
npm run start
```

## Limitações de implantação

Este projeto grava o SQLite no sistema de arquivos local. Ele deve ser executado em um ambiente Node.js com disco persistente e suporte a `node:sqlite`.

Ambientes serverless com sistema de arquivos temporário, múltiplas instâncias ou runtime Edge não são adequados para este banco local. Para publicação nesses ambientes, substitua o módulo de dados por um banco persistente externo, como PostgreSQL, Turso/libSQL, Neon ou outro serviço compatível.

O Node.js utilizado atualmente também pode exibir um aviso indicando que `node:sqlite` ainda é experimental.

## Referências

- [Documentação do Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/getting-started/updating-data)
- [Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Autenticação](https://nextjs.org/docs/app/guides/authentication)
- [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
- [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes)
- [Tailwind CSS](https://tailwindcss.com/docs)

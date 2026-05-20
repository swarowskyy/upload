Markdown
# 📦 API de Gerenciamento de Arquivos (NestJS)

Esta é uma API REST robusta desenvolvida com o framework NestJS para o gerenciamento de arquivos de imagem no servidor local, contando com travas automatizadas de segurança para tamanho e formato de arquivos.

---

## 🚀 Pré-requisitos e Instalação

Siga o passo a passo abaixo para clonar o repositório, instalar as dependências e executar o projeto em sua máquina local.

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
* **Node.js** (Versão 16 ou superior)
* **NPM** (Gerenciador de pacotes que já vem com o Node)
* Um cliente HTTP para testar as rotas (como Postman ou Insomnia)

### Passo a Passo

1. **Clone o repositório do GitHub:**
   ```bash
   git clone (https://github.com/swarowskyy/upload)
Acesse a pasta do projeto:

Bash
cd upload
Instale todas as dependências necessárias:

Bash
npm install
Instale as tipagens do Multer (Caso o TypeScript apresente alertas):

Bash
npm install --save-dev @types/multer
Inicie o servidor local:

Bash
npm run start
O servidor iniciará automaticamente na porta 3000. A URL base para todas as requisições será: http://localhost:3000

📖 Guia Completo de Endpoints
1. Enviar Arquivo (Upload)
Envia uma imagem para ser salva no servidor dentro do diretório ./drive. O sistema valida se o arquivo possui tamanho máximo de 5MB e se pertence aos formatos JPG, JPEG, PNG ou TIFF.

Método HTTP: POST

Rota/URL: /arquivo/upload

Parâmetros necessários: Enviados via FormData

Chave (Key): file (Tipo: File)

Valor (Value): [Selecione o seu arquivo de imagem]

✅ Exemplo de resposta de sucesso (HTTP 201 Created):

JSON
{
  "message": "Arquivo enviado com sucesso",
  "__filename": "file-1716225400000-837492000.png",
  "originalname": "minha-foto.png",
  "size": 1048576
}

❌ Exemplo de resposta de erro - Tamanho Excedido (HTTP 413 Payload Too Large):
JSON
{
  "message": "File too large",
  "error": "Payload Too Large",
  "statusCode": 413
}

❌ Exemplo de resposta de erro - Formato Inválido (HTTP 400 Bad Request):
JSON
{
  "message": "Formato inválido. Apenas JPG, PNG e TIFF são permitidos.",
  "error": "Bad Request",
  "statusCode": 400
}

2. Listar Todos os Arquivos
Varre a pasta física de armazenamento no servidor e lista as informações de todos os arquivos que estão salvos lá.

Método HTTP: GET
Rota/URL: /arquivo
Parâmetros necessários: Nenhum.

✅ Exemplo de resposta de sucesso (HTTP 200 OK):
JSON
{
  "total": 1,
  "files": [
    {
      "__filename": "file-1716225400000-837492000.png",
      "size": 1048576,
      "criado": "2026-05-20T17:16:48.000Z"
    }
  ]
}

❌ Exemplo de resposta de erro - Falha de Leitura (HTTP 502 Bad Gateway):
JSON
{
  "message": "Não foi possível listar os arquivos",
  "error": "Bad Gateway",
  "statusCode": 502
}
3. Buscar Arquivo por ID (Mock/Simulado)
Rota legada mantida na API para simular a busca por um identificador numérico único.

Método HTTP: GET
Rota/URL: /arquivo/:id
Parâmetros necessários: Passado diretamente na URL (Path Parameter)
Exemplo de URL: /arquivo/5

✅ Exemplo de resposta de sucesso (HTTP 200 OK):
Plaintext
"Essa rota retornaria o arquivo com ID 5"
4. Remover Arquivo por Nome
Busca o arquivo fisicamente na pasta de armazenamento através do seu nome exclusivo gerado pelo sistema (__filename) e faz a exclusão permanente.

Método HTTP: DELETE
Rota/URL: /arquivo/:filename
Parâmetros necessários: Passado diretamente na URL (Path Parameter)
Exemplo de URL: /arquivo/file-1716225400000-837492000.png

✅ Exemplo de resposta de sucesso (HTTP 200 OK):
JSON
{
  "message": "Arquivo file-1716225400000-837492000.png deletado com sucesso."
}

❌ Exemplo de resposta de erro - Arquivo Não Encontrado (HTTP 404 Not Found):
JSON
{
  "message": "Arquivo não encontrado no servidor.",
  "error": "Not Found",
  "statusCode": 404
}
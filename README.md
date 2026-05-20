# upload
18/05/2026, gerenciador de arquivos
---

## 🛠️ Como o Projeto foi Construído (Passo a Passo da Estrutura)

Caso queira entender a arquitetura ou reconstruir este ecossistema do zero, aqui estão os comandos sequenciais que foram utilizados para a fundação do projeto:

1. **Instalação Global da CLI do NestJS:**
   ```bash
   npm i -g @nestjs/cli

   nest new upload

   cd upload

   Utilizamos o gerador do Nest para criar toda a estrutura (Controller, Service, Module e DTOs) para a entidade arquivo:

   nest g resource arquivo
depois...
   npm run start
Com isso, a API inicial já fica disponível em: http://localhost:3000/

Solução de Problemas (Troubleshooting)
Se o TypeScript reclamar da falta de tipagem para o Multer durante o desenvolvimento do upload, instale os tipos de desenvolvimento executando:

Bash
npm install --save-dev @types/multer

  # 📦 API de Gerenciamento de Arquivos (NestJS)

Esta é uma API REST desenvolvida em NestJS para upload, listagem e remoção de arquivos de imagem no servidor.

## 🚀 Pré-requisitos e Instalação

Siga os passos abaixo para rodar o projeto localmente em ambiente de desenvolvimento:

### Pré-requisitos
* **Node.js** (v16 ou superior)
* **NPM** (instalado junto com o Node)
* Um cliente HTTP (Postman, Insomnia ou a extensão REST Client)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone (https://github.com/swarowskyy/upload)
    
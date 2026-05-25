import { BadRequestException, Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs';

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive';

  constructor() {
    if (!fs.existsSync(this.pastaUpload)) {
      fs.mkdirSync(this.pastaUpload, { recursive: true });
    }
  }
  //retorna os dados do arquivo após o upload
  create(arquivo: Express.Multer.File) {
 //limite de 5 MB
    const limiteMaximo = 5 * 1024 * 1024; // isso faz o computador saber se o arquivo tem 5 MB
    if (arquivo.size > limiteMaximo) {
      // essa parte vai limpar o arquivo temporaria que o multer criou,o chat me sugerio essa parte 
      if (fs.existsSync(arquivo.path)) fs.unlinkSync(arquivo.path);
      
      //essa parte retorna para o cliente o erro 413 de forma explicada
      throw new PayloadTooLargeException('O arquivo enviado excede o limite permitido de 5MB.');
    }

    // forma de arquivo
    const extensoesPermitidas = ['.jpg', '.jpeg', '.png', '.tiff'];
    // pega o nome original e coloca tudo em minuscula
    const ext = arquivo.originalname.substring(arquivo.originalname.lastIndexOf('.')).toLowerCase();

    if (!extensoesPermitidas.includes(ext)) {
      // essa parte limpa qual quer arquivo invalido do disco
      if (fs.existsSync(arquivo.path)) fs.unlinkSync(arquivo.path);
      
      // essa parte retorna para o cliente o erro 400 de forma explicada
      throw new BadRequestException('Formato inválido. Apenas imagens JPG, JPEG, PNG e TIFF são permitidas.');
    }

    return {
      message: 'Arquivo enviado com sucesso!',
      __filename: arquivo.filename,
      originalname: arquivo.originalname,
      size: arquivo.size,
    };
  }


  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);
      const fileList = files.map(
        (__filename) => {
          const stats = fs.statSync(`${this.pastaUpload}/${__filename}`);
          return {
            __filename,
            size: stats.size,
            criado: stats.birthtime,
          };
        }
      );
      return {
        total: fileList.length,
        files: fileList,
      };
    } catch (error) {
      throw new BadRequestException('Não foi possivel listar os arquivos.')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

 remove(nome: string) {
    const caminhoArquivo = `${this.pastaUpload}/${nome}`;

    // aqui verifica se o arquivo realmente existe na pasta './drive'
    if (!fs.existsSync(caminhoArquivo)) {
      // aqui retorna para o cliente caso o arquivo não exista
      throw new NotFoundException(`O arquivo com o nome "${nome}" não foi encontrado.`);
    }

    try {
      // Remove o arquivo fisicamente do armazenamento local
      fs.unlinkSync(caminhoArquivo);
      
      return {
        message: `Arquivo "${nome}" foi removido com sucesso do servidor.`
      };
    } catch (error) {
      throw new BadRequestException('Não foi possível remover o arquivo.');
    }
  }
}
// Adicione o NotFoundException no import do nestjs
import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import * as path from 'path';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs'
// Adicione o NotFoundException no import do nestjs


@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive';

  constructor(){
    if( !fs.existsSync(this.pastaUpload)){
       fs.mkdirSync(this.pastaUpload, {recursive:true});
    }
  }
  create(arquivo:Express.Multer.File) {
    return {
      message:'Arquivo enviado com sucesso',
      __filename:arquivo.filename,
      originalname:arquivo.originalname,
      size:arquivo.size,
    };
  }

  findAll() {
    try {
      const files = fs.readdirSync(this.pastaUpload);
      const fileList = files.map(
        (__filename)=>{
          const stats= fs.statSync(`${this.pastaUpload}/${__filename}`)
          return{
            __filename,
            size:stats.size,
            criado:stats.birthtime,
          }
        }
      );
      return{
        total:fileList.length,
        files: fileList,
      }
    } catch (error) {
      throw new  BadGatewayException('Não foi possível listar os arquivos')
     }
    }
  

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }

  update(id: number, updateArquivoDto: UpdateArquivoDto) {
    return `This action updates a #${id} arquivo`;
  }

 // aqui: Lógica de exclusão física
  remove(filename: string) {
    // Localiza o arquivo na pasta ./drive
    const filePath = path.join(this.pastaUpload, filename);

    // se o arquivo não existir, retorna 404 
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Arquivo não encontrado no servidor.');
    }

    // se existir, deleta do armazenamento
    try {
      fs.unlinkSync(filePath);
      return {
        message: `Arquivo ${filename} deletado com sucesso.`,
      };
    } catch (error) {
      throw new BadGatewayException('Erro ao tentar remover o arquivo do servidor.');
    }
  }
}

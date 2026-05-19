import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs'

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
      )
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

  remove(id: number) {
    return `This action removes a #${id} arquivo`;
  }
}

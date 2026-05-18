import { Injectable } from '@nestjs/common';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import * as fs from 'fs'

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './arquivos';

  constructor(){
    if( !fs.existsSync(this.pastaUpload)){
       fs.mkdirSync(this.pastaUpload, {recursive:true});
    }
  }
  create(createArquivoDto: CreateArquivoDto) {
    return 'This action adds a new arquivo';
  }

  findAll() {
    return `This action returns all arquivo`;
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

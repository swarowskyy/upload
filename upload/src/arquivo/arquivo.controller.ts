// Adicione o BadRequestException junto com os outros que já existem
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadGatewayException, BadRequestException, UploadedFile } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import{diskStorage} from 'multer';
import { File } from 'buffer';
@Controller('arquivo')
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}
@Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Sem diskStorage aqui. O arquivo virá na memória (buffer)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadGatewayException("Não foi possível enviar o arquivo");
    }
    return this.arquivoService.create(file);
  }

  
  @Get()
  findAll() {
    return this.arquivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.arquivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArquivoDto: UpdateArquivoDto) {
    return this.arquivoService.update(+id, updateArquivoDto);
  }

  @Delete(':filename')
  remove(@Param('filename') filename: string) {
    return this.arquivoService.remove(filename);
  }
}

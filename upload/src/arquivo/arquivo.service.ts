// Adicione o NotFoundException no import do nestjs
import { BadGatewayException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';
// ... seus outros imports (dtos, etc)

@Injectable()
export class ArquivoService {
  private readonly pastaUpload = './drive';

  constructor() {
    if (!fs.existsSync(this.pastaUpload)) {
      fs.mkdirSync(this.pastaUpload, { recursive: true });
    }
  }

  create(arquivo: Express.Multer.File) {
    if (!arquivo) {
      throw new BadGatewayException("Não foi possível enviar o arquivo");
    }

    // 1. Validação de Formato (MimeType) - Equivalente ao fileFilter do controller
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/tiff'];
    if (!allowedMimeTypes.includes(arquivo.mimetype)) {
      throw new BadRequestException('Formato inválido. Apenas JPG, PNG e TIFF são permitidos ser colocados.');
    }

    // 2. Validação de Tamanho - Equivalente ao limits do controller (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (arquivo.size > maxSize) {
      throw new BadRequestException('O arquivo excede o limite de tamanho permitido (5MB).');
    }

    // 3. Lógica de geração do nome único do arquivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(arquivo.originalname);
    const finalFilename = `${arquivo.fieldname}-${uniqueSuffix}${ext}`;

    // Define o caminho completo de onde o arquivo será salvo
    const filePath = path.join(this.pastaUpload, finalFilename);

    try {
      // 4. Grava o arquivo fisicamente no disco usando o buffer da memória
      fs.writeFileSync(filePath, arquivo.buffer);

      return {
        message: 'Arquivo enviado com sucesso',
        __filename: finalFilename,
        originalname: arquivo.originalname,
        size: arquivo.size,
      };
    } catch (error) {
      // Caso ocorra algum erro na escrita do arquivo (ex: falta de permissão na pasta)
      throw new BadGatewayException('Erro ao tentar salvar o arquivo no servidor.');
    }
  }

  // ... seus outros métodos (findAll, findOne, update, remove) permanecem iguais

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

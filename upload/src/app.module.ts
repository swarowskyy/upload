import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArquivoModule } from './arquivo/arquivo.module';
import { GaleriaModule } from './galeria/galeria.module';

@Module({
  imports: [ArquivoModule, GaleriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

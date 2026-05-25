import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { Galeria } from './app/app';

bootstrapApplication(Galeria, appConfig)
  .catch((err) => console.error(err));

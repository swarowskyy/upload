import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.model';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css'
})
export class GaleriaComponent implements OnInit {
  // Injeção do serviço usando a sintaxe moderna do Angular (inject)
  private photoService = inject(PhotoService);

  // Estados reativos usando Signals
  photos = signal<Photo[]>([]);
  isLoading = signal<boolean>(false);
  isUploading = signal<boolean>(false);

  // Executado assim que o componente inicializa na tela
  ngOnInit(): void {
    this.loadPhotos();
  }

  // Busca a lista de fotos do backend (GET)
  loadPhotos(): void {
    this.isLoading.set(true);
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao buscar fotos:', err);
        this.isLoading.set(false);
      }
    });
  }

  // Captura o arquivo quando o usuário clica no botão de upload
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.upload(file);
    }
  }

  // Envia o arquivo para o backend (POST) e atualiza a tela na hora
  upload(file: File): void {
    this.isUploading.set(true);
    
    this.photoService.uploadPhoto(file).subscribe({
      next: (newPhoto) => {
        // Reatividade: Adiciona a nova foto no array sem precisar dar F5
        this.photos.update(currentPhotos => [...currentPhotos, newPhoto]);
        this.isUploading.set(false);
      },
      error: (err) => {
        console.error('Erro ao fazer upload:', err);
        this.isUploading.set(false);
      }
    });
  }
}
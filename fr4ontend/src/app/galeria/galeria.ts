import { Component, inject, signal, OnInit } from '@angular/core';
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
  private photoService = inject(PhotoService);

  photos = signal<Photo[]>([]);
  isLoading = signal<boolean>(false);
  isUploading = signal<boolean>(false);

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.isLoading.set(true);
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar imagens', err);
        this.isLoading.set(false);
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.upload(file);
    }
  }

  upload(file: File) {
    this.isUploading.set(true);
    this.photoService.uploadPhoto(file).subscribe({
      next: (newPhoto) => {
        this.photos.update(currentPhotos => [...currentPhotos, newPhoto]);
        this.isUploading.set(false);
      },
      error: (err) => {
        console.error('Erro no upload', err);
        this.isUploading.set(false);
      }
    });
  }
}
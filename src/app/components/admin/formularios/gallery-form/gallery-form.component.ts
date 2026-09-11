import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gallery } from '../../../../models/gallery';
import { Photo } from '../../../../models/photo';
import { GalleryService } from '../../../../services/gallery.service';
import { PhotoService } from '../../../../services/photo.service';


@Component({
  selector: 'app-gallery-create',
  templateUrl: './gallery-create.component.html'
})
export class GalleryCreateComponent implements OnInit {

  step: 'gallery' | 'photos' = 'gallery';

  galleryForm!: FormGroup;
  photoForm!: FormGroup;

  gallery?: Gallery;
  photos: Photo[] = [];

  selectedFile?: File;
  previewUrl?: string;

  loadingGallery = false;
  errorGallery = false;

  loadingPhoto = false;
  errorPhoto = false;

  constructor(private fb: FormBuilder,private galleryService: GalleryService,private photoService: PhotoService) {
  }

  ngOnInit(): void {
      this.galleryForm = this.fb.group({
      title: ['', Validators.required],
      publicationDate: ['', Validators.required]
    });

    this.photoForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  // ---- Paso 1: crear la Galeria ----
  onSubmitGallery(): void {
    if (this.galleryForm.invalid) return;

    this.loadingGallery = true;
    this.errorGallery = false;

    this.galleryService.createGallery(this.galleryForm.value).subscribe({
      next: (data) => {
        console.log('Galería creada:', data);
        this.gallery = data;
        this.loadingGallery = false;
        this.step = 'photos'; // pasamos al paso 2
      },
      error: (err) => {
        console.error('Error al crear la galería', err);
        this.errorGallery = true;
        this.loadingGallery = false;
      }
    });
  }

  // ---- Paso 2: agregar fotos ----
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmitPhoto(): void {
    if (this.photoForm.invalid || !this.selectedFile || !this.gallery) return;

    this.loadingPhoto = true;
    this.errorPhoto = false;

    const formData = new FormData();
    formData.append('description', this.photoForm.value.description);
    formData.append('image', this.selectedFile); // el backend sube esto a Cloudinary

    this.photoService.addPhotoToGallery(this.gallery.idGallery, formData).subscribe({
      next: (data) => {
        console.log('Foto agregada:', data);
        this.photos.push(photo);
        this.photoForm.reset();
        this.selectedFile = undefined;
        this.previewUrl = undefined;
        this.loadingPhoto = false;
      },
      error: (err) => {
        console.error('Error al subir la foto', err);
        this.errorPhoto = true;
        this.loadingPhoto = false;
      }
    });
  }
}

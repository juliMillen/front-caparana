import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gallery } from '../../../../models/gallery';
import { Photo } from '../../../../models/photo';
import { GalleryService } from '../../../../services/gallery.service';
import { PhotoService } from '../../../../services/photo.service';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from '../photo-form/photo-form.component';


@Component({
  selector: 'app-gallery-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PhotoFormComponent],
  templateUrl: './gallery-form.component.html',
  styleUrl: './gallery-form.component.css'
})
export class GalleryFormComponent implements OnInit {

  galleryForm!:FormGroup;
  photos: Photo[] = [];
  createdGallery: Gallery | null = null;
  showPhotoModal = false;

  @Output() galleryCreated = new EventEmitter<Gallery>();
  @Output() closedModal = new EventEmitter<void>();

  
  constructor(private fb: FormBuilder,private galleryService: GalleryService,private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.galleryForm = this.fb.group({
      title:['',Validators.required],
      publicationDate:['',Validators.required]
    });
  }

  createGallery():void{
    if(this.galleryForm.invalid){
      this.galleryForm.markAllAsTouched();
      return;
    }

    const gallery:Gallery = {
      idGallery: 0,
      title:this.galleryForm.value.title,
      publicationDate:this.galleryForm.value.publicationDate,
      photosDTO:[]
    };
    this.galleryService.createGallery(gallery).subscribe({
      next:(data) => {
        this.createdGallery = data;
        console.log('Galeria creada: ',data);
      },
      error:(err) => {
        console.error('Error al crear la galeria',err);
      }
    });
  }

  addPhoto(data:{photo:Photo,file:File | null}):void{
    if(!this.createdGallery) return;
    const formData = new FormData;
    formData.append('description',data.photo.description);
    
    if(data.file){
      formData.append('image',data.file);
    }
    this.photoService.addPhotoGallery(this.createdGallery.idGallery,formData).subscribe({
      next:(data) => {
        this.photos.push(data);
        console.log('Foto agregada: ',data);
        this.showPhotoModal = false;
      },
      error:(err) => {
        console.error('Error al agregar foto',err);
      }
    });
  }

  openPhotoModal():void{
    this.showPhotoModal = true;
  }

  closePhotoModal():void{
    this.showPhotoModal=false;
  }

  finish():void{
    if(this.createdGallery){
      this.createdGallery.photosDTO = this.photos;
      this.galleryCreated.emit(this.createdGallery);
    }
    this.closeModal();
  }

  closeModal():void{
    this.galleryForm.reset();
    this.photos = [];
    this.createdGallery = null;
    this.closedModal.emit();
  }
}

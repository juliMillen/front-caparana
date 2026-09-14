import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gallery } from '../../../../models/gallery';
import { Photo } from '../../../../models/photo';
import { GalleryService } from '../../../../services/gallery.service';
import { PhotoService } from '../../../../services/photo.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-gallery-form',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
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
    
  }

  createGallery():void{

  }

  openPhotoModal():void{
    this.showPhotoModal = true;
  }

  closePhotoModal():void{
    this.showPhotoModal=false;
  }

  finish():void{
    if(this.createdGallery){
      this.createdGallery.photos = this.photos;
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

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GalleryFormComponent } from '../formularios/gallery-form/gallery-form.component';
import { Gallery } from '../../../models/gallery';
import { GalleryService } from '../../../services/gallery.service';

@Component({
  selector: 'app-gallery-admin',
  imports: [CommonModule,GalleryFormComponent],
  templateUrl: './gallery-admin.component.html',
  styleUrl: './gallery-admin.component.css'
})
export class GalleryAdminComponent implements OnInit{
  galleries: Gallery[] = [];
  showModal:boolean = false;

  constructor(private galleryService:GalleryService){}

  ngOnInit(): void {
    this.galleryService.getGalleries().subscribe({
      next:(data) => {
        this.galleries = data;
        console.log('Galeria cargada: ',data);
      },
      error:(err)=>{
        console.error('Error al cargar galerias',err);
      }
    });
  }

  openModal():void{
    this.showModal = true;
  }

  closedModal():void{
    this.showModal=false;
  }

  deleteGallery(idGallery:number):void{
    this.galleryService.deleteGallery(idGallery).subscribe({
      next:() => {
        this.galleries = this.galleries.filter(e => e.idGallery !== idGallery);
      },
      error:(err) =>{
        console.error('Error al eliminar galeria',err);
      }
    });
  }
  

}

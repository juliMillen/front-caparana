import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../models/gallery';
import { GalleryService } from '../../services/gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{
  gallery!: Gallery;

  constructor(private galleryService:GalleryService){

  }

  ngOnInit(): void {
    this.getGallery()
  }

  getGallery():void {
    this.galleryService.getGalleryById(1).subscribe({
      next:(data) => {
        this.gallery = data;
      },
      error: (err) => {
        console.log("Error al cargar galeria");
      }
  });
 }

}

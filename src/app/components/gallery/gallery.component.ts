

import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gallery } from '../../models/gallery';
import { GalleryService } from '../../services/gallery.service';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit{
  galleries: Gallery[] = [];


  @ViewChild('carouselRef') carouselRef!:ElementRef;

  constructor(private galleryService:GalleryService){

  }

  ngOnInit(): void {
    this.getGallery()
  }

  getGallery():void {
    this.galleryService.getGalleries().subscribe({
      next:(data) => {
        this.galleries = data;
      },
      error: (err) => {
        console.log('Error al cargar galerias',err);
      }
  });
 }


}

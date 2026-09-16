import { Component, ElementRef, ViewChild } from '@angular/core';
import { Gallery } from '../../models/gallery';
import { GalleryService } from '../../services/gallery.service';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-gallery-carousel',
  imports: [CommonModule],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.css'
})
export class GalleryCarouselComponent {
   galleries: Gallery[] = [];
  gallery: Gallery | null = null;
  private carouselInitialized = false;

  @ViewChild('carouselRef') carouselRef!: ElementRef;

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.getGallery();
  }

  getGallery(): void {
    this.galleryService.getGalleries().subscribe({
      next: (data) => {
        this.galleries = data;
        if (data.length > 0) {
          const sorted = [...data].sort((a,b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
          this.gallery = sorted[0]; //toma la galeria mas reciente.
        }
      },
      error: (err) => {
        console.log('Error al cargar galeria', err);
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.carouselRef && !this.carouselInitialized) {
      this.initCarousel();
      this.carouselInitialized = true;
    }
  }

  initCarousel(): void {
    new bootstrap.Carousel(this.carouselRef.nativeElement, {
      interval: 5000,
      ride: 'carousel'
    });
  }
}


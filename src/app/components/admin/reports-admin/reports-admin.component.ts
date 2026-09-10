import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Report } from '../../../models/report';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './reports-admin.component.html',
  styleUrl: './reports-admin.component.css'
})
export class ReportsAdminComponent implements OnInit{

  reports: Report[] = [];
  filteredReports: Report[] = [];

  searchId: number | null = null;
  searchTitle: string = '';

  showModal: boolean = false;


  constructor(private reportService: ReportService) {}


  ngOnInit(): void {
    this.getReports()
  }

  getReports():void{
    this.reportService.getReports().subscribe({
      next:(data) => {
        this.reports = data;
        this.filteredReports=data;
      },
      error:(err) => {
        console.error('Error al obtener noticias',err);
      }
    });
  }

  filterReports():void{
    this.filteredReports = this.reports.filter(report =>{
      const matchesId = this.searchId === null || report.idReport === this.searchId;
      const matchesTitle = this.searchTitle.trim() === '' || report.title.toLowerCase().includes(this.searchTitle.toLowerCase());

      return matchesId && matchesTitle;
    })
  }

  openModal():void{
    this.showModal = true;
  }

  openEditModal():void{
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  createReport(report:Report):void{
    this.reportService.createReport(report).subscribe({
      next:(data) => {
        this.reports.push(data);
        console.log('Noticia creada: ',data);
      },
      error:(err) =>{
        console.error('Error al crear la noticia',err)
      }
    });
  }

  updateReport(report:Report):void{
    this.reportService.updateReport(report.idReport,report).subscribe({
      next:(data) => {
        this.reports.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error('Error al editar noticia',err);
      }
    });
  }

  deleteReport(idReport:number):void{
    this.reportService.deleteReport(idReport).subscribe({
      next:() => {
        this.reports = this.reports.filter(e => e.idReport !== idReport);
      },
      error:(err) => {
        console.error('Error al eliminar noticia',err);
      }
    })
  }


  

}

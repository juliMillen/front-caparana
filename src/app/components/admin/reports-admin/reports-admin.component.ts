import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { Report } from '../../../models/report';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportFormComponent } from '../formularios/report-form/report-form.component';

@Component({
  selector: 'app-reports-admin',
  imports: [CommonModule, FormsModule, ReportFormComponent],
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

  createReport(data:{report:Report, file:File | null}):void{
    const formData = new FormData();
    formData.append('title',data.report.title);
    formData.append('description',data.report.description);
    formData.append('publicationDate',data.report.publicationDate);
    if(data.file){
      formData.append('image',data.file);
    }

    this.reportService.createReport(formData).subscribe({
      next:(data) => {
        this.reports.push(data);
        this.showModal = false;
      },
      error:(err) => {
        console.error('Error al crear noticia',err);
      }
    })
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

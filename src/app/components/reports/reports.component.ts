import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [CommonModule,RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent  implements OnInit{

  reports: Report[] = [];

  constructor(private reportsService:ReportService){

  }

  ngOnInit(): void {
    this.getReports()
  }

  getReports():void{
    this.reportsService.getReports().subscribe({
      next: (data) =>{
        this.reports = data;
      },
      error: (err) => {
        console.log("Error al obtener las noticias",err)
      }
    })
  }

}

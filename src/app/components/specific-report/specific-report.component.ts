import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
@Component({
  selector: 'app-specific-report',
  imports: [CommonModule],
  templateUrl: './specific-report.component.html',
  styleUrl: './specific-report.component.css'
})
export class SpecificReportComponent implements OnInit {
  report?: Report;
  loading = true;
  error = false;

  constructor(private route:ActivatedRoute, private reportsService:ReportService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idReport = params.get('idReport');
      const idNum = Number(idReport)
      if(idReport && !isNaN(idNum)){
        this.getReport(idNum);
      }
    });
  }

  getReport(idReport:number):void{
    this.loading = true;
    this.reportsService.getReportyById(idReport).subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
      },
      error:(err)=>{
        console.error('Error al obtener la noticia',err);
        this.error = true;
        this.loading = false;
      }
    })
  }
}

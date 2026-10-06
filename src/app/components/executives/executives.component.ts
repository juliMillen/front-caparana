import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Executive } from '../../models/executive';
import { ExecutiveService } from '../../services/executive.service';

@Component({
  selector: 'app-executives',
  imports: [CommonModule],
  templateUrl: './executives.component.html',
  styleUrl: './executives.component.css'
})
export class ExecutivesComponent implements OnInit {
 executives: Executive[] = [];

 positions: string[] = [
  'President',
  'VicePresident',
  'SecretaryGeneral',
  'ProSecretary',
  'Treasurer'
 ]

 private singularLabels:Record<string,string> = {
  President:'Presidente',
  VicePresident:'VicePresidente',
  SecretaryGeneral:'Secretario/a General',
  ProSecretary:'Pro Secretario/a',
  Treasurer:'Tesorero/a'
 }

 constructor(private executiveService: ExecutiveService){

 }

 ngOnInit(): void {
   this.getExecutives();
 }

 getSingularLabel(position:string):string{
  return this.singularLabels[position] ?? position;
 }

 getExecutives():void{
  this.executiveService.getExecutives().subscribe({
    next:(data) => {
      this.executives = [...data].sort(
        (a,b) => this.positions.indexOf(a.position) - this.positions.indexOf(b.position)
      );
    },
    error: (err) =>{
      console.error('Error al obtener ejecutivos',err);
    }
  })
 }


}

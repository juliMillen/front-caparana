import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StaffFormComponent } from '../formularios/staff-form/staff-form.component';
import { Staff } from '../../../models/staff';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff-admin',
  imports: [CommonModule,FormsModule,StaffFormComponent],
  templateUrl: './staff-admin.component.html',
  styleUrl: './staff-admin.component.css'
})
export class StaffAdminComponent implements OnInit {
  staff: Staff[] = [];
  filteredStaff: Staff[] = [];
  searchId: number | null = null;
  searchSurname: string = '';
  searchName: string = '';

  selectedStaff: Staff | null = null;

  showModal:boolean = false;

  constructor(private staffService:StaffService){}

  ngOnInit(): void {
    this.getStaff();
  }

  openEditModal(staff:Staff):void{
    this.selectedStaff = staff;
    this.showModal = true;
  }

  closeModal():void{
    this.showModal = false;
  }

  getStaff():void{
    this.staffService.getStaff().subscribe({
      next:(data)=>{
        this.staff = data;
        this.filteredStaff = data;
      },
      error:(err) => {
        console.error('Error al cargar empleados del staff tecnico',err);
      }
    })
  }

  filterStaff():void{
    this.filteredStaff = this.staff.filter(staff =>{
      const matchesId = this.searchId === null || staff.idStaff === this.searchId;
      const matchesName = this.searchName.trim() === '' || staff.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesSurname = this.searchSurname.trim() === '' || staff.surname.toLowerCase().includes(this.searchSurname.toLowerCase());
      return matchesId && matchesName && matchesSurname;
    })
  }

  updateStaff(data:{staff:Staff, file: File | null}):void{
    this.staffService.updateStaff(data.staff.idStaff,this.buildFormData(data)).subscribe({
      next:(updated) =>{
        this.staff = this.staff.map(
          e => e.idStaff === updated.idStaff ? updated : e
        );
      },
      error:(err) =>{
        console.error('Error al actualizar empleado del staff tecnico',err);
      }
    })
  }


  private buildFormData(data:{staff:Staff, file: File | null}){ 
    const formData = new FormData();
    formData.append('name',data.staff.name);
    formData.append('surname',data.staff.surname);
    formData.append('position',data.staff.position);
    if(data.file){
      formData.append('image',data.file);
    }
    return formData;
  }

  deleteStaff(idStaff:number):void{
    this.staffService.deleteStaff(idStaff).subscribe({
      next:() => {
        this.staff = this.staff.filter(
          e=> e.idStaff !== idStaff
        )
      },
      error:(err) =>{
        console.error('Error al eliminar miembro del staff',err);
      }
    })
  }
}

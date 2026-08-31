import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loggin',
  imports: [CommonModule,FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './loggin.component.html',
  styleUrl: './loggin.component.css'
})
export class LogginComponent implements OnInit{

  login = {
    username: '',
    password: ''
  };

  //Mensaje de error
  errorMessage: string = ''
  loading: boolean = false;


  loginForm!:FormGroup;

  private fb= inject(FormBuilder);

  constructor(private router:Router, private authService:AuthService){}


ngOnInit(): void {
    this.formLoginReac();
}

formLoginReac(){
  this.loginForm = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })
}

  onLogin() {
     if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.loading=true;
    this.errorMessage='';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.guardarToken(response.token);
        this.router.navigate(["/admin/dashboard"])
      },
      error: (err) =>{
        this.loading = false;
        
        console.error('Error de login',err);
        console.log('Status: ',err.Status);
        console.log('URL: ',err.URL);
        console.log("Error: ",err.error);

        this.errorMessage= `Error ${err.Status}`;
      }
    });
  }
}

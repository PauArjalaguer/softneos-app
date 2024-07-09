import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router:Router) { }
  loginForm: FormGroup = new FormGroup({
    usermail: new FormControl('', [Validators.required, Validators.email]),
    userpassword: new FormControl('', Validators.required),

  })
  ngOnInit():void{
    if(sessionStorage.getItem('username')){
      this.router.navigate(['']);
    }
  }
  hasError(field: string): boolean {
    const errorsObject = this.loginForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (errors.length && (this.loginForm.get(field)?.touched || this.loginForm.get(field)?.dirty)) {
      return true
    }
    return false;
  }
  getCurrentError(field: string): string {
    const errorsObject = this.loginForm.get(field)?.errors ?? {};
    const errors = Object.keys(errorsObject);
    if (!errors) {
      return ''
    }
    return errors[0];
  }
  login() {
    this.loginService.getLogin(this.loginForm.value).subscribe(login => {
      sessionStorage.setItem('usermail', login.email);
      sessionStorage.setItem('username', login.name);
      if (login.role_id != 0) { sessionStorage.setItem('role_id', login.role_id); }
      location.reload();
    },error => alert("Error"))
  }
}

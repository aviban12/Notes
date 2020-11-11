import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationForm } from './register.modal';
import { RegisterationService } from './registeration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterModal = new RegistrationForm();
  constructor(private registerService: RegisterationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    if(this.RegisterModal.name && this.RegisterModal.email && this.RegisterModal.password){
    this.registerService.registerUser(this.RegisterModal)
                        .then(res => {
                          if (res.id){
                            this.router.navigate(['./login']);
                          }
                        });
    } else{
     alert('Please enter Details properly');
   }
  }

  openLogin(){
    this.router.navigate(['./login']);
  }

}

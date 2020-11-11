import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from './verification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;
  constructor(private verificationService: VerificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  LoginUser(){
    console.log(this.email, this.password);
    const adminId = 'rthfh234gbgdf';
    if (this.email === 'admin@123' && this.password === 'admin'){
      this.router.navigate(['./home', adminId, 0]);
    }
    else{
      if(this.email && this.password){
    this.verificationService.verifyUser(this.email, this.password).subscribe(res => {
      if (res.id){
        this.router.navigate(['./home', res.id, 1]);
      }
    });
  }else{
    alert('Enter Correct Credentials');
  }
}
}


  openRegister(){
    this.router.navigate(['./register']);
  }
}

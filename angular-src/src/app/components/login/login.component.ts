import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // getting inputs
  email: String;
  password: String;


  constructor(private vs:ValidationService,
    private ngFMS:NgFlashMessageService,
    private router: Router,private auth:AuthService) { }

  ngOnInit() {
  }
  loginFormSubmit(){
    let user = {
      email: this.email,
      password: this.password
    }
    if(!this.vs.validateLogin(user)){
      this.ngFMS.showFlashMessage({
        messages : ["Please fill all fields!"],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }
    if(this.vs.validateEmail(user.email)){
      this.auth.authenticate(user).subscribe((data:any) =>{
          if(data.success){
            this.auth.storeUserData(data.token, data.user);
            this.ngFMS.showFlashMessage({
              messages : ['Welcome '+data.user.name],
              timeout: 3000,
              type: 'success'
            });
            this.router.navigate(['dashboard']);
          }else{
            this.ngFMS.showFlashMessage({
              messages : [data.message],
              timeout: 3000,
              type: 'danger'
            });
            this.router.navigate(['login']);
            return false;
          }
      });
      
    } else{
      this.ngFMS.showFlashMessage({
        messages : ["please use a valid email address"],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  password: String;
  constructor(private vs: ValidationService,
    private auth:AuthService,
    private ngFMS: NgFlashMessageService,
    private router:Router) { 
  }

  ngOnInit() {
  }
  registerFormSubmit(){
    let user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // check for all fields
    if(!this.vs.validateRegister(user)){
      this.ngFMS.showFlashMessage({
        messages : ["Please fill all fields!"],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }

    // check for email
    if(this.vs.validateEmail(this.email)){
      this.auth.register(user)
      .subscribe( (data:any) =>{
        if(data.success){
          this.ngFMS.showFlashMessage({
            messages : ['user registered successfully! you can login now'],
            dismissible: true,
            timeout: 3000,
            type: 'success'
          });
          console.log(data);
          this.router.navigate(['/login']);
          return true;
        }else{
          this.ngFMS.showFlashMessage({
            messages : ['Something went wrong! '+ data.message],
            dismissible: true,
            timeout: 3000,
            type: 'danger'
          });
          this.router.navigate(['/register']);
          return false;
        }
          
      },(err)=>{
        console.log(err)
        this.ngFMS.showFlashMessage({
          messages : ['Error happened!'],
          dismissible: true,
          timeout: 3000,
          type: 'danger'
        });
        this.router.navigate(['/register']);
        return false;
      }
      );
    } else{ // print error message if error exists which is email not valid
      this.ngFMS.showFlashMessage({
        messages : ['please use a valid email address'],
        timeout: 3000,
        type: 'danger'
      });
      return false;
    }
  }


}

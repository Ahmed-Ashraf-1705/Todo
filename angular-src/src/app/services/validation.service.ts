import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  validateRegister(user){
    if(user.email == undefined || user.name == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateLogin(user){
    if(user.email == undefined || user.password == undefined){
      return false;
    }else{
      return true;
    }
  }

  validateEmail(email){
// tslint:disable-next-line: max-line-length
    // /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    // alternate /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i
// tslint:disable-next-line: max-line-length

    // regix not working
    if(email == '' || email.indexOf('@') == -1 || email.indexOf('.') == -1){
      return false;
    }else{
      return true;
    }
    }
}

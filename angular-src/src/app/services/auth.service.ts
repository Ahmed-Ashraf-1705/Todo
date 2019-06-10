import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userdata and auth token
  authToken:any;
  user:any;
  constructor(private http: HttpClient) { }

  // registration methond to submit data to nodejs api (backend)
  register(user){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/register', user, { headers : headers } );
  }

  authenticate(user){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/authenticate', user, { headers : headers } );
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getUserById(_id){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/getbyid',_id,{headers:headers})
  }
  getProfile(){
    this.loadToken()
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    headers.set('Authorization', this.authToken);
    return this.http.get('users/profile', {headers:headers} );
  }

  loggedIn(){
    if(localStorage.length == 2){
      return true;
    }else{
      return false;
    }
  }
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // add todo
  addTodo(data:any){
    let todo = {
      email : data.email,
      todo : data.todo
    }
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/newtodo',todo, { headers : headers } );
  }

  // list todos
  listTodos(_id){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/listtodos',_id, { headers : headers } );
  }

  // edit todo
  editTodo(id,todo){
    let headers = new HttpHeaders();
    headers.set('Content-Type','application/json');
    return this.http.post('users/edittodo',{_id:id,todo:todo}, { headers : headers } );
  }
  
}

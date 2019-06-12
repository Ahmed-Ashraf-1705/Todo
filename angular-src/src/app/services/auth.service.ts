import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpRequest , HttpResponse} from '@angular/common/http';
import { map } from 'rxjs-compat/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // userdata and auth token
  authToken:any;
  user:any;
  constructor(private http: HttpClient) { }
  // for localhost
  //serverURL = 'http://localhost:3000/'
  serverURL = '';
  // registration methond to submit data to nodejs api (backend)
  register(user){
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/register', user, { headers : headers } );
  }

  authenticate(user){
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/authenticate', user, { headers : headers } );
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  getUserById(_id){
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/getbyid',_id,{headers:headers})
  }
  getProfile(){
    this.loadToken()
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('Authorization', this.authToken);
    return this.http.get(this.serverURL+'users/profile', {headers:headers} )
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
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/newtodo',todo, { headers : headers } );
  }
  updateStatus(todo,userId){
    let task = {
      userID: userId,
      _id : todo._id,
      todo : todo
    }
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/edittodo', task, { headers : headers } );
  }

  // list todos
  listTodos(_id){
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/listtodos',_id, { headers : headers } );
  }

  // edit todo
  editTodo(id,todo){
    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return this.http.post(this.serverURL+'users/edittodo',{_id:id,todo:todo}, { headers : headers } );
  }
  
}

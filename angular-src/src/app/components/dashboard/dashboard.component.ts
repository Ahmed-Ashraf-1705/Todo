import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private ngFMS: NgFlashMessageService, private router: Router ) { }

  ngOnInit() {
    this.todos = this.auth.user.todos;
  }
  todos = [];
  email:Object = this.auth.user.email;
  todo = {
    completed:false,
    title : null
  };

  todoSubmit(){
    
    let data:any = {
      email : this.email,
      todo: this.todo
    }
    if ((data.todo.title == null || data.todo.title == '')){
      this.ngFMS.showFlashMessage({
        messages:["cannot add empty todo"],
        timeout: 3000,
        type: 'danger'
      });

    }else{
      if(data.todo == []){
        this.ngFMS.showFlashMessage({
          messages:["cannot add empty todo!"],
          timeout: 3000,
          type: 'danger'
        });
      } else{
      this.auth.addTodo(data).subscribe((res:any)=>{
        if(res.success){
          this.ngFMS.showFlashMessage({
            messages:[res.message],
            timeout: 3000,
            type: 'success'
          });
          this.auth.getProfile().subscribe( (data:any)=>{ this.auth.user.todos = data.user.todos;this.todos = this.auth.user.todos;});
          this.todo.title = null;
          this.todo.completed = false;
          
        }else{
          this.ngFMS.showFlashMessage({
            messages:[res.message],
            timeout: 3000,
            type: 'danger'
          });
        }
      },(err)=>{
        this.ngFMS.showFlashMessage({
          messages:[err],
          timeout: 3000,
          type: 'danger'
        });
      });
    }
    }
  }

  updateTaskStatus(item){

    let todo = {
      title : item.title,
      completed : !item.completed,
      _id : item._id
    }
    //console.log(todo)
    this.auth.updateStatus(todo,this.auth.user._id).subscribe( res =>{
      this.auth.getProfile().subscribe( (data:any)=>{ this.auth.user.todos = data.user.todos;this.todos = this.auth.user.todos;});
    });
  }


}

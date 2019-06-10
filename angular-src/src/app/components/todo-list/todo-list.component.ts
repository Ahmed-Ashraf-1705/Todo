import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos:any = this.auth.user.todos;
  constructor(private auth:AuthService,private ngFMS:NgFlashMessageService) { }

  ngOnInit() {}

  refresh(){
    let user:any = localStorage.getItem('user');
    this.auth.getUserById(user._id).subscribe( (data:any)=>{
      console.log(data)
      this.todos = data.message;
    },(err)=>{
      console.log(err)
    });
  }
  todoSubmit(_id,todo){
    this.auth.editTodo(_id,todo).subscribe((res:any)=>{
      if(res.success){
        this.ngFMS.showFlashMessage({
          messages:['Successfuly updated todo'],
          type:'success',
          timeout:3000
        });
        return true;
      }else{
        this.ngFMS.showFlashMessage({
          messages:['failed to update todo'],
          type:'danger',
          timeout:3000
        });
        return false;
      }
    })
  }



}

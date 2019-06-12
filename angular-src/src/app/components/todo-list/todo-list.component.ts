import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos;
  btnText = 'Edit';
  constructor(private auth:AuthService,private ngFMS:NgFlashMessageService) { }

  ngOnInit() {
     this.todos = this.auth.user.todos;
  }

  refreshList(){
    this.auth.getProfile().subscribe( (data:any)=>{
;      this.todos = data.user.todos;
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
  Submit(){
    if(this.btnText == 'Edit'){
      this.btnText = 'Save';
    }else{
      this.btnText = 'Edit';
    }
  }



}
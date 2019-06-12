import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  
  constructor(private auth:AuthService,private ngFMS:NgFlashMessageService, private router:Router) { }
  email:Object = this.auth.user.email;
  todo:Object = {
    completed:false,
    title : null
  };
  ngOnInit() {
  }
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
          this.router.navigate(['/dashboard'])
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

}

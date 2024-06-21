import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  todoForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: TodoService,
    private _dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.todoForm = this._fb.group({
      title: '',
    });
  }

  ngOnInit(): void {
    this.todoForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.todoForm.valid) {
      if (this.data) {
        this._empService
          .updateTodo(this.data.id, this.todoForm.value)
          .subscribe({
            next: (val: any) => {
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addTodo(this.todoForm.value).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}

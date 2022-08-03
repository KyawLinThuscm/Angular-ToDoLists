import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-tasks',
  templateUrl: './create-tasks.component.html',
  styleUrls: ['./create-tasks.component.scss']
})
export class CreateTasksComponent implements OnInit {
  statuss = [
    { viewValue: 'New' },
    { viewValue: 'Progress' },
    { viewValue: 'Done' },
  ];

  empForm!: FormGroup;
  pickDate: any;
  payload: Array<object> = [];
  data = {};
  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);

    if (event.previousContainer === event.container) {
      // change the items index if it was moved within the same list
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex

      );
    } else {
      // remove item from the previous list and add it to the new array
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

  }


  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {

    this.empForm = this.fb.group({
      id: Math.floor(Math.random() * 100),
      name: '',
      movies: this.fb.array([]),
    });
  }

    get movies(): FormArray {
      return this.empForm.get("movies") as FormArray
    }

    newMovie(): FormGroup {
      return this.fb.group({
        task: '',
        startdate: '',
        enddate: '',
        status: '',
      })
    }

  ngOnInit(): void {
  }

  add() {
    this.movies.push(this.newMovie());
  }

  remove(i: number) {
    this.movies.removeAt(i);
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onSubmit() {
    this.payload.push(this.empForm.value)
    localStorage.setItem("Data", JSON.stringify(this.payload));
    console.log(this.empForm.value);
    this.router.navigate([""]);
  }
}

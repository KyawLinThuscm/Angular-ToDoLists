import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { dateRangeValidator } from 'src/app/custom-validators/dateValidator.validator';
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
  id: number = Math.floor(Math.random() * 100)
  mid: number = Math.floor(Math.random() * 10000)
  public console = console;

  constructor(
    public router: Router,
    public fb: FormBuilder
  ) {

    this.empForm = this.fb.group({
      id: this.id,
      name: ['', Validators.required],
      movies: this.fb.array([this.newMovie()],[Validators.required]),
      created_at: new Date()
    });

  }

  get movies(): FormArray {
    return this.empForm.get("movies") as FormArray
  }

  newMovie(): FormGroup {
    return this.fb.group({
      task:  ['', Validators.required],
      startdate:  ['', Validators.required],
      enddate:  ['', [Validators.required, dateRangeValidator]],
      status: ['', Validators.required],
    },
    {
      validator: dateRangeValidator('startdate', 'enddate')
    }
    )
  }



  drop(event: CdkDragDrop<string[]>) {
    console.log('drag drop')
    const formArr = this.empForm.get('movies') as FormArray;
    const from = event.previousIndex;
    const to = event.currentIndex;
    this.moveItemInFormArray(formArr, from, to)
  }
  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const from = this.clamp(fromIndex, formArray.length - 1);
    const to = this.clamp(toIndex, formArray.length - 1);

    if (from === to) {
      return;
    }

    const previous = formArray.at(from);
    const current = formArray.at(to);
    formArray.setControl(to, previous);
    formArray.setControl(from, current);
  }

  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

  ngOnInit(): void {
  }

  add() {
    // console.log(this.movies.value)
    this.movies.push(this.newMovie());
    console.log(this.movies.value)
  }

  remove(i: number) {
    this.movies.removeAt(i);
  }

  OnDateChange(event: any) {
    this.pickDate = event;
  }

  onSubmit() {
    let array = JSON.parse(localStorage.getItem('Data') || '[]');
    array.push(this.empForm.value);
    this.payload.push(this.empForm.value);
    localStorage.setItem("Data", JSON.stringify(array));
    this.router.navigate([""]);
  }
}

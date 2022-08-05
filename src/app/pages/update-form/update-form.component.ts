import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {

  statuss = [
    { viewValue: 'New' },
    { viewValue: 'Progress' },
    { viewValue: 'Done' },
  ];

  empForm!: FormGroup;
  pickDate: any;
  payload: Array<object> = [];
  data: any;
  employeelist = [];
  empArr: Array<object> = [];
  empIndex: any;
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
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.empForm = this.fb.group({
      id: '',
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
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '[]');
    this.data = this.employeelist.find(elist => elist['id'] == id)
    this.data.movies.map((result: any) => {
      const mvForm = this.fb.group({
        task: result.task,
        startdate: result.startdate,
        enddate: result.enddate,
        status: result.status
      });
      this.movies.push(mvForm);
    })
    this.empForm.patchValue({
      name: this.data.name,
      id: this.data.id
    });
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
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '[]');
    this.data = this.employeelist.find(elist => elist['id'] == id);
    const update = this.employeelist.findIndex(a => a['id'] === this.data.id);
    this.empIndex = this.employeelist[update];
    this.empIndex.name = this.empForm.value.name
    this.empIndex.movies.splice(0, this.empIndex.movies.length)
    this.empForm.value.movies.map((res: any) => {
      let emForm = {
        task: res.task,
        startdate: res.startdate,
        enddate: res.enddate,
        status: res.status
      }
      this.empIndex.movies.push(emForm);
    })
    localStorage.setItem("Data", JSON.stringify(this.employeelist));
    let array = JSON.parse(localStorage.getItem('Data') || '[]');
    this.empIndex = array[update]
    this.location.back();
  }
}


import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { dateRangeValidator } from 'src/app/custom-validators/dateValidator.validator';
import * as moment from 'moment';

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

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.empForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      movies: this.fb.array([],[Validators.required]),
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

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '[]');
    this.data = this.employeelist.find(elist => elist['id'] == id)
    this.data.movies.map((result: any) => {
      const mvForm = this.fb.group({
        task: [ result.task, Validators.required],
        startdate: [ result.startdate,Validators.required ],
        enddate: [ result.enddate, [Validators.required, dateRangeValidator]],
        status: [ result.status, Validators.required]
      },
      {
        validator: dateRangeValidator('startdate', 'enddate')
      }
      );
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
        startdate: moment(res.startdate).format('YYYY/MM/DD'),
        enddate: moment(res.enddate).format('YYYY/MM/DD'),
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


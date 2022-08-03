import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';


const ELEMENT_DATA = [
  {task: 'Task 1', startdate: '8/2/2022', enddate: '8/2/2022', status: 'New'},
  {task: 'Task 2', startdate: '8/2/2022', enddate: '8/2/2022', status: 'Progress'},
  {task: 'Task 3', startdate: '8/2/2022', enddate: '8/2/2022', status: 'Done'},
  {task: 'Task 4', startdate: '8/2/2022', enddate: '8/2/2022', status: 'New'},
  {task: 'Task 5', startdate: '8/2/2022', enddate: '8/2/2022', status: 'New'},
];

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  public dataSource = new MatTableDataSource<any>();
  employeelist = [];
  empArr: Array<object>= [];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id: string = this.activatedRoute.snapshot.params['id'];
    // console.log(id);

    this.employeelist = JSON.parse(localStorage.getItem('Data') || '{}');
    console.log(this.employeelist);
    this.employeelist.map((result: any) => {
      let res = {
        id: result.id,
        name: result.name,
        movies: result.movies
      }
      res.movies.map((result: any) => {
        let ress = {
          task: result.task,
          startdate: result.startdate,
          enddate: result.enddate,
          status: result.status
        }
        // console.log(ress)
        this.empArr.push(ress);
      })
    })

    this.dataSource = new MatTableDataSource<any>(this.empArr);

  }

}

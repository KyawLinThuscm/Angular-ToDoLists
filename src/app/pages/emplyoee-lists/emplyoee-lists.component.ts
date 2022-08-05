import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-emplyoee-lists',
  templateUrl: './emplyoee-lists.component.html',
  styleUrls: ['./emplyoee-lists.component.scss']
})
export class EmplyoeeListsComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  public employees: any[] = [];
  public columnToDisplay = [
    'name',
    'operation',
  ];
  pageSizes = 2;
  currentPage = 0;
  totalSize = 0;
  employeelist = [];
  empArr: Array<object>= [];
  data: any;

  constructor(public router: Router,) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {

    this.getEmployee();
    // this.employeelist = JSON.parse(localStorage.getItem('Data') || '{}');
    // this.employeelist.map((result: any) => {
    //   let res = {
    //     id: result.id,
    //     name: result.name,
    //     movies: result.movies
    //   }
    //   this.empArr.push(res);
    // })
    // this.dataSource = new MatTableDataSource<any>(this.empArr);
    // this.currentPage = 0;
    // this.dataSource.paginator = this.paginator;
    // this.totalSize = this.employeelist.length;
  }

  public getEmployee() {
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '{}');
    this.employeelist.map((result: any) => {
      let res = {
        id: result.id,
        name: result.name,
        movies: result.movies
      }
      this.empArr.push(res);
    })
    this.dataSource = new MatTableDataSource<any>(this.empArr);
    this.dataSource.paginator = this.paginator;
    this.currentPage = 0;
    this.totalSize = this.employeelist.length;
  }

  public searchUser() {

  }

  public remove(id: any){
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '[]');
    this.data = this.employeelist.find(elist => elist['id'] == id);
    this.employeelist.splice(this.employeelist.findIndex(a => a['id'] === this.data.id), 1);
    localStorage.setItem("Data", JSON.stringify(this.employeelist));
    this.getEmployee();
    location.reload();
  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) {

  }
}

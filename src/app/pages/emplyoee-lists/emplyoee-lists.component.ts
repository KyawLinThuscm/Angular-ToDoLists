import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-emplyoee-lists',
  templateUrl: './emplyoee-lists.component.html',
  styleUrls: ['./emplyoee-lists.component.scss']
})
export class EmplyoeeListsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>();
  public employees: any[] = [];
  public selectedEmployeeName = '';
  public showTimeFlag: any;
  public columnToDisplay = [
    'name',
    'operation',
  ];
  pageSizes = [2, 4, 8];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;
  employeelist = [];
  empArr: Array<object>= [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '{}');
    this.employeelist.map((result: any) => {
      let res = {
        id: result.id,
        name: result.name,
        movies: result.movies
      }
      // console.log(res);
      this.empArr.push(res);
      // console.log(this.empArr)
    })
    this.dataSource = new MatTableDataSource<any>(this.empArr);
    this.currentPage = 0;
    this.totalSize = this.employeelist.length;
  }

  public searchUser() {

  }

  public remove(){

  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) {

  }
}

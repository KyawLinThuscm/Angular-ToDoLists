import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PostDataModel {
  title: string,
  created_user: string,
  created_at: string
}
@Component({
  selector: 'app-emplyoee-lists',
  templateUrl: './emplyoee-lists.component.html',
  styleUrls: ['./emplyoee-lists.component.scss']
})
export class EmplyoeeListsComponent implements OnInit {
  public tableData = [
    {
      title: "Title01",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title02",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title03",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title04",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title05",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
    {
      title: "Title06",
      description: "Description01",
      created_user: "admin",
      created_at: "2022/06/21"
    },
  ];
  public dataSource = new MatTableDataSource<PostDataModel>();
  public employees: any[] = [];
  public selectedEmployeeName = '';
  public showTimeFlag: any;
  public columnToDisplay = [
    'title',
    'description',
    'created_user',
    'created_at',
    'operation',
  ];
  pageSizes = [2, 4, 8];
  actualPaginator?: MatPaginator;
  currentPage = 0;
  totalSize = 0;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<PostDataModel>(this.tableData);
    this.currentPage = 0;
    this.totalSize = this.tableData.length;
  }
  public createUser() {
    // this.dialogRef = this.dialog.open(UserInputDialogComponent, {
    //   panelClass: 'overlay-dialog',
    //   height: '130px',
    //   width: '130px'
    // });
  }


  public searchUser() {

  }

  /**
   * when pagination buttons click.
   * @param (e)
   */
  public handlePage(e: any) {

  }
}

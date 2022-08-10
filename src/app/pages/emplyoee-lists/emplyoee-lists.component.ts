import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-emplyoee-lists',
  templateUrl: './emplyoee-lists.component.html',
  styleUrls: ['./emplyoee-lists.component.scss']
})
export class EmplyoeeListsComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  public columnToDisplay = [
    'name',
    'created_at',
    'operation',
  ];
  pageSizes = 2;
  currentPage = 0;
  totalSize = 0;
  employeelist: any = [];
  data: any;
  name = "";
  fromDate: any;
  toDate: any;

  constructor(public router: Router,) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  async ngOnInit() {

    this.employeelist = await JSON.parse(localStorage.getItem('Data') || '[]');
    this.getEmployee(this.employeelist);
  }

  public getEmployee(data=null) {
    this.employeelist = data ? data : this.employeelist;
    this.dataSource = new MatTableDataSource<any>(this.employeelist);
    this.dataSource.paginator = this.paginator;
    this.totalSize = this.employeelist.length;
  }

  public searchUser() {
    if (!this.name && !this.fromDate && !this.toDate) {
      this.getEmployee()

    } else if (this.name && !this.fromDate && !this.toDate) {
      const ename = this.name;
      const seachName = this.employeelist.filter(function (e: any) {
        return e['name'] === ename;
      });
      this.dataSource = new MatTableDataSource<any>(seachName);
      this.dataSource.paginator = this.paginator;
      this.totalSize = seachName.length;

    } else if (!this.name && this.fromDate && this.toDate) {
      const from = moment(this.fromDate).format('YYYY/MM/DD');
      const to = moment(this.toDate).format('YYYY/MM/DD');
      const fromto = this.employeelist.filter(function (e: any) {
        return e['created_at'] >= from && e['created_at'] <= to
      });
      this.dataSource = new MatTableDataSource<any>(fromto);
      this.dataSource.paginator = this.paginator;
      this.totalSize = fromto.length;

    } else if (!this.name && this.fromDate && !this.toDate) {
      const from = moment(this.fromDate).format('YYYY/MM/DD');
      const to = moment(new Date()).format('YYYY/MM/DD');
      const fromOnly = this.employeelist.filter(function (e: any) {
        return e['created_at'] >= from && e['created_at'] <= to
      });
      this.dataSource = new MatTableDataSource<any>(fromOnly);
      this.dataSource.paginator = this.paginator;
      this.totalSize = fromOnly.length;

    } else if (!this.name && !this.fromDate && this.toDate) {
      const to = moment(this.toDate).format('YYYY/MM/DD');
      const toOnly = this.employeelist.filter(function (e: any) {
        return e['created_at'] <= to
      });
      this.dataSource = new MatTableDataSource<any>(toOnly);
      this.dataSource.paginator = this.paginator;
      this.totalSize = toOnly.length;

    } else if (this.name && this.fromDate && !this.toDate) {
      const ename = this.name;
      const from = moment(this.fromDate).format('YYYY/MM/DD');
      const to = moment(new Date()).format('YYYY/MM/DD');
      const nameFrom = this.employeelist.filter(function (e: any) {
        return e['name'] === ename && e['created_at'] >= from && e['created_at'] <= to
      });
      this.dataSource = new MatTableDataSource<any>(nameFrom);
      this.dataSource.paginator = this.paginator;
      this.totalSize = nameFrom.length;

    } else if (this.name && !this.fromDate && this.toDate) {
      const ename = this.name;
      const to = moment(this.toDate).format('YYYY/MM/DD');
      const nameTo = this.employeelist.filter(function (e: any) {
        return e['name'] === ename && e['created_at'] <= to
      });
      this.dataSource = new MatTableDataSource<any>(nameTo);
      this.dataSource.paginator = this.paginator;
      this.totalSize = nameTo.length;
    } else {
      for (let i = 0; i < this.employeelist.length; i++) {

        const ename = this.name;
        const from = moment(this.fromDate).format('YYYY/MM/DD');
        const to = moment(this.toDate).format('YYYY/MM/DD');
        const all = this.employeelist.filter(function (e: any) {
          return e['name'] === ename && e['created_at'] >= from && e['created_at'] <= to
        });
        this.dataSource = new MatTableDataSource<any>(all);
        this.dataSource.paginator = this.paginator;
        this.totalSize = all.length;
      }
    }
  }

  public remove(id: any) {
    this.employeelist = JSON.parse(localStorage.getItem('Data') || '[]');
    this.data = this.employeelist.find((elist: any) => elist['id'] == id);
    this.employeelist.splice(this.employeelist.findIndex((a: any) => a['id'] === this.data.id), 1);
    localStorage.setItem("Data", JSON.stringify(this.employeelist));
    this.getEmployee(this.employeelist);
  }
}

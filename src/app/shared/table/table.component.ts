import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServerCost } from '../../interfaces/server-cost';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-component',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, DatePipe, MatSortModule],
})
export class TableComponent implements AfterViewInit {
  @Input() tableData: ServerCost[] = [];
  displayedColumns: string[] = [
    'name',
    'provider',
    'start_date',
    'monthly_cost',
    'months_running',
    'total_cost',
  ];
  dataSource = new MatTableDataSource<ServerCost>();
  sortedData: ServerCost[] = [];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const colA = a[sort.active] as number | string;
      const colB = b[sort.active] as number | string;
      return (colA < colB ? -1 : 1) * (isAsc ? 1 : -1);
    });
  }
}

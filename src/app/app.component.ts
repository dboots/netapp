import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './shared/table/table.component';
import { ServerCost } from './interfaces/server-cost';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tableData: ServerCost[] = [
    {
      id: '2362852346',
      name: 'Test',
      provider: 'AWS',
      monthly_cost: '0.60',
      start_date: '1577836800000',
    },
    {
      id: '1047946121',
      name: 'MyTest',
      provider: 'Azure',
      monthly_cost: '0.17',
      start_date: '1582934400000',
    },
    {
      id: '2425838433',
      name: 'YourTest',
      provider: 'AWS',
      monthly_cost: '1.29',
      start_date: '1625270400000',
    },
    {
      id: '6309039215',
      name: 'Their Test',
      provider: 'GCP',
      monthly_cost: '0.27',
      start_date: '1585699200000',
    },
    {
      id: '5343585185',
      name: 'name',
      provider: 'Azure',
      monthly_cost: '4.01',
      start_date: '1622505600000',
    },
  ];

  ngOnInit() {
    this.tableData.forEach((data) => {
      data.total_cost = this.calculateTotalMonthlyCost(
        data.monthly_cost,
        data.start_date
      );
      data.months_running = Math.floor(
        (new Date().getTime() - parseFloat(data.start_date)) /
          (1000 * 60 * 60 * 24 * 30)
      );
    });
  }

  calculateTotalMonthlyCost(monthlyCost: string, startDate: string, endDate: number = new Date().getTime()): string {
    const monthlyCostNumber = parseFloat(monthlyCost);
    const startDateNumber = parseFloat(startDate);
    const currentDate = endDate;
    const months = (currentDate - startDateNumber) / (1000 * 60 * 60 * 24 * 30);
    return (monthlyCostNumber * months).toFixed(2);
  }

  calculateTotalCost(): string {
    return this.tableData
      .reduce((acc, data) => {
        return acc + parseFloat(data.total_cost!);
      }, 0)
      .toFixed(2);
  }
}

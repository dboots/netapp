import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableComponent } from './shared/table/table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // first record is ~7 days old, so total cost should be ~0.14
  const TABLE_DATA = [
    {
      id: '2362852346',
      name: 'Test 1',
      provider: 'AWS',
      monthly_cost: '0.60',
      start_date: '1727891159616',
    },
    {
      id: '2362852346',
      name: 'Test 2',
      provider: 'AWS',
      monthly_cost: '0.70',
      start_date: '1577836800000',
    },
    {
      id: '2362852346',
      name: 'Test 4',
      provider: 'AWS',
      monthly_cost: '0.80',
      start_date: '1577836800000',
    },
    {
      id: '2362852346',
      name: 'Test 3',
      provider: 'AWS',
      monthly_cost: '0.90',
      start_date: '1577836800000',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TableComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load data on init', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.tableData = TABLE_DATA;
    app.ngOnInit();
    expect(app.tableData.length).toBe(4);
  });

  it('should calculate total cost', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.tableData = TABLE_DATA;

    const endDate = new Date('10/08/2024').getTime();
    // calculate total cost for first record (7 days old)
    let totalCost = app.calculateTotalMonthlyCost(app.tableData[0].monthly_cost, app.tableData[0].start_date, endDate);
    expect(totalCost).toBe('0.11');

    // calculate total cost for second record 
    totalCost = app.calculateTotalMonthlyCost(app.tableData[1].monthly_cost, app.tableData[1].start_date, endDate);
    expect(totalCost).toBe('40.65');
  });


  // check sum of total costs value after ngOnInit
  it('should calculate total cost for all records', () => {
    const app = fixture.componentInstance;
    app.tableData = TABLE_DATA;
    app.ngOnInit();
    fixture.detectChanges();

    // get .total-costs content
    const compiled = fixture.nativeElement;
    const totalCosts = compiled.querySelector('.total-costs');
    expect(totalCosts.textContent).toBe('Total Costs: $139.73');
  });


});

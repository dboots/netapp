import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableData = [
      {
        id: '2362852346',
        name: 'Test 2',
        provider: 'AWS',
        monthly_cost: '0.60',
        start_date: '1577836800000',
      },
      {
        id: '2362852346',
        name: 'Test 1',
        provider: 'AWS',
        monthly_cost: '0.60',
        start_date: '1577836800000',
      },
      {
        id: '2362852346',
        name: 'Test 4',
        provider: 'AWS',
        monthly_cost: '0.60',
        start_date: '1577836800000',
      },
      {
        id: '2362852346',
        name: 'Test 3',
        provider: 'AWS',
        monthly_cost: '0.60',
        start_date: '1577836800000',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render data', () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();

    const rows = compiled.querySelectorAll('.mat-mdc-row');
    const columns = rows[0].querySelectorAll('.mat-mdc-cell');

    expect(columns.length).toBe(6);
    expect(rows.length).toBe(4);
  });

  it('should sort data asc', () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();

    const sort = fixture.debugElement.nativeElement.querySelector('.mat-sort-header-container');
    sort.click();
    fixture.detectChanges();

    const columns = compiled.querySelectorAll('.mat-mdc-cell');
    expect(columns[0].textContent).toBe('Test 1');
  });

  it('should sort data desc', () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();

    const sort = fixture.debugElement.nativeElement.querySelector('.mat-sort-header-container');
    sort.click();
    fixture.detectChanges();

    sort.click();
    fixture.detectChanges();

    const columns = compiled.querySelectorAll('.mat-mdc-cell');
    expect(columns[0].textContent).toBe('Test 4');
  });

  it('should reset sort', () => {
    const compiled = fixture.nativeElement;
    fixture.detectChanges();

    const sort = fixture.debugElement.nativeElement.querySelector('.mat-sort-header-container');
    // first click asc
    sort.click();
    // second click desc
    sort.click();
    // third click reset
    sort.click();
    fixture.detectChanges();

    const columns = compiled.querySelectorAll('.mat-mdc-cell');
    expect(columns[0].textContent).toBe('Test 2');
  });
});

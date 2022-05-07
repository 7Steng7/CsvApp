import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataCsvComponent } from './show-data-csv.component';

describe('ShowDataCsvComponent', () => {
  let component: ShowDataCsvComponent;
  let fixture: ComponentFixture<ShowDataCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDataCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDataCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

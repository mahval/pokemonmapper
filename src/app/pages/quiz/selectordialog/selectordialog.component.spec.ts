import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectordialogComponent } from './selectordialog.component';

describe('SelectordialogComponent', () => {
  let component: SelectordialogComponent;
  let fixture: ComponentFixture<SelectordialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectordialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectordialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

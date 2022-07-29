import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyoeeListsComponent } from './emplyoee-lists.component';

describe('EmplyoeeListsComponent', () => {
  let component: EmplyoeeListsComponent;
  let fixture: ComponentFixture<EmplyoeeListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmplyoeeListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplyoeeListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

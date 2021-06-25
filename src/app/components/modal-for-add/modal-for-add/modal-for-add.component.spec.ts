import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForAddComponent } from './modal-for-add.component';

describe('ModalForAddComponent', () => {
  let component: ModalForAddComponent;
  let fixture: ComponentFixture<ModalForAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalForAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

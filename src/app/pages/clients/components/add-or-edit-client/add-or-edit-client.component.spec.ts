import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditClientComponent } from './add-or-edit-client.component';

describe('AddOrEditClientComponent', () => {
  let component: AddOrEditClientComponent;
  let fixture: ComponentFixture<AddOrEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrEditClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOrEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

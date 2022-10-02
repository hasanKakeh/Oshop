import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityBoxComponent } from './quantity-box.component';

describe('QuantityBoxComponent', () => {
  let component: QuantityBoxComponent;
  let fixture: ComponentFixture<QuantityBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

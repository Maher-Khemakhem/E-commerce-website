import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemodalComponent } from './createmodal.component';

describe('CreatemodalComponent', () => {
  let component: CreatemodalComponent;
  let fixture: ComponentFixture<CreatemodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatemodalComponent]
    });
    fixture = TestBed.createComponent(CreatemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

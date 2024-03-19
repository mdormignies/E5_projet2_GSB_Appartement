import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutAppartementComponent } from './ajout-appartement.component';

describe('AjoutAppartementComponent', () => {
  let component: AjoutAppartementComponent;
  let fixture: ComponentFixture<AjoutAppartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutAppartementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

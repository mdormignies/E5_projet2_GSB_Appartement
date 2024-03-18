import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVisiteComponent } from './ajout-visite.component';

describe('AjoutVisiteComponent', () => {
  let component: AjoutVisiteComponent;
  let fixture: ComponentFixture<AjoutVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutVisiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

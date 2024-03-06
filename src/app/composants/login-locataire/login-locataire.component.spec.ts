import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLocataireComponent } from './login-locataire.component';

describe('LoginLocataireComponent', () => {
  let component: LoginLocataireComponent;
  let fixture: ComponentFixture<LoginLocataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLocataireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginLocataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

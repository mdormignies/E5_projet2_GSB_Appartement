import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProprietaireComponent } from './login-proprietaire.component';

describe('LoginProprietaireComponent', () => {
  let component: LoginProprietaireComponent;
  let fixture: ComponentFixture<LoginProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginProprietaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

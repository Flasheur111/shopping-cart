import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // Other libraries
        TranslateModule.forRoot()
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    translateService = TestBed.get(TranslateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});

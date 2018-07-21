import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule,
  MatCardModule } from '@angular/material';
  import { ColorPickerModule } from 'ngx-color-picker';
  import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [MatToolbarModule,
      MatCardModule,
      ColorPickerModule,
      HttpClientModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should contain results and saved properties', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-toolbar')[0].textContent.indexOf('Results') >= 0).toBeTruthy();
    expect(compiled.querySelectorAll('mat-toolbar')[1].textContent.indexOf('Saved Properties') >= 0).toBeTruthy();
  }));
});

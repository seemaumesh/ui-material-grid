import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule} from '@angular/material';
  import { ColorPickerModule } from 'ngx-color-picker';
  import { HttpClientModule } from '@angular/common/http';
  import {PropertyService} from './app.property.service';
import {Property} from './Property';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { Observable } from 'rxjs';
import {NgxPopperModule} from 'ngx-popper';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
      ColorPickerModule,
      HttpClientInMemoryWebApiModule.forRoot(
        InMemoryDataService, { dataEncapsulation: false }
      ),
      NgxPopperModule.forRoot({trigger: 'hover'}),
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
  it('should call properties', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const propertyService = fixture.debugElement.injector.get(PropertyService);
    const response: Property[] = [];
    const spy = spyOn(propertyService, 'get').and.returnValue({ subscribe: () => response });
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  }));
  it('should save property', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const propertyService = fixture.debugElement.injector.get(PropertyService);
    const response = [{
      'price': '$726,500',
      'agency': {
          'brandingColors': {
              'primary': '#ffe512'
          },
          'logo': 'http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif'
      },
      'id': 1,
      'mainImage': 'http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg'
  }];
    const saved: Property[] = [];
    const spy = spyOn(propertyService, 'get').and.returnValue({ subscribe: (param) => {
      console.log(param);
      return response;
    } });
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    app['properties'] = response;
    app['savedProperties'] = saved;
    app.OnAddProperty(1);
    expect(app['savedProperties'].length > 0).toBeTruthy();
    expect(app['savedProperties'][0].id === 1).toBeTruthy();
  }));
  it('should remove saved property', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const propertyService = fixture.debugElement.injector.get(PropertyService);
    const saved = [{
      'price': '$726,500',
      'agency': {
          'brandingColors': {
              'primary': '#ffe512'
          },
          'logo': 'http://i1.au.reastatic.net/agencylogo/XRWXMT/12/20120927204448.gif'
      },
      'id': 1,
      'mainImage': 'http://i2.au.reastatic.net/640x480/20bfc8668a30e8cabf045a1cd54814a9042fc715a8be683ba196898333d68cec/main.jpg'
  }];
    const response: Property[] = [];
    const spy = spyOn(propertyService, 'get').and.returnValue({ subscribe: (param) => {
      console.log(param);
      return response;
    } });
    const app = fixture.debugElement.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    app['properties'] = response;
    app['savedProperties'] = saved;
    app.OnRemoveProperty(1);
    expect(app['properties'].length > 0).toBeTruthy();
    expect(app['properties'][0].id === 1).toBeTruthy();
  }));
});

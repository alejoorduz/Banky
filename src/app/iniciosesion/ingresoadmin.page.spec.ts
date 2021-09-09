import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresoadminPage } from './ingresoadmin.page';

describe('IngresoadminPage', () => {
  let component: IngresoadminPage;
  let fixture: ComponentFixture<IngresoadminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoadminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresoadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

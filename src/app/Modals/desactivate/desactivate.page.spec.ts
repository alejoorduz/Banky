import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DesactivatePage } from './desactivate.page';

describe('DesactivatePage', () => {
  let component: DesactivatePage;
  let fixture: ComponentFixture<DesactivatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesactivatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DesactivatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActiveCarModalPage } from './active-car-modal.page';

describe('ActiveCarModalPage', () => {
  let component: ActiveCarModalPage;
  let fixture: ComponentFixture<ActiveCarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveCarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViajesaldiaPage } from './viajesaldia.page';

describe('ViajesaldiaPage', () => {
  let component: ViajesaldiaPage;
  let fixture: ComponentFixture<ViajesaldiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesaldiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViajesaldiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemandaPage } from './demanda.page';

describe('DemandaPage', () => {
  let component: DemandaPage;
  let fixture: ComponentFixture<DemandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

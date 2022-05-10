import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscripcionesPage } from './inscripciones.page';

describe('InscripcionesPage', () => {
  let component: InscripcionesPage;
  let fixture: ComponentFixture<InscripcionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscripcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

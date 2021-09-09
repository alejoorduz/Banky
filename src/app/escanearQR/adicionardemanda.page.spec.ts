import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdicionardemandaPage } from './adicionardemanda.page';

describe('AdicionardemandaPage', () => {
  let component: AdicionardemandaPage;
  let fixture: ComponentFixture<AdicionardemandaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionardemandaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionardemandaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

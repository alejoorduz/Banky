import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrasnferirPage } from './trasnferir.page';

describe('TrasnferirPage', () => {
  let component: TrasnferirPage;
  let fixture: ComponentFixture<TrasnferirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasnferirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrasnferirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

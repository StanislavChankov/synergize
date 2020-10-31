import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartingPointComponent } from './starting-point.component';

describe('StartingPointComponent', () => {
  let component: StartingPointComponent;
  let fixture: ComponentFixture<StartingPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingPointComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

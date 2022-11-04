import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNgZorroComponentComponent } from './my-ng-zorro-component.component';

describe('MyNgZorroComponentComponent', () => {
  let component: MyNgZorroComponentComponent;
  let fixture: ComponentFixture<MyNgZorroComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNgZorroComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNgZorroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
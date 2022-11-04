import { Component, Input } from '@angular/core';
import { Example } from '../../models/example.model';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [CommonModule, NzCardModule, NzDescriptionsModule, NzFormModule],
  selector: 'ng-zorro-demo-example-drawer',
  templateUrl: './example-drawer.component.html',
  styleUrls: ['./example-drawer.component.scss'],
})
export class ExampleDrawerComponent {

  public example$ = new ReplaySubject<Example>(1);

  @Input()
  public set value(example: Example) {
    this.example$.next(example);
  }

  constructor(private modalRef: NzModalRef) {
  }

  onSaveClick() {
    this.closeDialog();
  }

  onCancelClick() {
    this.closeDialog();
  }

  private closeDialog() {
    this.modalRef.triggerOk().then(() => this.modalRef.destroy());
  }
}

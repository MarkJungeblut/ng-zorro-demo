import { Component, OnInit } from '@angular/core';
import { isFailure, isPending, isSuccess, RemoteData } from '@devexperts/remote-data-ts';
import { ExampleComponent } from '@ng-zorro-demo/example';
import { ExampleService } from '../../services/example.service';
import { Observable } from 'rxjs';
import { Example } from '../../models/example.model';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  standalone: true,
  imports: [CommonModule, ExampleComponent, NzSpinModule, NzResultModule],
  providers: [ExampleService],
  selector: 'invalid-example-container',
  templateUrl: './invalid-example-container.component.html',
  styleUrls: ['./invalid-example-container.component.scss'],
})
export class InvalidExampleContainerComponent {
  isPending = isPending;
  isSuccess = isSuccess;
  isFailure = isFailure;

  public exampleData$: Observable<RemoteData<string[], readonly Example[]>>;

  constructor(exampleService: ExampleService) {
    this.exampleData$ = exampleService.getInvalidExampleData();
  }
}

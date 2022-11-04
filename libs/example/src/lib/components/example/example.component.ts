import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Example } from '../../models/example.model';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableModule,
  NzTableSortFn,
  NzTableSortOrder
} from 'ng-zorro-antd/table';

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder;
  sortFn: NzTableSortFn<Example>;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<Example>;
  width: string;
}

export interface ExampleComponentParams {
  examples: Example[];
  columnItems: ColumnItem[];
}

export interface ExampleComponentState extends ExampleComponentParams {
  columnItems: ColumnItem[];
}

@Component({
  standalone: true,
  imports: [CommonModule, NzTableModule],
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent {
  public params$ = new ReplaySubject<ExampleComponentParams>(1);

  @Output()
  public exampleSelected: EventEmitter<Example> = new EventEmitter<Example>();

  @Input()
  public set params(params: ExampleComponentParams) {
    this.params$.next(params);
  }

  public getTypedExampleData(data: readonly unknown[]): Example[] {
    return data as Example[];
  }

  onExampleSelect(example: Example) {
    this.exampleSelected.next(example);
  }

  trackByIndex(_: number, item: Example): number {
    return item.id;
  }

  public trackByColumn(index: number, item: ColumnItem) {
    return item.name;
  }

  public trackByExample(index: number, item: Example) {
    return item.id;
  }
}



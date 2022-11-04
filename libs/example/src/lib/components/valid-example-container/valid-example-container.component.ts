import { Component, OnInit, Type } from '@angular/core';
import { isFailure, isPending, isSuccess, map as remoteDataMap, RemoteData } from '@devexperts/remote-data-ts';
import { ColumnItem, ExampleComponent, ExampleComponentParams } from '@ng-zorro-demo/example';
import { map, Observable } from 'rxjs';
import { ExampleService } from '../../services/example.service';
import { Example } from '../../models/example.model';
import { CommonModule } from '@angular/common';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { pipe } from 'fp-ts/function';
import { array, string } from 'fp-ts';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzTableFilterValue } from 'ng-zorro-antd/table/src/table.types';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ExampleDrawerComponent } from '../example-drawer/example-drawer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  standalone: true,
  imports: [CommonModule, ExampleComponent, NzSkeletonModule, NzResultModule, NzSpinModule, NzIconModule],
  providers: [ExampleService, NzModalService],
  selector: 'valid-example-container',
  templateUrl: './valid-example-container.component.html',
  styleUrls: ['./valid-example-container.component.scss'],
})
export class ValidExampleContainerComponent {
  isPending = isPending;
  isSuccess = isSuccess;
  isFailure = isFailure;

  public exampleData$: Observable<RemoteData<string[], ExampleComponentParams>>;

  constructor(exampleService: ExampleService,
              private modalService: NzModalService) {
    this.exampleData$ = exampleService.getValidExampleData().pipe(
      map((data: RemoteData<string[], Example[]>) => {
        return pipe(
          data,
          remoteDataMap((examples: Example[]): ExampleComponentParams => {
            return {
              examples: examples,
              columnItems: this.createColumnItems(examples)
            }
          })
        )
      })
    );
  }

  private createColumnItems(examples: Example[]) {
    return [
      createColumnItem(
        examples,
        'Title',
        (example: Example) => example.title,
        '7em',
        'ascend'
      ),
      createColumnItem(
        examples,
        'Description',
        (example: Example) => example.description,
        '7em',
        'ascend'
      ),
      createColumnItem(
        examples,
        'Comment',
        (example: Example) => example.comment,
        '7em',
        'ascend'
      )
    ]
  }

  onExampleSelected(example: Example) {
    this.modalService.create({
      nzStyle: {
        width: '800px'
      },
      nzComponentParams: {
        value: example
      },
      nzContent: ExampleDrawerComponent,
      nzTitle: 'Example'
    })
  }
}

export const createColumnItem = (values: Example[], label: string, getPropertyValue: (value: Example) => string, width: string, sortOrder: NzTableSortOrder): ColumnItem => ({
  name: label,
  width: width,
  listOfFilter: pipe(
    values,
    array.map((value: Example) => getPropertyValue(value)),
    array.uniq(string.Ord),
    array.sort(string.Ord),
    array.map((propertyValue: string) => ({
      value: propertyValue,
      text: propertyValue
    }))
  ),
  filterFn: (value: NzTableFilterValue, data: Example) => {
    return value.some((value: string) => {
      const itemValue = getPropertyValue(data)
      return itemValue.indexOf(value) !== -1
    })
  },
  sortOrder,
  sortFn: (a: Example, b: Example) => {

    const aValue: string = getPropertyValue(a);
    const bValue: string = getPropertyValue(b);

    return aValue.localeCompare(bValue, [], {numeric: true});
  }
})

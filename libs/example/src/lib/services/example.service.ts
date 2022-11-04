import { Injectable } from '@angular/core';
import { delay, map, Observable, of, startWith } from 'rxjs';
import { fromEither, pending, RemoteData, success } from '@devexperts/remote-data-ts';
import { Example } from '../models/example.model';
import { ExampleUnsafe } from '../models/unsafe/example-unsafe.model';
import { pipe } from 'fp-ts/function';
import { array, either } from 'fp-ts';
import { Errors } from 'io-ts';
import { formatValidationErrors } from 'io-ts-reporters';

@Injectable()
export class ExampleService {
  public getValidExampleData(): Observable<RemoteData<string[], Example[]>> {
    return this.getExampleData(generateValidExampleData())
  }

  public getInvalidExampleData(): Observable<RemoteData<string[], Example[]>> {
    return this.getExampleData(generateInvalidExampleData())
  }

  private getExampleData(unsafeExamples: ExampleUnsafe[]): Observable<RemoteData<string[], Example[]>> {
    return of(unsafeExamples).pipe(
      delay(3000),
      map((unsafeExamples: ExampleUnsafe[]) => {
        return pipe(
          unsafeExamples,
          array.map((unsafeExample: ExampleUnsafe) => {
            return pipe(
              unsafeExample,
              Example.decode
            )
          }),
          either.sequenceArray,
          either.map((examples: readonly Example[]) => examples.concat()),
          either.mapLeft((errors: Errors) => formatValidationErrors(errors)),
          fromEither
        )
      }),
      startWith(pending)
    );
  }
}

export const generateInvalidExampleData = (): ExampleUnsafe[] => {
  return [{
    title: 'Example Title',
    // Description is missing
  }]
}

export const generateValidExampleData = (): ExampleUnsafe[] => {
  const examples: ExampleUnsafe[] = []

  for (let i = 0; i < 10000; i++) {

    let title = 'Default title'
    let description = 'Default description';

    if (i % 3 === 0) {
      title = 'Another title';
      description = 'Another description';
    }

    if (i % 7 === 0) {
      title = 'New Title'
      description = 'New description';
    }

    examples.push({
      id: i,
      title,
      description
    })
  }

  return examples;
}

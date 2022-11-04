import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { invalidExample, validExample } from '@ng-zorro-demo/example';

export const routes: Routes = [
  {
    path: validExample,
    loadComponent: () =>
      import('@ng-zorro-demo/example').then((m) => m.ValidExampleContainerComponent),
  },
  {
    path: invalidExample,
    loadComponent: () =>
      import('@ng-zorro-demo/example').then((m) => m.InvalidExampleContainerComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: invalidExample
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

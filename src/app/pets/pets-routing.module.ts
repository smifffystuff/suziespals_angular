import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetsNewComponent } from './pets-new/pets-new.component';

const petRoutes: Routes = [
  {
    path: 'pets',
    component: PetsComponent,
    children: [{ path: 'new', component: PetsNewComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(petRoutes)],
  exports: [RouterModule]
})
export class PetsRoutingModule {}

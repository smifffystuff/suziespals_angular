import { PetsEmptyComponent } from './pets-empty/pets-empty.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsComponent } from './pets.component';
import { PetsNewComponent } from './pets-new/pets-new.component';

const petRoutes: Routes = [
  {
    path: 'pets',
    component: PetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(petRoutes)],
  exports: [RouterModule]
})
export class PetsRoutingModule {}

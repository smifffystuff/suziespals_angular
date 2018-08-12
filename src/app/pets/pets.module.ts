import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsDetailComponent } from './pets-detail/pets-detail.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetsEditComponent } from './pets-edit/pets-edit.component';
import { PetsNewComponent } from './pets-new/pets-new.component';
import { PetsComponent } from './pets.component';
import { PetsService } from '../pets.service';
import { PetsRoutingModule } from './pets-routing.module';

@NgModule({
  declarations: [
    PetsComponent,
    PetsNewComponent,
    PetsEditComponent,
    PetsListComponent,
    PetsDetailComponent
  ],
  imports: [CommonModule, PetsRoutingModule],
  providers: [PetsService]
})
export class PetsModule {}

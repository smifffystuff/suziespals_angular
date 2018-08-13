import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PetsDetailComponent } from './pets-detail/pets-detail.component';
import { PetsListComponent } from './pets-list/pets-list.component';
import { PetsEditComponent } from './pets-edit/pets-edit.component';
import { PetsNewComponent } from './pets-new/pets-new.component';
import { PetsComponent } from './pets.component';
import { PetsService } from './pets.service';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsEmptyComponent } from './pets-empty/pets-empty.component';

@NgModule({
  declarations: [
    PetsComponent,
    PetsNewComponent,
    PetsEditComponent,
    PetsListComponent,
    PetsDetailComponent,
    PetsEmptyComponent
  ],
  imports: [CommonModule, PetsRoutingModule, FormsModule],
  providers: [PetsService]
})
export class PetsModule {}

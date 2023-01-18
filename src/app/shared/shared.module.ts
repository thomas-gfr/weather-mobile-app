import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { InputTextFormComponent } from './component/input-form/input-text-form/input-text-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import localeFr from '@angular/common/locales/fr';
import { InputAutocompleteComponent } from './component/input-form/input-autocomplete/input-autocomplete.component';

registerLocaleData(localeFr);


const COMPONENTS = [
    InputTextFormComponent,
    InputAutocompleteComponent
];

const MATERIAL = [
    MatInputModule,
    MatAutocompleteModule
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL
  ],
  providers: [
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS, ...MATERIAL]
})
export class SharedModule {}

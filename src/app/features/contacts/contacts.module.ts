import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from '@app/features/contacts/contacts/contacts.component';


@NgModule({
  declarations: [ContactsComponent],
  exports: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }

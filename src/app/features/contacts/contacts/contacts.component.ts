import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService, Contact } from '@app/core';

declare var particlesJS : any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent implements OnInit {
  public contactData?: Contact[];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private dataService: ApiService) {
    changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.contactData = data['Contact'];
      particlesJS.load('particles-js2');
      this.changeDetectorRef.detectChanges();
    })

  }
}

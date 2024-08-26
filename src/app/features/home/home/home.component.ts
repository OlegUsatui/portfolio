import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ApiService, Home } from '@app/core';

declare var Typed: any;
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  public homeData?: Home;

  constructor(private dataService: ApiService,
              private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.homeData = data['Home'];

      particlesJS.load('particles-js');
      this.changeDetectorRef.detectChanges();

      new Typed("#element", { stringsElement: '#typed-strings', typeSpeed: 100, backDelay: 3000, loop: true });
    });
  }
}

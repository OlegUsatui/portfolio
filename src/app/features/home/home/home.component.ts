import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
declare var Typed: any;
declare var particlesJS : any;
declare var data : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit  {
  public homeData = data['Home'];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    changeDetectorRef.detach();
  }
  ngOnInit(): void {
    particlesJS.load('particles-js');
    this.changeDetectorRef.detectChanges();
  }
  ngAfterViewInit() {
    new Typed("#element",{stringsElement:'#typed-strings',typeSpeed: 100,backDelay: 3000,loop:true});
  }
}

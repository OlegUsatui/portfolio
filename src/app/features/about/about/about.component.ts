import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import { About, ApiService } from '@app/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit, AfterViewInit {
  public aboutData?: About;
  public activeTab = "story";
  public selector : any;

  public activeElements : any = {};

  constructor(public changeDetectorRef: ChangeDetectorRef, private dataService: ApiService) {
    changeDetectorRef.detach();
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.aboutData = data["About"];
      this.changeDetectorRef.detectChanges();
      for(const tab of this.aboutData['NavTabs']){
        if(!this.activeElements[tab.id]){
          this.activeElements[tab.id] = document.getElementById(tab.id+'-tab')!!;
        }
        this.activeElements[tab.id].addEventListener('click',(event : any) => event.preventDefault());
      }

      this.changeActiveTab(this.activeTab);
    })
  }
  ngAfterViewInit() {
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.updateSelector(this.activeTab);
  }

  public changeActiveTab(tab : string) {
    this.updateSelector(tab);
    this.activeTab = tab;
    this.changeDetectorRef.detectChanges();
  }

  public updateSelector(tab : string) {
    if(!this.selector){
      this.selector = document.getElementById('selector');
    }
    this.selector.style.width = `${this.activeElements[tab].offsetWidth}px`;
    this.selector.style.left = `${this.activeElements[tab].offsetLeft}px`;
  }
}

import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService, Identity, NavBar } from '@app/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public navbarData?: NavBar;
  public identityData?: Identity;
  public activeClass: String = "Home";

  private offset :any = [];
  private offsetLink : any = [];

  private size : number = 0;
  private firstScroll : boolean = true;
  private firstClick : boolean = true;
  public navbarProfileVisibility : boolean = false;
  public sticky : boolean = false;
  public animation : string = "";

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private dataService: ApiService,
              private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sticky = event.url !== '/home';
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.navbarData = data['NavBar'];
      this.identityData = data['identity'];

      for (const link of this.navbarData['links']) {
        this.offsetLink.push(link);
        this.offset.push(0);
        this.size++;
      }
    })

    window.addEventListener('keydown',(event)=> {
      if (event.code === "Escape" && this.navbarProfileVisibility){
        this.removeProfile();
      }
    })
  }

  ngAfterViewInit(){
    let navTabs: any = document.querySelectorAll('.nav-link a');
    for (const navTab of navTabs) {
      navTab.addEventListener('click',(event:any) => event.preventDefault());
    }
  }

  private binarySearch(target : number) : number{
    let low = 0;
    let high = this.offset.length - 1;

    if(target <= this.offset[low]){
      return 0;
    }
    if(target >= this.offset[high]){
      return high;
    }
    let res = 0;
    while(low<high)
    {
      let mid = Math.floor((low + high)/2);

      if(target < this.offset[mid]) {
        high = mid;
      } else {
        res = mid;
        low = mid + 1;
      }
    }
    return res;
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(){

  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.firstClick = true;
    this.firstScroll = true;
    if (window.innerWidth >= 992 && this.navbarProfileVisibility) {
      this.navbarProfileVisibility = false;
    }
  }

  updateActiveLink(event: Event, navLink: string) {
    event.preventDefault();
    if(this.firstClick){
      this.updateOffsetLink();
      this.firstClick = false;
    }
    this.activeClass = navLink;
    if(this.navbarProfileVisibility) {
      this.removeProfile();
    }
    this.router.navigate([navLink.toLowerCase()])
  }

  public updateOffsetLink(){
    if (!this.navbarData) return;

    for (let index = 0;index < this.size;index++) {
      let element = document.getElementById(this.navbarData['links'][index].toLowerCase());
      if(element) {
        this.offset[index] = element.offsetTop;
      }
    }
  }

  public removeProfile() {
    this.animation = 'slideOutRight 1s forwards';
    this.changeDetectorRef.detectChanges();

    setTimeout(()=>{
      this.navbarProfileVisibility = false;
      if(this.animation === 'slideOutRight 1s forwards'){
        this.animation = '';
        this.changeDetectorRef.detectChanges();
      }
    },1000);
  }

  public addProfile() {
    this.navbarProfileVisibility = true;
    this.animation = 'slideInLeft 1s forwards';
  }
}

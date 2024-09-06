import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  group,
  animate
} from '@angular/animations';
import { SwUpdate } from '@angular/service-worker';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SharedModule } from '@shared/shared.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routerTransition', [
      transition('HomePage => AboutPage, AboutPage => PortfolioPage, PortfolioPage => ContactPage, ContactPage => RecruiterPage', [
        // Элементы покидают экран
        query(':leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        query(':enter', style({ position: 'fixed', width: '100%', transform: 'translateX(100%)' }), { optional: true }),

        // Анимация для обоих элементов (enter/leave)
        group([
          query(':leave', [
            animate('0.5s ease', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease', style({ transform: 'translateX(0%)' }))
          ], { optional: true })
        ])
      ]),
      transition('AboutPage => HomePage, PortfolioPage => AboutPage, ContactPage => PortfolioPage, RecruiterPage => ContactPage, * => *', [
        // Элементы покидают экран
        query(':leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        query(':enter', style({ position: 'fixed', width: '100%', transform: 'translateX(-100%)' }), { optional: true }),

        // Анимация для обоих элементов (enter/leave)
        group([
          query(':leave', [
            animate('0.5s ease', style({ transform: 'translateX(100%)' }))
          ], { optional: true }),
          query(':enter', [
            animate('0.5s ease', style({ transform: 'translateX(0%)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private swUpdate: SwUpdate) {
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === "VERSION_READY") {
          if (confirm("New update available. Load New Version?")) {
            this.swUpdate.activateUpdate().then(() => {
              window.location.reload();
            });
          }
        }
      });
    }
    let link: HTMLLinkElement = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', document.URL);
    document.head.appendChild(link);
  }

  ngAfterViewInit(): void {
    let loader = document.getElementById('loader')!!;
    let splash = document.getElementById('splash')!!;
    let rightSection = document.getElementById('section-right')!!;
    let leftSection = document.getElementById('section-left')!!;
    setTimeout(() => {
      splash.remove();
      rightSection.style.transform = "translateX(100%)";
      leftSection.style.transform = "translateX(-100%)";
      setTimeout(() => {
        loader.remove();
      }, 800);
    }, 1000);
  }

  triggerAnimation(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}

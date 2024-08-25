import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
}

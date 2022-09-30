import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public linkLoaded: string = 'recipe';

  public changeLink(link: string): void {
    this.linkLoaded = link;
  }
}

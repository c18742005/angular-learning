import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public collapsed = true;
  @Output() selectedLink = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onLinkSelected(link: string): void {
    this.selectedLink.emit(link);
  }

}

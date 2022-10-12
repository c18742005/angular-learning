import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() public message: string = "An error occurred";
  @Output() public close = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void { }

  onClose() {
    this.close.emit();
  }
}

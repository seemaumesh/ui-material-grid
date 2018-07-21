import { Component, OnInit } from '@angular/core';
import {PropertyService} from './app.property.service';
import {Property} from './Property';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: PropertyService) {}
  properties: Property[];
  savedProperties: Property[];

  ngOnInit() {
    this.service.get('properties')
    .subscribe(result => {
      this.properties = result;
    });
    this.service.get('savedProperties')
    .subscribe(result => {
      this.savedProperties = result;
    });
  }
}

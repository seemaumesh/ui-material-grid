import { Component, OnInit } from '@angular/core';
import {PropertyService} from './app.property.service';
import {Property} from './Property';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: PropertyService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icon/baseline-add-24px.svg'));

  }
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

  OnAddProperty(propertyId: number) {
    console.log(propertyId);
    const selectedProperty = this.properties.filter(item => item.id === propertyId);
    this.properties = this.properties.filter(item => item.id !== propertyId);
    this.savedProperties.splice(this.properties.length, 0, selectedProperty[0]);
  }

  OnRemoveProperty(propertyId: number) {
    console.log(propertyId);
    const selectedProperty = this.savedProperties.filter(item => item.id === propertyId);
    this.savedProperties = this.savedProperties.filter(item => item.id !== propertyId);
    this.properties.splice(this.properties.length, 0, selectedProperty[0]);
  }
}

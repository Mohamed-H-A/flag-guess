import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location.service';
import { TitleComponent } from '../../partials/title/title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css'
})
export class MapPageComponent {
  
  private readonly DEFAULT_LOC: LatLngTuple = [13.75, 21.62]
  private readonly MARKER_ZOOM = 16
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  @ViewChild('map', {static: true})
  mapRef!: ElementRef
  map!: Map
  currentMarker!: Marker
  loc!: LatLngTuple
  googleMapsLink!: string

  constructor(private locationService: LocationService, private activated: ActivatedRoute) {
    activated.params.subscribe((params) => {
      if (params['loc']) {
        const loc: LatLngTuple = params['loc'].split(",")
        this.loc = loc
      }
    })
  }
  
  ngOnInit(): void {
    this.initMap()
    if (this.loc) {
      this.setCountryMarker()
      this.googleMapsLink = `https://maps.google.com?q=${this.loc.toString()}&ll=${this.loc.toString()}&z=7`
    }
  }
  
  initMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LOC, 2)
    
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map)
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng)
      this.loc = [e.latlng.lat, e.latlng.lng]
      this.googleMapsLink = `https://maps.google.com?q=${this.loc.toString()}&ll=${this.loc.toString()}&z=${this.MARKER_ZOOM}`
    })
  }

  setCountryMarker() {
    this.initMap()
    this.map.setView(this.loc, 5)
    this.setMarker(this.loc)
  }
  
  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (loc) => {
        this.map.setView(loc, this.MARKER_ZOOM)
        this.setMarker(loc)
        this.loc = [loc.lat, loc.lng]
        this.googleMapsLink = `https://maps.google.com?q=${this.loc.toString()}&ll=${this.loc.toString()}&z=${this.MARKER_ZOOM}`
      }
    })
  }

  setMarker(loc: LatLngExpression) {
    if (this.currentMarker) {
      this.currentMarker.setLatLng(loc)
      return
    }
    this.currentMarker = marker(loc, {
      draggable: true,
      icon: this.MARKER_ICON,
      autoPan: true
    }).addTo(this.map)
    this.currentMarker.on('drag', () => {
      this.loc = [this.currentMarker.getLatLng().lat, this.currentMarker.getLatLng().lng]
      this.googleMapsLink = `https://maps.google.com?q=${this.loc.toString()}&ll=${this.loc.toString()}&z=${this.MARKER_ZOOM}`
    })
  }

}

/**
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

/**
 * Imports
 */
import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  Platform
} from '@ionic/angular';
import {
  DOCUMENT
} from '@angular/common';
import {
  darkStyle
} from './map-dark-style';
import {
  RestClientService
} from '../../providers/rest-client.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage implements AfterViewInit {
  @ViewChild('mapCanvas', {
    static: true
  }) mapElement: ElementRef;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public platform: Platform,
    public restClient: RestClientService,
  ) {}

  async ngAfterViewInit() {
    const appEl = this.doc.querySelector('ion-app');
    let isDark = false;
    let style = [];
    if (appEl.classList.contains('dark-theme')) {
      style = darkStyle;
    }

    const markerFIG = {
      name: 'Federazione Italiana Golf',
      lat: 41.930966,
      lng: 12.468939,
    };

    const googleMaps = await getGoogleMaps(
      'AIzaSyB8pf6ZdFQj5qw7rc_HSGrhUwQKfIe9ICw'
    );

    let map;

    this.restClient.getCourses()
      .subscribe(
        (courses) => {

          const mapEle = this.mapElement.nativeElement;

          map = new googleMaps.Map(mapEle, {
            center: {
              center: true,
              name: markerFIG.name,
              lat: markerFIG.lat,
              lng: markerFIG.lng,
            },
            zoom: 8,
            styles: style
          });

          const infoWindow = new googleMaps.InfoWindow({
            content: `<h5>${markerFIG.name}</h5>`
          });

          const marker = new googleMaps.Marker({
            position: {
              name: markerFIG.name,
              lat: markerFIG.lat,
              lng: markerFIG.lng
            },
            map,
            title: markerFIG.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          courses.forEach((course) => {
            this.restClient.getCourseAddress(course.id)
              .subscribe(
                response => {

                  const courseInfoWindow = new googleMaps.InfoWindow({
                    content: `<h5>${course.name}</h5>`
                  });

                  const courseMarker = new googleMaps.Marker({
                    position: {
                      name: course.name,
                      lat: response.latitude,
                      lng: response.longitude
                    },
                    map,
                    title: course.name
                  });

                  marker.addListener('click', () => {
                    courseInfoWindow.open(map, courseMarker);
                  });
                },
                err => {

                },
                () => {
                  console.log('completed Address');
                }
              );
          });

          googleMaps.event.addListenerOnce(map, 'idle', () => {
            mapEle.classList.add('show-map');
          });

        },
        err => {

        },
        () => {

          console.log('completed Courses');

        });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const el = mutation.target as HTMLElement;
          isDark = el.classList.contains('dark-theme');
          if (map && isDark) {
            map.setOptions({
              styles: darkStyle
            });
          } else if (map) {
            map.setOptions({
              styles: []
            });
          }
        }
      });
    });
    observer.observe(appEl, {
      attributes: true
    });
  }
}

function getGoogleMaps(apiKey: string): Promise < any > {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });
}

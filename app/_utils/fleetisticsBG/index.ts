import { Loader } from '@googlemaps/js-api-loader';
import { disableMotion } from '../disableMotion';

let map: google.maps.Map;
let mapElem: Element | null = null;
const moveMapBy = 0.000001 * 3;
const latlng = {
    lat: 28.0882103,
    lng: -82.4576896
};

// var myStyles = [
//     {
//         featureType: "all",
//         elementType: "labels",
//         stylers: [
//               { visibility: "off" }
//         ]
//     },
//     {
//         featureType: "poi",
//         elementType: "labels",
//         stylers: [
//               { visibility: "off" }
//         ]
//     }
// ];

export function initFleetisticsBG () {
    new Loader({
        apiKey: "AIzaSyDrktX3psQRb99tv96YY4HxnJf_Tqv-UvY",
        version: "weekly",
        //   ...additionalOptions,
    }).importLibrary('maps')
        .then((google) => {
            mapElem = document.querySelector("#experience-fleetistics .jd-slant__bg");

            if (!mapElem) {
                return;
            }

            map = new google.Map(mapElem as HTMLElement, {
                center: latlng,
                zoom: 18,
                heading: -50,
                tilt: 150,
                mapId: "5d1feb3d85ffb2af",
                disableDefaultUI: true,
                gestureHandling: "none",
                // suppressMarkers: true
                // styles: myStyles
            });
        })
        .catch(e => {
            // do something
        });
}

export function animateFleetisticsBG () {
    if (
        map
        && !disableMotion('disableFleetisticsMotion')
        && mapElem?.classList.contains('visible')) {

        latlng.lat -= moveMapBy;
        // latlng.lng -= addBy;

        map.setCenter(latlng);

        // map.moveCamera({
        //     center: latlng
        // });
    }
}
import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
let mapElem: Element | null = null;
const latlng = {
    lat: 27.9517579,
    lng: -82.4600397
}

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
                heading: 20,
                tilt: 150,
                mapId: "5d1feb3d85ffb2af",
                disableDefaultUI: true,
                gestureHandling: "none",
                // suppressMarkers: true
            });

            window.map = map;

            animate();
        })
        .catch(e => {
            // do something
        });
}

function animate () {
    if (map && mapElem?.classList.contains('visible')) {
        const addBy = .0000005;

        latlng.lat += addBy;
        latlng.lng += addBy;

        map.setCenter(latlng);
    }

    requestAnimationFrame(animate);
}
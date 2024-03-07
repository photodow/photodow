import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
let mapElem: Element | null = null;
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

            window.map = map;
            
            animate();
        })
        .catch(e => {
            // do something
        });
}

function animate () {
    if (map && mapElem?.classList.contains('visible')) {
        const addBy = 0.000001;

        latlng.lat -= addBy;
        // latlng.lng -= addBy;

        map.setCenter(latlng);

        // map.moveCamera({
        //     center: latlng
        // });
    }

    requestAnimationFrame(animate);
}
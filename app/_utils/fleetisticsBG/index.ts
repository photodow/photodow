import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
const latlng = {
    lat: 27.9517579,
    lng: -82.4600397
}

export function initFleetisticsBG () {
    new Loader({
        apiKey: "AIzaSyDrktX3psQRb99tv96YY4HxnJf_Tqv-UvY",
        version: "weekly",
        //   ...additionalOptions,
    })
    .importLibrary('maps')
    .then((google) => {
        const htmlElem = document.querySelector("#experience-fleetistics .jd-slant__bg");

        if (!htmlElem) {
            return;
        }

        map = new google.Map(htmlElem as HTMLElement, {
            center: latlng,
            zoom: 18,
            heading: 20,
            tilt: 150,
            mapId: "5d1feb3d85ffb2af",
            disableDefaultUI: true,
            gestureHandling: "none",
            // suppressMarkers: true
        });

        animate();
    })
    .catch(e => {
        // do something
    });
}

function animate () {
    if (!map) {
        return false;
    }

	const addBy = .0000005;

    latlng.lat += addBy;
    latlng.lng += addBy;

    map.setCenter(latlng);

    requestAnimationFrame(animate);
}

// const loader = new Loader({
//   apiKey: "AIzaSyDrktX3psQRb99tv96YY4HxnJf_Tqv-UvY",
//   version: "weekly",
// //   ...additionalOptions,
// });

// loader
//   .importLibrary('maps')
//   .then((google) => {
//     const htmlElem = document.querySelector("#experience-fleetistics .jd-slant__bg");

//     if (!htmlElem) {
//         return;
//     }

//     map = new google.Map(htmlElem as HTMLElement, {
//         center: {
//             lat: 28.2360169,
//             lng: -82.356506,
//         },
//         zoom: 18,
//         heading: 20,
//         tilt: 150,
//         mapId: "5d1feb3d85ffb2af",
//         disableDefaultUI: true,
//         gestureHandling: "none",
//         // suppressMarkers: true
//     });
//   })
//   .catch(e => {
//     // do something
//   });

// loader.then(() => {

// });

// loader.load().then(async () => {
//   const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
//   map = new Map(document.getElementById("map") as HTMLElement, {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 8,
//   });
// });

 
// function initMap() {
// //   map = new google.maps.Map(document.getElementById("map"), {
// //     center: {
// //       lat: 28.2360169,
// //       lng: -82.356506,
// //     },
// //     zoom: 18,
// //     heading: 20,
// //     tilt: 150,
// //     mapId: "5d1feb3d85ffb2af",
// //     disableDefaultUI: true,
// //     gestureHandling: "none",
// //     // suppressMarkers: true
// //   });
  
//   animate();
// }

// function animate () {
//     if (!map) {
//         return false;
//     }

// 	const add = .000027;
//     const newCenter = map.getCenter();

//     map.setCenter({
//         lat: newCenter.lat() + add,
//         lng: newCenter.lng() + add
//     });

//     requestAnimationFrame(animate);
// }

// window.initMap = initMap;

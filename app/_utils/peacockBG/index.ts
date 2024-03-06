import * as THREE from 'three';
import { createImageURL, initTMDB } from './tmdb';
import { PeacockBgSettings } from '../../_types/peacockBG';
import { PosterSizes, TMDB, TMDB_Config, TMDB_Movie, TMDB_Result, TMDB_TV } from '../../_types/TMDB';

let assetGroupY = 0;
let tmdb: TMDB;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let _settings: PeacockBgSettings;
let assetGroup: THREE.Group;
const posterCollection: THREE.Group[] = [];

export function initPeacockBG () {
    const selector = `#experience-peacock`;
    const container = document.querySelector(selector);

    if (container && !renderer) {
        tmdb = initTMDB(4);
        initCanvas(container);
        initScene();

        tmdb.config.then(config => {
            tmdb.results.then(results => {
                renderPosters(config, results.splice(0, settings().poster.cols * settings().poster.rows));
                // animate();
            });
        })
        // set event listeners
    }
}

function settings () {
    if (!_settings) {
        const windowWidth = 1056;
        _settings = {
            canvas: {
                h: windowWidth * 414 / 1075,
                w: windowWidth,
            },
            poster: {
                h: 40,
                w: 27,
                cols: 11,
                rows: 10,
                padding: 2,
                resIndex: PosterSizes.w92,
            },
            startingY: 0,
        };

        _settings.startingY = -_settings.poster.h - _settings.poster.padding;
    }

    return _settings;
}

function initCanvas (parent: Element) {
    const container = document.createElement('div');
    renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(settings().canvas.w, settings().canvas.h);

    container.classList.add('jd-peacock-bg');
    container.append(renderer.domElement);
    parent.append(container);
}

function initScene () {
    scene = new THREE.Scene();

    initAssetGroup();
    initSpotlight();
    initCamera();

    animate(); // fire only when in view? and/or when scrolling?
}

function animate() {
    // if (!scrollStatus && !disableAnimate) {
    //     scrollPosters();
    // }

    assetGroup.position.y = assetGroupY;

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }

	requestAnimationFrame(animate);
}

function initCamera () {
    const aspect = settings().canvas.w / settings().canvas.h * .5;
    camera = new THREE.PerspectiveCamera(75, aspect, .01, 1000);
    camera.rotation.x = .6;
    camera.position.z = 100;
    camera.position.y = settings().poster.h * 1.5;
}

function initSpotlight () {
    const spotLight = new THREE.PointLight(0xffffff, 2500, 500);
    spotLight.position.x = 0;
    spotLight.position.y = settings().poster.h * 1.5;
    spotLight.position.z = 50;
    scene.add(spotLight);
}

function initAssetGroup () {
    assetGroup = new THREE.Group();
    assetGroup.position.y = settings().startingY;
    assetGroup.position.x = -((settings().poster.w * settings().poster.cols) + (settings().poster.padding * settings().poster.cols-1)) / 2; // offset and center
    scene.add(assetGroup);
}

function Poster (url: string) {
    const posterShape = new THREE.Shape();
    roundedRect(posterShape, 0, 0, settings().poster.w, settings().poster.h, 3);

    const textureLoader = new THREE.TextureLoader();
    const posterGeometry = new THREE.ShapeGeometry(posterShape);

    const posterTexture = textureLoader.load(url);
    posterTexture.colorSpace = THREE.SRGBColorSpace;
    posterTexture.wrapS = posterTexture.wrapT = THREE.RepeatWrapping;
    posterTexture.repeat.set(.037, .025);

    const material = new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        map: posterTexture,
    });

    return new THREE.Mesh(posterGeometry, material);
}

function roundedRect(
    ctx: THREE.Shape,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
    ctx.lineTo(x + width - radius, y + height);
    ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    ctx.lineTo(x + width, y + radius);
    ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
    ctx.lineTo(x + radius, y);
    ctx.quadraticCurveTo(x, y, x, y + radius);
}

function renderPosters (config: TMDB_Config, assetList: TMDB_Result[]) {
    // add poster placeholders, and then load images later?

    let x = 0;
    let y = 0;
    let rowGroup: THREE.Group;

    assetList.forEach((asset, i) => {
        if (i % settings().poster.cols === 0) {
            y += settings().poster.h + settings().poster.padding;
            x = 0;

            rowGroup = new THREE.Group();
            rowGroup.position.y = y;
            assetGroup.add(rowGroup);
            posterCollection.push(rowGroup);
        } else {
            x += settings().poster.w + settings().poster.padding;
        }

        const url = createImageURL(config.images.secure_base_url, config.images.poster_sizes[settings().poster.resIndex], asset.poster_path);

        const poster = Poster(url);
        poster.position.x = x;
        poster.name = (asset as TMDB_TV).name || (asset as TMDB_Movie).title;
        
        rowGroup.add(poster);
        rowGroup.name += `${poster.name},`;
    });
}














// load data

// let assetGroupY = 0;
// let scrollStatus = false;
// let waitForIt;









// init();
// animate();

// document.addEventListener('mousewheel', e => {
//     clearTimeout(waitForIt);
//     scrollStatus = true;
//     scrollPosters(Math. abs(e.deltaY));
    
//     waitForIt = window.setTimeout(() => {
//         scrollStatus = false;
//     }, 50);
// });

// function scrollPosters (moveY = .1) {
//     if (assetGroup.position.y >= 0) {
//         loopPosters();
//         assetGroupY = startingY;
//     } else {
//         assetGroupY += moveY;
//     }
// }

// function loopPosters () {
//     if (posterCollection.length) {
//         const lastY = (settings.poster.h * posterCollection.length) + (settings.poster.padding * (posterCollection.length-1));

//         for (let i = 0; i < posterCollection.length; i++) {
//             const row = posterCollection[i];

//             if (row.position.y >= lastY) {
//                 row.position.y = -startingY;
//             } else {
//                 row.position.y += -startingY;;
//             }     
//         }
//     }
// }

// async function init () {
//     const assetList = shuffleList([
//         // ...(await fetchAssetList('tv', 1)).results,
//         // ...(await fetchAssetList('tv', 2)).results,
//         // ...(await fetchAssetList('tv', 3)).results,
//         // ...(await fetchAssetList('movie', 1)).results,
//         // ...(await fetchAssetList('movie', 2)).results,
//         // ...(await fetchAssetList('movie', 3)).results
//     ]).splice(0, settings.poster.cols * settings.poster.rows);
// }
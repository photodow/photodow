import * as THREE from 'three';
import { createImageURL, initTMDB, shuffleList } from './tmdb';
import { PeacockBgSettings } from '../../_types/peacockBG';
import { PosterSizes, TMDB, TMDB_Movie, TMDB_TV } from '../../_types/TMDB';
import urlParams from '../urlParams';

// todo: add a motion pause button?

let assetGroupY = 0;
let tmdb: TMDB;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let _settings: PeacockBgSettings;
let assetGroup: THREE.Group;
const posterRows: THREE.Group[] = [];

export function initPeacockBG () {
    const selector = `#experience-peacock`;
    const container = document.querySelector(selector);

    if (container && !renderer) {
        initCanvas(container);
        initScene();

        renderPosters();
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
                resIndex: PosterSizes.w154,
            },
            startingY: 0,
        };

        _settings.startingY = -_settings.poster.h - _settings.poster.padding;
    }

    return _settings;
}

function initCanvas (parent: Element) {
    const _settings = settings();
    const container = document.createElement('div');
    renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(_settings.canvas.w, _settings.canvas.h);

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
    if (!urlParams().has('disableMotion') && !urlParams().has('disablePeacockMotion')) {
        scrollPosters();
    }

    assetGroup.position.y = assetGroupY;

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }

	requestAnimationFrame(animate);
}

function initCamera () {
    const _settings = settings();
    const aspect = _settings.canvas.w / _settings.canvas.h * .5;
    camera = new THREE.PerspectiveCamera(75, aspect, .01, 1000);
    camera.rotation.x = .6;
    camera.position.z = 100;
    camera.position.y = _settings.poster.h * 1.5;
}

function initSpotlight () {
    const spotLight = new THREE.PointLight(0xffffff, 2500, 500);
    spotLight.position.x = 0;
    spotLight.position.y = settings().poster.h * 1.5;
    spotLight.position.z = 50;
    scene.add(spotLight);
}

function initAssetGroup () {
    const _settings = settings();
    assetGroup = new THREE.Group();
    assetGroup.position.y = _settings.startingY;
    assetGroup.position.x = -((_settings.poster.w * _settings.poster.cols) + (_settings.poster.padding * _settings.poster.cols-1)) / 2; // offset and center
    scene.add(assetGroup);
}

function PosterSymbol () {
    const _settings = settings();
    const posterShape = new THREE.Shape();
    roundedRect(posterShape, 0, 0, _settings.poster.w, _settings.poster.h, 3);

    const posterGeometry = new THREE.ShapeGeometry(posterShape);

    const material = new THREE.MeshStandardMaterial({
        color: 0x555555,
    });

    return new THREE.Mesh(posterGeometry, material);
}

function loadPosterImages () {
    tmdb = initTMDB(4);

    tmdb.config.then(config => {
        tmdb.results.then(results => {
            const shuffledResults = shuffleList(results);
            const _settings = settings();
            const totalRows = posterRows.length;

            for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
                const row = posterRows[rowIndex].children;
                const rowLength = row.length;

                for (let colIndex = 0; colIndex < rowLength; colIndex++) {
                    const poster = row[colIndex];
                    const textureLoader = new THREE.TextureLoader();
                    const resultIndex = rowIndex * _settings.poster.rows + colIndex;
                    const asset = shuffledResults[resultIndex];

                    const url = createImageURL(
                        config.images.secure_base_url,
                        config.images.poster_sizes[_settings.poster.resIndex],
                        asset.poster_path
                    );

                    const posterTexture = textureLoader.load(url);
                    posterTexture.colorSpace = THREE.SRGBColorSpace;
                    posterTexture.wrapS = posterTexture.wrapT = THREE.RepeatWrapping;
                    posterTexture.repeat.set(.037, .025);

                    (poster as THREE.Mesh).material = new THREE.MeshStandardMaterial({
                        color: 0xFFFFFF,
                        map: posterTexture,
                    });

                    poster.name = (asset as TMDB_TV).name || (asset as TMDB_Movie).title;
                }
            }
        });
    })
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

function renderPosters () {
    const _settings = settings();
    const count = _settings.poster.rows * _settings.poster.cols;

    let x = 0;
    let y = 0;
    let rowGroup: THREE.Group = new THREE.Group();

    for (let i = 0; i < count; i++) {
        if (i % _settings.poster.cols === 0) {
            y += _settings.poster.h + _settings.poster.padding;
            x = 0;

            rowGroup = new THREE.Group();
            rowGroup.position.y = y;
            assetGroup.add(rowGroup);
            posterRows.push(rowGroup);
        } else {
            x += _settings.poster.w + _settings.poster.padding;
        }

        const poster = PosterSymbol();
        poster.position.x = x;
        
        rowGroup.add(poster);
    }

    loadPosterImages();
}

function scrollPosters (moveY = .1) {
    if (assetGroup.position.y >= 0) {
        loopPosters();
        assetGroupY = settings().startingY;
    } else {
        assetGroupY += moveY;
    }
}

function loopPosters () {
    const _settings = settings();

    if (posterRows.length) {
        const lastY = (_settings.poster.h * posterRows.length) + (_settings.poster.padding * (posterRows.length-1));

        for (let i = 0; i < posterRows.length; i++) {
            const row = posterRows[i];

            if (row.position.y >= lastY) {
                row.position.y = -_settings.startingY;
            } else {
                row.position.y += -_settings.startingY;
            }     
        }
    }
}
import * as THREE from "three";
import { createImageURL, initTMDB } from "./tmdb";
import { PeacockBgSettings } from "../../_types/peacockBG";
import { PosterSizes, TMDB, TMDB_Movie, TMDB_TV } from "../../_types/TMDB";
import { disableMotion } from "../disableMotion";
import { shuffleList } from "../shuffleList";

let assetGroupY = 0;
let tmdb: TMDB;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let _settings: PeacockBgSettings;
let assetGroup: THREE.Group;
let container: null | Element;
const posterRows: THREE.Group[] = [];

export function initPeacockBG() {
    const selector = `#experience-peacock`;
    const parent = document.querySelector(selector);

    if (parent) {
        if (!renderer) {
            initScene();
            renderPosters();
        }

        initCanvas(parent);
    }
}

function settings() {
    if (!_settings) {
        const windowWidth = 1056;
        _settings = {
            canvas: {
                h: (windowWidth * 414) / 1075,
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

function initCanvas(parent: Element) {
    const _settings = settings();
    container = document.createElement("div");
    renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(_settings.canvas.w, _settings.canvas.h);

    container.classList.add("jd-peacock-bg");
    container.classList.add("jd-in-view");
    container.append(renderer.domElement);
    parent.append(container);
}

function initScene() {
    scene = new THREE.Scene();

    initAssetGroup();
    initSpotlight();
    initCamera();
}

export function animatePeacockBG() {
    if (container?.classList.contains("visible")) {
        if (!disableMotion("disablePeacockMotion")) {
            scrollPosters();
        }

        singleRender();
    }
}

function singleRender() {
    if (renderer && scene && camera && assetGroup) {
        assetGroup.position.y = assetGroupY;
        renderer.render(scene, camera);
    }
}

function initCamera() {
    const _settings = settings();
    const aspect = (_settings.canvas.w / _settings.canvas.h) * 0.5;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.01, 1000);
    camera.rotation.x = 0.6;
    camera.position.z = 100;
    camera.position.y = _settings.poster.h * 1.5;
}

function initSpotlight() {
    const spotLight = new THREE.PointLight(0xffffff, 2500, 500);
    spotLight.position.x = 0;
    spotLight.position.y = settings().poster.h * 1.5;
    spotLight.position.z = 50;
    scene.add(spotLight);
}

function initAssetGroup() {
    const _settings = settings();
    assetGroup = new THREE.Group();
    assetGroup.position.y = _settings.startingY;
    assetGroup.position.x =
        -(
            _settings.poster.w * _settings.poster.cols +
            (_settings.poster.padding * _settings.poster.cols - 1)
        ) / 2; // offset and center
    scene.add(assetGroup);
}

function PosterSymbol() {
    const _settings = settings();
    const posterShape = new THREE.Shape();
    roundedRect(posterShape, 0, 0, _settings.poster.w, _settings.poster.h, 3);

    const posterGeometry = new THREE.ShapeGeometry(posterShape);

    const material = new THREE.MeshStandardMaterial({
        color: 0x555555,
    });

    return new THREE.Mesh(posterGeometry, material);
}

function loadPosterImages() {
    tmdb = initTMDB(4);

    tmdb.config.then((config) => {
        tmdb.results.then((results) => {
            const shuffledResults = shuffleList(results);
            const _settings = settings();
            const totalRows = posterRows.length;
            let skipAmount = 0; // skip if data is missing, and need to offset array

            for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
                const row = posterRows[rowIndex].children;
                const rowLength = row.length;

                for (let colIndex = 0; colIndex < rowLength; colIndex++) {
                    const poster = row[colIndex];
                    const textureLoader = new THREE.TextureLoader();
                    let resultIndex, asset, url;

                    do {
                        resultIndex =
                            rowIndex * _settings.poster.rows +
                            colIndex +
                            skipAmount;
                        asset = shuffledResults[resultIndex];

                        if (!asset?.poster_path) {
                            skipAmount++;
                        }
                    } while (asset && !asset.poster_path);

                    if (asset && asset.poster_path) {
                        url = createImageURL(
                            config.images.secure_base_url,
                            config.images.poster_sizes[
                                _settings.poster.resIndex
                            ],
                            asset.poster_path,
                        );
                    }

                    if (!url) {
                        break;
                    }

                    const posterTexture = textureLoader.load(url);
                    posterTexture.colorSpace = THREE.SRGBColorSpace;
                    posterTexture.wrapS = posterTexture.wrapT =
                        THREE.RepeatWrapping;
                    posterTexture.repeat.set(0.037, 0.025);

                    (poster as THREE.Mesh).material =
                        new THREE.MeshStandardMaterial({
                            color: 0xffffff,
                            map: posterTexture,
                        });

                    poster.name =
                        (asset as TMDB_TV).name || (asset as TMDB_Movie).title;
                }
            }
        });
    });
}

function roundedRect(
    ctx: THREE.Shape,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
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

function renderPosters() {
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

function scrollPosters(moveY = 0.2) {
    if (assetGroup.position.y >= 0) {
        loopPosters();
        assetGroupY = settings().startingY;
    } else {
        assetGroupY += moveY;
    }
}

function loopPosters() {
    const _settings = settings();

    if (posterRows.length) {
        const lastY =
            _settings.poster.h * posterRows.length +
            _settings.poster.padding * (posterRows.length - 1);

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

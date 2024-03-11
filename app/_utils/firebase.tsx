
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { SiteData } from "../_types/SiteData";
import { Organization, Organizations } from "../_types/Organization";
import getDataId from "./getDataId";
import resetData from "./resetData";
import localStore from "./localStore";
import { mergeWith } from "lodash";
import handleOverride from "./handleOverride";
import { MainItem } from "../_types/Main";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAk-EtPkIkvUvU1YeaY9057fvKmgWYro-I",
  authDomain: "jamesdowme.firebaseapp.com",
  databaseURL: "https://jamesdowme-default-rtdb.firebaseio.com",
  projectId: "jamesdowme",
  storageBucket: "jamesdowme.appspot.com",
  messagingSenderId: "614771609443",
  appId: "1:614771609443:web:8c671a765277992d934d56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let localState: Partial<SiteData> | null = null;
let setState: Function | undefined;

init();

async function init () {
    resetData();

    const id = getDataId()?.replace(/-?test-?/g, '');
    let buildingData: Partial<SiteData> | null = null;

    buildingData = JSON.parse(localStore().getItem('siteData') as string);

    if (buildingData) {
        const weekAgo = new Date(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000));
        const storedLastUpdate = buildingData.main?.lastUpdate;
        const dataLastUpdate = await getData(`main/${id}/lastUpdate`); // check for last update

        if (
         !(
            dataLastUpdate
         && storedLastUpdate
         && new Date(dataLastUpdate) <= new Date(storedLastUpdate)
         && new Date(dataLastUpdate) > weekAgo
         )
        ) {
            // unset data so we can refresh downstream.
            buildingData = null;
        }
    }

    if (!buildingData) {
        buildingData = {};

        const waitForOrganizations = getData(`organizations`, buildingData);
        const waitForTheExtras = [
            waitForOrganizations,
            getData(`links`, buildingData),
            getData(`images`, buildingData),
            getData(`experiences`, buildingData),
            getData(`portfolio`, buildingData),
            // getData(`people`, buildingData),
            // getData(`testimonials`, buildingData)
        ]

        const mainItem = await getData(`main/${id}`) as MainItem;
        const defaultItem = await getData(`main/_default`);
        const baseItem = await getData(`main/${mainItem?._base}`) as MainItem || {};

        buildingData.main = mergeWith(
            mergeWith(defaultItem, baseItem, handleOverride),
            mainItem,
            handleOverride
        );

        updateState(buildingData);

        waitForOrganizations.then(() => {
            if (!buildingData?.main || !buildingData.organizations) {
                return;
            }

            const _metaOverride = buildingData.main._metaOverride;

            if (_metaOverride) {
                // retrieve organization data
                getOrgData(buildingData.organizations, _metaOverride?.orgKey).then(d => {
                    _metaOverride.org = d;
                    updateState(buildingData);
                });
            }
        });

        Promise.all(waitForTheExtras).then(() => {
            localStore().setItem('siteData', JSON.stringify(buildingData));
        });
    }
}

export async function getOrgData (orgs: Organizations, key: string | undefined): Promise<Organization | undefined> {
    if (!key) {
        return;
    }

    return orgs[key];
}

export async function getData (key: string, dataStore?: Record<string, object>): Promise<any> {

    const cache = JSON.parse(localStore().getItem('c') || '{}') || {};

    if (cache[key]) {
        return cache[key];
    }

    const starCountRef = ref(db, key);

    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            let data = null;

            if (snapshot && snapshot.val()) {
                data = snapshot.val();
            }

            cache[key] = data;

            localStore().setItem('c', JSON.stringify(cache));

            updateStateByKey(dataStore, key as keyof SiteData, data);
            resolve(data);
        });
    });
}

function updateState (data?: Partial<SiteData> | null) {
    if (!data || typeof setState !== 'function') {
        return;
    }

    localState = {...data};
    setState(localState);
}

function updateStateByKey<T extends keyof SiteData>(siteData?: Partial<SiteData> | null, key?: T, data?: SiteData[T]) {
    if (!siteData || !key || !data) {
        return;
    }

    siteData[key] = data;

    updateState(siteData as Partial<SiteData>);
}

export function initStateDB (callback?: Function) {
    setState = callback;

    if (localState && setState) {
        setState(localState);
    }
}
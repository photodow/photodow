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
    appId: "1:614771609443:web:8c671a765277992d934d56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let localState: Partial<SiteData> | null = null;
let setState: Function | undefined;

init();

async function init() {
    resetData();

    const id = getDataId()?.replace(/-?test-?/g, "");
    let buildingData: Partial<SiteData> | null = null;

    buildingData = JSON.parse(localStore().getItem("siteData") as string);

    if (buildingData) {
        const nowDate = new Date();
        const sevenDays = 1000 * 60 * 60 * 24 * 7;

        // check for last update in localStorage
        const localLastUpdate =
            buildingData.lastUpdate && new Date(buildingData.lastUpdate);

        const dbLastUpdate = await getData(`lastUpdate`);

        if (
            // did we register a lastUpdate? If not just pull data again to be safe.
            !localLastUpdate ||
            // Has it been over 7 days since our last update? If so, update it again.
            nowDate.valueOf() - localLastUpdate.valueOf() > sevenDays ||
            // Has the database been updated since the last local store? If so, update it.
            (dbLastUpdate && new Date(dbLastUpdate) > localLastUpdate)
        ) {
            buildingData = null;
        }
    }

    buildingData ??= { lastUpdate: new Date().valueOf() };

    const waitForTheExtras = [];
    let waitForOrgs: Promise<SiteData["organizations"]> | undefined;

    !buildingData.organizations &&
        waitForTheExtras.push(
            (waitForOrgs = getData(`organizations`, buildingData)),
        );
    !buildingData.links &&
        waitForTheExtras.push(getData(`links`, buildingData));
    !buildingData.images &&
        waitForTheExtras.push(getData(`images`, buildingData));
    !buildingData.experiences &&
        waitForTheExtras.push(getData(`experiences`, buildingData));
    !buildingData.portfolio &&
        waitForTheExtras.push(getData(`portfolio`, buildingData));
    // !buildingData.people && waitForTheExtras.push(getData(`people`, buildingData));
    // !buildingData.testimonials && waitForTheExtras.push(getData(`testimonials`, buildingData));

    if (!buildingData.main) {
        const mainItem = (await getData(`main/${id}`)) as MainItem;
        const defaultItem = await getData(`main/_default`);
        const baseItem =
            ((await getData(`main/${mainItem?._base}`)) as MainItem) || {};

        buildingData.main = mergeWith(
            mergeWith(defaultItem, baseItem, handleOverride),
            mainItem,
            handleOverride,
        );

        updateState(buildingData);
    }

    waitForOrgs?.then(() => {
        if (!buildingData?.main || !buildingData.organizations) {
            return;
        }

        const _metaOverride = buildingData.main._metaOverride;

        if (_metaOverride) {
            // retrieve organization data
            getOrgData(buildingData.organizations, _metaOverride?.orgKey).then(
                (d) => {
                    _metaOverride.org = d;
                    updateState(buildingData);
                },
            );
        }
    });

    Promise.all(waitForTheExtras).then(() => {
        localStore().setItem("siteData", JSON.stringify(buildingData));
        updateState(buildingData);
    });
}

export async function getOrgData(
    orgs: Organizations,
    key: string | undefined,
): Promise<Organization | undefined> {
    if (!key) {
        return;
    }

    return orgs[key];
}

export async function getData(
    key: string,
    dataStore?: Partial<SiteData>,
): Promise<any> {
    const starCountRef = ref(db, key);

    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            let data = null;

            if (snapshot && snapshot.val()) {
                data = snapshot.val();
            }

            updateStateByKey(dataStore, key as keyof SiteData, data);
            resolve(data);
        });
    });
}

function updateState(data?: Partial<SiteData> | null) {
    if (!data || typeof setState !== "function") {
        return;
    }

    localState = { ...data };
    setState(localState);
}

function updateStateByKey<T extends keyof SiteData>(
    siteData?: Partial<SiteData> | null,
    key?: T,
    data?: SiteData[T],
) {
    if (!siteData || !key || !data) {
        return;
    }

    siteData[key] = data;

    updateState(siteData as Partial<SiteData>);
}

export function initStateDB(callback?: Function) {
    setState = callback;

    if (localState && setState) {
        setState(localState);
    }
}

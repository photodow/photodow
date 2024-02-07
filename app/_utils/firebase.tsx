// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { SiteData } from "../_types/SiteData";
import { Experience, Experiences } from "../_types/Experience";
import { Image, Images } from "../_types/Image";
import { Link, Links } from "../_types/Link";
import { Organization, Organizations } from "../_types/Organization";
import { People, Person } from "../_types/Person";
import { Portfolio, PortfolioItem } from "../_types/Portfolio";
import { Testimonial, Testimonials } from "../_types/Testimonial";
import { sendGTMEvent } from '@next/third-parties/google'
import getDataId from "./getDataId";
import resetData from "./resetData";
import localStore from "./localStore";

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
const data: Promise<SiteData> = init();

async function init (): Promise<SiteData> {
    resetData();

    const id = getDataId();
    let buildingData: SiteData | null = null;

    buildingData = JSON.parse(localStore().getItem('siteData') as string);

    if (buildingData) {
        const weekAgo = new Date(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000));
        const storedLastUpdate = buildingData.main.lastUpdate;
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
        // refresh data
        buildingData = {
            experiences: await getData(`experiences`) as Experiences,
            images: await getData(`images`) as Images,
            links: await getData(`links`) as Links,
            organizations: await getData(`organizations`) as Organizations,
            people: await getData(`people`) as People,
            portfolio: await getData(`portfolio`) as Portfolio,
            testimonials: await getData(`testimonials`) as Testimonials,
            main: Object.assign(
                await getData(`main/_default`),
                await getData(`main/${getDataId()}`)
            )
        };

        const _metaOverride = buildingData.main._metaOverride;

        if (_metaOverride) {
            // retrieve organization data
            _metaOverride.org = await getOrgData(buildingData.organizations, _metaOverride?.orgKey);
        }

        localStore().setItem('siteData', JSON.stringify(buildingData));
    }

    return buildingData;
}

export async function getOrgData (orgs: Organizations, key: string | undefined): Promise<Organization | undefined> {
    if (!key) {
        return;
    }

    return orgs[key];
}

export async function getData (key: string): Promise<any> {
    const starCountRef = ref(db, key);

    return new Promise((resolve) => {
        onValue(starCountRef, (snapshot) => {
            let data = null;

            if (snapshot && snapshot.val()) {
                data = snapshot.val();
            }

            resolve(data);
        });
    });
}

export async function getSiteData(): Promise<SiteData> {
    return data;
}
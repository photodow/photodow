// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { SiteData } from "../types/SiteData";
import { Experience } from "../types/Experience";
import { Image } from "../types/Image";
import { Link } from "../types/Link";
import { Organization } from "../types/Organization";
import { Person } from "../types/Person";
import { PortfolioItem } from "../types/Portfolio";
import { Testimonial } from "../types/Testimonial";
import getDataId from "./getDataId";
import resetData from "./resetData";

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
    
    if (typeof localStorage !== 
    "undefined") {
        buildingData = JSON.parse(localStorage.getItem('siteData') as string);
    }

    if (buildingData) {
        const weekAgo = new Date(new Date().valueOf() - (7 * 24 * 60 * 60 * 1000));
        const storedLastUpdate = buildingData.main.lastUpdate;
        const dataLastUpdate = await getData(`main/${id}/lastUpdate`); // check for last update

        if (
            dataLastUpdate
         && storedLastUpdate
         && new Date(dataLastUpdate) <= new Date(storedLastUpdate)
         && new Date(dataLastUpdate) > weekAgo
        ) {
            // return stored data if it hasn't been updated since storing
            return buildingData;
        }
    }

    // refresh data
    buildingData = {
        experiences: await getData(`experiences`) as Experience[],
        images: await getData(`images`) as Image[],
        links: await getData(`links`) as Link[],
        organizations: await getData(`organizations`) as Organization[],
        people: await getData(`people`) as Person[],
        portfolio: await getData(`portfolio`) as PortfolioItem[],
        testimonials: await getData(`testimonials`) as Testimonial[],
        main: Object.assign(
            await getData(`main/_default`),
            await getData(`main/${getDataId()}`)
        )
    };


    return buildingData;
}

async function getData (key: string): Promise<any> {
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
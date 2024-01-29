// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { SiteData } from "../types/siteData";

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

type FetchedSiteData = Partial<SiteData> | null;

async function getUnmergedSiteData (id: string): Promise<FetchedSiteData> {
    const starCountRef = ref(db, id);

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

export async function getSiteData (override?: string): Promise<Partial<SiteData>> {
    const siteData: FetchedSiteData = await getUnmergedSiteData('default') || {};
    let overrideData: FetchedSiteData = {};

    if (override) {
        overrideData = await getUnmergedSiteData(override);
    }

    return Object.assign(siteData, overrideData);
}
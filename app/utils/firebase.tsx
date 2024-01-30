// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { SiteData } from "../types/SiteData";

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

async function getDefaultData (): Promise<SiteData | null> {
    return getUnmergedSiteData('default') as Promise<SiteData | null>;
}

async function getUnmergedSiteData (id: string): Promise<Partial<SiteData> | null> {
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

export async function getSiteData (override?: string | null): Promise<SiteData> {
    const siteData: SiteData | null = await getDefaultData();
    let overrideData: Partial<SiteData> | null = {};

    if (override) {
        overrideData = await getUnmergedSiteData(override);
    }

    return Object.assign(siteData || {}, overrideData) as Promise<SiteData>;
}
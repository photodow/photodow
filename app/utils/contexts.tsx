import { createContext } from "react";
import { SiteData } from "../types/siteData";

export const SiteDataContext = createContext<SiteData | null>(null);
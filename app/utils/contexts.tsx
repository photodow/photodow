import { createContext } from "react";
import { SiteData } from "../types/SiteData";

export const SiteDataContext = createContext<SiteData | null>(null);
import { createContext } from "react";
import { SiteData } from "../_types/SiteData";

export const SiteDataContext = createContext<Partial<SiteData> | null>(null);

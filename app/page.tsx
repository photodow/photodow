
import "./page.scss";

import { Metadata } from "next";
import { getSiteData } from "./utils/firebase";
import { PageProps } from "../.next/types/app/page";

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const siteData = await getSiteData(searchParams.id);

  return {
    title: `${siteData.name} | ${siteData.role}`,
    description: `${siteData.description}`,
  }
}

export default function Home() {
  return (
    <div className="cds--grid">
      <div className="cds--row">
        <div className="cds--col" style={{height: '1000px'}}>
          <p>Hi there, my name is James Dow 👋</p>
        </div>
      </div>
    </div>
  );
}

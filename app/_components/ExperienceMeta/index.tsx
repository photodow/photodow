"use client";

import "./index.scss";

import List from "../List";

import { ReactNode, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Experience, StartEndDate } from "../../_types/Experience";

interface Comp extends Partial<Experience> {
    className?: string;
}

export default function ExperienceMeta({
    className,
    start,
    end,
    location,
    type,
    credential,
}: Comp) {
    const [items, setItems] = useState<ReactNode[]>([]);

    const setEndValueData = useCallback(() => {
        const itemsData: ReactNode[] = [];

        if (credential) {
            itemsData.push(`${credential}`);
        }

        setStartEnd(itemsData, start, end);

        if (location) {
            itemsData.push(
                <Link
                    href={`https://www.google.com/maps/search/${location}`}
                    target="_blank"
                >{`${location} `}</Link>,
            );
        }

        if (type) {
            itemsData.push(`${type} `);
        }

        setItems(itemsData);
    }, [start, end, location, type, credential]);

    useEffect(() => {
        setEndValueData();
    }, [setEndValueData]);

    return !items?.length ? null : (
        <List
            items={items}
            className={`jd-meta${className ? ` ${className}` : ""}`}
        />
    );

    function setStartEnd(
        list: ReactNode[],
        start?: StartEndDate,
        end?: StartEndDate,
    ) {
        if (!start || !end) {
            return;
        }

        let startDate = formatDate(start.year, start.month);
        let endDate = formatDate(end.year, end.month);

        if (end.present) {
            end.year = new Date().getFullYear();
            endDate = "Present";
        }

        list.push(`${end.year - start.year} yrs `);
        list.push(`${startDate}–${endDate} `);
    }

    function formatDate(year?: number, month?: string) {
        return (month ? `${month}/` : "") + year;
    }
}

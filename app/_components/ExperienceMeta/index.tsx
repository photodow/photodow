"use client";

import "./index.scss";

import List from "../List";

import { ReactNode, useCallback, useEffect, useState } from "react";

type Comp = {
    start?: number,
    end?: number | string
    location?: string
    type?: string
    credential?: string
    className?: string,
}

export default function ExperienceMeta({ className, start, end, location, type, credential }: Comp) {
  const [items, setItems] = useState<ReactNode[]>([]);

  const setEndValueData = useCallback(() => {
    const itemsData: ReactNode[] = [];

    if (credential) {
        itemsData.push(`${credential} `);
    }

    setStartEnd(itemsData, start, end);

    if (location) {
        itemsData.push(<a href={`https://www.google.com/maps/search/${location}`} target="_blank">{`${location} `}</a>);
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
    <List items={items}
      className={`jd-meta${className ? ` ${className}` : ''}`} />
  );

  function setStartEnd (list: ReactNode[], start?: number, end?: number | string) {
    if (!start || !end) {
        return;
    }

    const endValue = typeof end === 'number' ? end : new Date().getFullYear();

    list.push(`${endValue - start} yrs `);
    list.push(`01/${start}–01/${end} `);
  }
}
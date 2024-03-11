'use client';

import Error from "next/error";
import App from "./_components/App";
import { CarbonTheme } from "./_types/carbon";
import { HeaderSize } from "./_types/Header";
import { useEffect } from "react";
import { overrideTitle } from "./_utils/metadata";

export default function NotFound() {
  useEffect(() => {
    overrideTitle('James Dow | Page Not Found');
  }, []);

  return (
  <App headerSize={HeaderSize.Medium} theme={CarbonTheme.g10}>
    <Error statusCode={404} />
  </App>
  );
}

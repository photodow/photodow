'use client';

import Error from "next/error";
import App from "./_components/App";
import { CarbonTheme } from "./_types/carbon";
import { HeaderSize } from "./_types/Header";

export default function NotFound() {
  return (
  <App headerSize={HeaderSize.Medium} theme={CarbonTheme.g10}>
    <Error statusCode={404} />
  </App>
  );
}

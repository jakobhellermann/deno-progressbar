import { WidgetFn } from "./progressbar.ts";

export const percentageWidget: WidgetFn = (i: number, total: number) =>
  `${(i / total * 100).toFixed(2)}%`;
export const amountWidget: WidgetFn = (i: number, total: number) =>
  `${i}/${total}`;

/* export function spinnerWidget(i: number): string {
  const chars = "▁▃▄▅▆▇█".split("");
  const v = Math.sin(i / 6) / 2 + 0.5;
  return chars[Math.floor(v * chars.length)];
} */

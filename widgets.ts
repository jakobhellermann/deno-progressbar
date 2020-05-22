import { WidgetFn } from "./progressbar.ts";

export const percentageWidget: WidgetFn = (i: number, total: number) =>
  `${(i / total * 100).toFixed(2)}%`;
export const amountWidget: WidgetFn = (i: number, total: number) =>
  `${i}/${total}`;

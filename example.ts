import ProgressBar from "./progressbar.ts";
import { percentageWidget, amountWidget } from "./widgets.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pb = new ProgressBar(30, 60, percentageWidget, amountWidget);

for (let i = 0; i < 30; i++) {
  await pb.update(i);
  await sleep(100);
}
await pb.finish();

import ProgressBar from "https://deno.land/x/progressbar@v0.2.0/progressbar.ts";
import {
  percentageWidget,
  amountWidget,
} from "https://deno.land/x/progressbar@v0.2.0/widgets.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const widgets = [percentageWidget, amountWidget];
const pb = new ProgressBar({ total: 200, widgets });

for (let i = 0; i < pb.total; i++) {
  await pb.update(i);
  await sleep(50);
}
await pb.finish();

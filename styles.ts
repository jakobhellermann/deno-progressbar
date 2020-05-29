import ProgressBar, { StyleFn } from "./progressbar.ts";

export function simple(i: number, pb: ProgressBar): string {
  const filled = Math.round((pb.width * i) / pb.total);
  const pct = (i / pb.total);

  const filledInBounds = Math.min(Math.max(filled, 0), pb.width);
  const bar = "=".repeat(filledInBounds) +
    "-".repeat(pb.width - filledInBounds);

  return `[${bar}]`;
}

const defaultChars = ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "█"];

export function bar(i: number, pb: ProgressBar, chars = defaultChars): string {
  const pct = (i / pb.total);
  const filled = pb.width * pct;

  const filledWhole = Math.floor(filled);
  const remainder = filled % 1;

  const transition = filledWhole < pb.width
    ? chars[Math.floor(remainder * chars.length)]
    : "";

  const bar = chars[chars.length - 1].repeat(filledWhole);
  const empty = " ".repeat(Math.max(0, pb.width - filledWhole - 1));

  const lsep = "", rsep = "▕";
  return `[${bar}${transition}${empty}]`;
}

export function customBar(chars: string[]): StyleFn {
  return (i, pb) => bar(i, pb, chars);
}

export type WidgetFn = (i: number, total: number) => string;

class ProgressBar {
  private encoder = new TextEncoder();

  private width: number;
  private total: number;

  private widgets: WidgetFn[];

  private lastValue = 0;

  constructor(
    total: number,
    width: number,
    ...widgets: WidgetFn[]
  ) {
    this.total = total;
    this.width = width;
    this.widgets = widgets;
  }

  public async start(): Promise<void> {
    await this.update(0);
  }

  public async update(value?: number): Promise<void> {
    const i = value ?? this.lastValue + 1;
    this.lastValue = i;

    const filled = Math.round((this.width * i) / this.total);
    const pct = (i / this.total);

    const filledInBounds = Math.min(Math.max(filled, 0), this.width);
    const bar = "=".repeat(filledInBounds) +
      "-".repeat(this.width - filledInBounds);

    const widgetText = this.widgets.map((w) => w(i, this.total)).join(" ");
    const text = `\r[${bar}] ${widgetText}\x1b[?25l`;
    await Deno.stdout.write(this.encoder.encode(text));
  }

  public async finish(): Promise<void> {
    await this.update(this.total);
    await Deno.stdout.write(this.encoder.encode("\x1b[?25h\n"));
  }
}

export default ProgressBar;

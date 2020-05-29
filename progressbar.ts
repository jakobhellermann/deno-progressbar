import { bar } from "./styles.ts";

export type WidgetFn = (i: number, total: number) => string;
export type StyleFn = (i: number, pb: ProgressBar) => string;

export interface InitOptions {
  width?: number;
  total?: number;
  style?: StyleFn;
  widgets?: WidgetFn[];
}

class ProgressBar {
  private encoder = new TextEncoder();

  public width: number;
  public total: number;

  private widgets: WidgetFn[];
  private style: StyleFn;

  private lastValue = 0;

  constructor(
    options?: InitOptions,
  ) {
    this.width = options?.width ?? 60;
    this.total = options?.total ?? 30;
    this.widgets = options?.widgets ?? [];
    this.style = options?.style ?? bar;
  }

  public async start(): Promise<void> {
    await this.update(0);
  }

  public async update(value?: number): Promise<void> {
    const i = value ?? this.lastValue + 1;
    this.lastValue = i;

    const bar = this.style(i, this);

    const widgetText = this.widgets.map((w) => w(i, this.total)).join(" ");
    const text = `\r${bar} ${widgetText}\x1b[?25l`;
    await Deno.stdout.write(this.encoder.encode(text));
  }

  public async finish(): Promise<void> {
    await this.update(this.total);
    await Deno.stdout.write(this.encoder.encode("\x1b[?25h\n"));
  }
}

export default ProgressBar;

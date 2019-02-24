import * as path from "path";
import * as fs from "fs";
import * as colors from "colors";

interface UggoInitializer {
  destination: string;
  filename: string;
  silent: boolean;
  json: boolean;
}

export class Uggo {
  protected destination: string;
  public silent: boolean = true;
  public json: boolean = false;

  public constructor(instance: UggoInitializer) {
    this.destination = path.resolve(`${instance.destination}` || "logs");
    this.silent = instance.silent;
    this.json = instance.json;

    this.init();
  }

  /**
   * Initialize Uggo
   */
  public init(): void {
    const destination: string = this.getDestination();

    const doesFolderExist: boolean = this.checkPathExist(destination);

    if (!doesFolderExist) {
      fs.mkdirSync(destination);
    }
  }

  /**
   * Get destination of destination folder
   */
  public getDestination(): string {
    return this.destination;
  }

  /**
   * Check if a path exist in the filesystem
   */
  public checkPathExist(path: string): boolean {
    return fs.existsSync(path) ? true : false;
  }

  /**
   * Get the basic date in format "02-25-19"
   */
  public getDate(): string {
    const d: Date = new Date();

    let day: number = d.getDate();
    let month: number = d.getMonth() + 1;
    let year: number = d.getFullYear();

    day > 10 && (day = Number(`0${day}`));
    month < 10 && (month = Number(`0${month}`));

    const date = `${month}-${day}-${year}`;

    return date;
  }

  /**
   * Get the timestamp of format 02-25-2019 [02:28:56]
   */
  public getTimestamp(): string {
    let date: Date = new Date();
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec: any = date.getSeconds();

    day < 10 && (day = `0${day}`);
    month < 10 && (month = `0${month}`);
    sec < 10 && (sec = `0${sec}`);

    const timestamp = `${month}-${day}-${year} [${hour}:${min}:${sec}]`;

    return timestamp;
  }

  /**
   * Format the log as JSON
   */
  public formatJSONLog(obj: any): string {
    let opRes: any = new Object();

    opRes.timestamp = this.getTimestamp();

    Object.keys(obj).forEach(key => (opRes[key] = obj[key]));

    return JSON.stringify(opRes);
  }

  /**
   * Format the log as String
   */
  public formatStringLog(level: string, message: string): string {
    const opRes: string = `[${level}] ${this.getTimestamp()} ${message}`;

    return opRes;
  }

  /**
   * Log the error message on the console
   */
  public logErrorMessage(level: string, message: string): void {
    const { log } = console;
    const lvl: string = colors.red(`[${level}]`);
    const stamp: string = colors.yellow(this.getTimestamp());

    log(`${lvl} ${stamp} ${message}`);
  }

  /**
   * Log the info message on the console
   */
  public logInfoMessage(level: string, message: string): void {
    const { log } = console;
    const lvl: string = colors.green(`[${level}]`);
    const stamp: string = colors.yellow(this.getTimestamp());

    log(`${lvl} ${stamp} ${message}`);
  }

  public error(message: string): void {
    // Setup log destination
    const destination: string = this.getDestination();
    const filepath: string = `${destination}/error-${this.getDate()}.log`;

    // Check if file exist
    const doesFileExist: boolean = this.checkPathExist(filepath);

    const fJSON: string = this.formatJSONLog({ level: "error", message });
    const fString: string = this.formatStringLog("error", message);

    let fMessage: string = this.json ? fJSON + "\n" : fString + "\n";

    // Create stream & write to file
    const wstream = fs.createWriteStream(filepath, { flags: "a" });
    wstream.write(fMessage);
    wstream.end();

    // Log to console based on options
    this.silent ||
      (String(this.silent) !== "undefined" &&
        this.logErrorMessage("error", message));
  }

  public info(message: string): void {
    // Setup log destination
    const destination: string = this.getDestination();
    const filepath: string = `${destination}/info-${this.getDate()}.log`;

    const fJSON: string = this.formatJSONLog({ level: "info", message });
    const fString: string = this.formatStringLog("info", message);

    let fMessage: string = this.json ? fJSON + "\n" : fString + "\n";

    // Create stream & write to file
    const wstream = fs.createWriteStream(filepath, { flags: "a" });
    wstream.write(fMessage);
    wstream.end();

    // Log to console based on options
    this.silent ||
      (String(this.silent) !== "undefined" &&
        this.logInfoMessage("info", message));
  }
}

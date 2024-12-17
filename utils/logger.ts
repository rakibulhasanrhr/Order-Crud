import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
import "winston-daily-rotate-file";
import { MongoDB } from "winston-mongodb";
import chalk from "chalk";

const { combine, timestamp, printf, colorize } = format;

const logFormat = (serviceName: string = "NONE") =>
  printf(({ level, message, timestamp }) => {
    let levelColor = chalk.white;

    switch (level) {
      case "info":
        levelColor = chalk.blue;
        break;
      case "warn":
        levelColor = chalk.yellow;
        break;
      case "error":
        levelColor = chalk.red;
        break;
      case "debug":
        levelColor = chalk.green;
        break;
      default:
        break;
    }

    return `[${levelColor(level)}] [${chalk.gray(timestamp)}] [${chalk.cyan(
      serviceName
    )}] ${message}`;
  });

class Logger {
  private logger: WinstonLogger;

  constructor(serviceName: string) {
    this.logger = createLogger({
      level: "info",
      format: combine(timestamp(), logFormat(serviceName)),
      transports: [
        new transports.Console({
          format: combine(colorize(), logFormat(serviceName)),
        }),
        // new MongoDB({
        //   db: `${process.env.MONGODB_URL}`,
        //   collection: "log",
        //   level: "info",
        // }),
      ],
    });

    this.replaceConsole(); //? Uncomment to replace console with logger
  }

  private replaceConsole() {
    console.log = (...args) => this.logger.info(JSON.stringify(args, null));
    console.error = (...args) =>
      this.logger.error(JSON.stringify(args, null, 2));
    console.warn = (...args) => this.logger.warn(JSON.stringify(args, null));
    console.info = (...args) => this.logger.info(JSON.stringify(args, null));
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }
}

export default Logger;

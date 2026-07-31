import winston, { type Logform } from "winston";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const isDevelopment = (process.env.NODE_ENV || "development") === "development";

const level = () => (isDevelopment ? "debug" : "http");

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  ...(isDevelopment
    ? [
        winston.format.colorize({ all: true }),
        winston.format.printf((info: Logform.TransformableInfo) => {
          const { timestamp, level, message, ...rest } = info as Record<string, unknown>;
          const extra = Object.keys(rest).length ? " " + JSON.stringify(rest) : "";
          return `${timestamp} ${level}: ${message}${extra}`;
        }),
      ]
    : [winston.format.json()]),
);

const transports = [new winston.transports.Console()];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;

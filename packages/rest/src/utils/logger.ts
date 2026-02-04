/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ILogObj } from 'tslog'

import { LogLevel, BaseLogger } from '@credo-ts/core'
import { appendFileSync } from 'fs'
import { Logger } from 'tslog'

function logToTransport(logObject: ILogObj) {
  appendFileSync('logs.txt', JSON.stringify(logObject) + '\n')
}

export class TsLogger extends BaseLogger {
  private logger: Logger<ILogObj>

  // Map our log levels to tslog levels
  private tsLogLevelMap = {
    [LogLevel.test]: 0,
    [LogLevel.trace]: 1,
    [LogLevel.debug]: 2,
    [LogLevel.info]: 3,
    [LogLevel.warn]: 4,
    [LogLevel.error]: 5,
    [LogLevel.fatal]: 6,
    [LogLevel.off]: 7
  } as const

  public constructor(logLevel: LogLevel, name?: string) {
    super(logLevel)

    this.logger = new Logger({
      name,
      minLevel: this.logLevel == LogLevel.off ? undefined : this.tsLogLevelMap[this.logLevel],
      attachedTransports: [logToTransport],
    })
  }

  private log(level: Exclude<LogLevel, LogLevel.off>, message: string, data?: Record<string, any>): void {
    const tsLogLevel = this.tsLogLevelMap[level]

    if (data) {
      this.logger.log(tsLogLevel, message, data)
    } else {
      this.logger.log(tsLogLevel, message)
    }
  }

  public test(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.test, message, data)
  }

  public trace(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.trace, message, data)
  }

  public debug(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.debug, message, data)
  }

  public info(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.info, message, data)
  }

  public warn(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.warn, message, data)
  }

  public error(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.error, message, data)
  }

  public fatal(message: string, data?: Record<string, any>): void {
    this.log(LogLevel.fatal, message, data)
  }
}

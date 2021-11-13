export interface ServerConfig {
  port: number
  cors?: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  extraControllers?: Array<Function | string>
  staticResources?: [
    {
      pathName: string
      directory: string
    }
  ]
}

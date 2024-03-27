export class StatusException extends Error {
  public status: number

  public constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

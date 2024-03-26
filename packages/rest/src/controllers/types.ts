/**
 * JSON object that can contain any key-value pairs
 */
export interface AnyJsonObject extends Record<string, unknown> {}

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

/**
 * @example "ea4e5e69-fc04-465a-90d2-9f8ff78aa71d"
 */
export type ThreadId = string

/**
 * Base record model for Credo
 */
export interface CredoBaseRecord {
  id: RecordId
  createdAt: Date
  updatedAt?: Date
  type: string
}

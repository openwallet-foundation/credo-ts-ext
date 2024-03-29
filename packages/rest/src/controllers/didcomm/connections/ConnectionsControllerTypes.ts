import type { Did } from '../../did/DidsControllerTypes'
import type { CredoBaseRecord, ThreadId } from '../../types'
import type {
  ConnectionType,
  ConnectionRecord as CredoConnectionRecord,
  DidExchangeRole,
  DidExchangeState,
  HandshakeProtocol,
} from '@credo-ts/core'

export interface DidCommConnectionRecord extends CredoBaseRecord {
  did?: Did
  theirDid?: Did
  theirLabel?: string
  state: DidExchangeState
  role: DidExchangeRole
  alias?: string
  autoAcceptConnection?: boolean
  threadId?: ThreadId
  imageUrl?: string
  mediatorId?: string
  errorMessage?: string
  protocol?: HandshakeProtocol
  outOfBandId?: string
  invitationDid?: Did
  connectionTypes?: Array<ConnectionType | string>
  previousDids?: Array<Did>
  previousTheirDids?: Array<Did>
}

export function connectionRecordToApiModel(record: CredoConnectionRecord): DidCommConnectionRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    // Connection
    did: record.did,
    theirDid: record.theirDid,
    theirLabel: record.theirLabel,
    state: record.state,
    role: record.role,
    alias: record.alias,
    autoAcceptConnection: record.autoAcceptConnection,
    threadId: record.threadId,
    imageUrl: record.imageUrl,
    mediatorId: record.mediatorId,
    errorMessage: record.errorMessage,
    protocol: record.protocol,
    outOfBandId: record.outOfBandId,
    invitationDid: record.invitationDid,
    connectionTypes: record.connectionTypes,
    previousDids: record.previousDids,
    previousTheirDids: record.previousTheirDids,
  }
}

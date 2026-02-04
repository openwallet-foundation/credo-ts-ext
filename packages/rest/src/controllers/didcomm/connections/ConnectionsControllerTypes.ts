import type { Did } from '../../did/DidsControllerTypes'
import type { CredoBaseRecord, ThreadId } from '../../types'
import type {
  DidCommConnectionType,
  DidCommConnectionRecord as CredoConnectionRecord,
  DidCommDidExchangeRole,
  DidCommDidExchangeState,
  DidCommHandshakeProtocol,
} from '@credo-ts/didcomm'

export interface DidCommConnectionRecord extends CredoBaseRecord {
  did?: Did
  theirDid?: Did
  theirLabel?: string
  state: DidCommDidExchangeState
  role: DidCommDidExchangeRole
  alias?: string
  autoAcceptConnection?: boolean
  threadId?: ThreadId
  imageUrl?: string
  mediatorId?: string
  errorMessage?: string
  protocol?: DidCommHandshakeProtocol
  outOfBandId?: string
  invitationDid?: Did
  connectionTypes?: Array<DidCommConnectionType | string>
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

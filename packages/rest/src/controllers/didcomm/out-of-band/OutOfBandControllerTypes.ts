import type { Did } from '../../did/DidsControllerTypes'
import type { CredoBaseRecord, RecordId } from '../../types'
import type {
  CreateLegacyInvitationConfig,
  CreateOutOfBandInvitationConfig,
  DidCommOutOfBandRecord as CredoOutOfBandRecord,
  DidCommOutOfBandRole,
  DidCommOutOfBandState,
  ReceiveOutOfBandInvitationConfig,
  DidCommPlaintextMessage
} from '@credo-ts/didcomm'

export interface DidCommOutOfBandCreateInvitationOptions
  extends Omit<CreateOutOfBandInvitationConfig, 'routing' | 'appendedAttachments' | 'messages'> {
  messages?: Array<DidCommPlaintextMessage>
}

export interface DidCommOutOfBandCreateInvitationResponse {
  invitation: DidCommPlaintextMessage
  outOfBandRecord: DidCommOutOfBandRecord
  invitationUrl: string
}

export interface DidCommOutOfBandCreateLegacyConnectionInvitationOptions
  extends Omit<CreateLegacyInvitationConfig, 'routing'> {}

export interface DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions {
  message: DidCommPlaintextMessage
  domain: string
}

export interface DidCommOutOfBandReceiveInvitationOptions extends Omit<ReceiveOutOfBandInvitationConfig, 'routing'> {
  invitation: DidCommPlaintextMessage | string
}

export interface DidCommOutOfBandAcceptInvitationOptions {
  autoAcceptConnection?: boolean
  reuseConnection?: boolean
  label: string
  alias?: string
  imageUrl?: string
  timeoutMs?: number
  ourDid?: Did
}

export interface DidCommOutOfBandRecord extends CredoBaseRecord {
  /**
   * The out of band invitation
   */
  outOfBandInvitation: DidCommPlaintextMessage

  /**
   * Our role in the out of band exchange
   *
   * @example receiver
   */
  role: DidCommOutOfBandRole

  /**
   * State of the out of band invitation
   *
   * @example await-response
   */
  state: DidCommOutOfBandState

  /**
   * Alias for the connection(s) created based on the out of band invitation
   *
   * @example "My Connection"
   */
  alias?: string

  /**
   * Whether the out of band invitation is reusable
   *
   * @example true
   */
  reusable: boolean

  /**
   * Whether to auto accept the out of band invitation.
   * If not defined agent config will be used.
   *
   * @example true
   */
  autoAcceptConnection?: boolean

  /**
   * Mediator used for the out of band exchange
   */
  mediatorId?: RecordId

  /**
   * The id of the connection that was reused for the out of band exchange
   */
  reuseConnectionId?: RecordId
}

export function outOfBandRecordToApiModel(record: CredoOutOfBandRecord): DidCommOutOfBandRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    // OOB
    outOfBandInvitation: record.outOfBandInvitation.toJSON(),
    reusable: record.reusable,
    role: record.role,
    state: record.state,
    alias: record.alias,
    autoAcceptConnection: record.autoAcceptConnection,
    mediatorId: record.mediatorId,
    reuseConnectionId: record.reuseConnectionId,
  }
}

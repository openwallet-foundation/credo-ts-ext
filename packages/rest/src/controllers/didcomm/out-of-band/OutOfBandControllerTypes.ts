import type { RecordId } from '../examples'
import type { CreateOutOfBandInvitationConfig, OutOfBandRole, OutOfBandState } from '@credo-ts/core'

// type OutOfBandRecordProperties = Omit<OutOfBandRecordProps, 'outOfBandInvitation'>
// export type OutOfBandInvitationProps = Omit<
//   OutOfBandInvitationOptions,
//   'handshakeProtocols' | 'services' | 'appendedAttachments'
// >

// export interface OutOfBandRecordWithInvitationProps extends OutOfBandRecordProperties {
//   outOfBandInvitation: OutOfBandInvitationProps
// }

export interface CreateOutOfBandInvitationBody
  extends Omit<CreateOutOfBandInvitationConfig, 'routing' | 'appendedAttachments' | 'messages'> {
  messages?: Array<AgentMessageType>
}

export type CreateLegacyConnectionInvitationBody = Omit<CreateOutOfBandInvitationConfig, 'routing'>

// TODO: move to other file
interface ApiBaseRecord {
  id: RecordId

  /**
   * Metadata associated with the record
   */
  metadata: Record<string, Record<string, unknown>>

  /**
   * Date at which the record was created
   */
  createdAt: string

  /**
   * Date at which the record was last updated
   */
  updatedAt?: string
}

export interface ApiOutOfBandRecord extends ApiBaseRecord {
  /**
   * The out of band invitation
   */
  outOfBandInvitation: OutOfBandInvitationJson

  /**
   * Our role in the out of band exchange
   *
   * @example receiver
   */
  role: OutOfBandRole

  /**
   * State of the out of band invitation
   *
   * @example await-response
   */
  state: OutOfBandState

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

export interface AgentMessageType {
  /**
   * @example 4b7f3cc0-b92a-4868-aaba-abfb04c637c5
   */
  '@id': string

  '@type': string
  [key: string]: unknown
}

export interface DidCommServiceJson {
  id: string
  serviceEndpoint: string
  type: string
  [key: string]: unknown
}

export interface OutOfBandInvitationJson extends AgentMessageType {
  '@id': string
  '@type': string
  label: string
  goal_code?: string
  goal?: string
  accept?: string[]
  'requests~attach'?: AgentMessageType[]
  handshake_protocols?: string[]
  services: Array<string | DidCommServiceJson>
  imageUrl?: string
}

export interface ConnectionInvitationJson extends AgentMessageType {
  id: string
  '@type': string
  label: string
  did?: string
  recipientKeys?: string[]
  serviceEndpoint?: string
  routingKeys?: string[]
  imageUrl?: string
}

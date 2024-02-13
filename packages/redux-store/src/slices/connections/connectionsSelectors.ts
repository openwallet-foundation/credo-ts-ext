import type { ConnectionsState } from './connectionsSlice'
import type { ConnectionState } from '@credo-ts/core'

import { ConnectionInvitationMessage, ConnectionRecord, JsonTransformer } from '@credo-ts/core'
import { createSelector } from '@reduxjs/toolkit'

interface PartialConnectionState {
  connections: ConnectionsState
}

const connectionsStateSelector = (state: PartialConnectionState) => state.connections.connections

/**
 * Namespace that holds all ConnectionRecord related selectors.
 */
const ConnectionsSelectors = {
  /**
   * Selector that retrieves the entire **connections** store object.
   */
  connectionsStateSelector,

  /**
   * Selector that retrieves all ConnectionRecords from the store.
   */
  connectionRecordsSelector: createSelector(connectionsStateSelector, (connectionsState) =>
    connectionsState.records.map((c) => JsonTransformer.fromJSON(c, ConnectionRecord)),
  ),

  /**
   * Selector that retrieves all ConnectionRecords from the store with specified {@link ConnectionState}.
   */
  connectionRecordsByStateSelector: (state: ConnectionState) =>
    createSelector(connectionsStateSelector, (connectionsState) =>
      connectionsState.records
        .filter((record) => record.state === state)
        .map((c) => JsonTransformer.fromJSON(c, ConnectionRecord)),
    ),

  /**
   * Selector that retrieves the entire **invitation** store object.
   */
  invitationStateSelector: (state: PartialConnectionState) =>
    JsonTransformer.fromJSON(state.connections.invitation, ConnectionInvitationMessage),

  /**
   * Selector that fetches a ConnectionRecord by id from the state.
   */
  connectionRecordByIdSelector: (connectionRecordId: string) =>
    createSelector(connectionsStateSelector, (connectionsState) => {
      const record = connectionsState.records.find((r) => r.id === connectionRecordId)

      return record ? JsonTransformer.fromJSON(record, ConnectionRecord) : null
    }),
}

export { ConnectionsSelectors }

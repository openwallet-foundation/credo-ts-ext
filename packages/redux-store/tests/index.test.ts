import type { SerializedInstance } from '../src/types'
import type { BaseRecord } from '@credo-ts/core'

import { ConnectionRecord, DidExchangeRole, DidExchangeState } from '@credo-ts/core'

import { addRecordInState, removeRecordInState, updateRecordInState } from '../src/recordListener'

describe('@credo-ts/redux-store', () => {
  test('Should add record', () => {
    const records: SerializedInstance<BaseRecord>[] = []
    const record = new ConnectionRecord({
      role: DidExchangeRole.Requester,
      state: DidExchangeState.Start,
    })

    expect(records.length).toStrictEqual(0)
    addRecordInState(ConnectionRecord, records, record)
    expect(records.length).toStrictEqual(1)
    addRecordInState(ConnectionRecord, records, record)
    expect(records.length).toStrictEqual(2)
  })

  test('Should update record', () => {
    const records: SerializedInstance<BaseRecord>[] = []

    const recordOne = new ConnectionRecord({
      role: DidExchangeRole.Requester,
      state: DidExchangeState.Start,
    })

    const recordTwo = new ConnectionRecord({
      role: DidExchangeRole.Requester,
      state: DidExchangeState.Start,
    })

    const modifiedRecordOne = new ConnectionRecord({
      id: recordOne.id,
      role: DidExchangeRole.Requester,
      state: DidExchangeState.InvitationSent,
    })

    addRecordInState(ConnectionRecord, records, recordOne)
    addRecordInState(ConnectionRecord, records, recordTwo)
    expect(records[0].state).toStrictEqual(DidExchangeState.Start)
    expect(records[1].state).toStrictEqual(DidExchangeState.Start)

    updateRecordInState(ConnectionRecord, records, modifiedRecordOne)
    expect(records[0].state).toStrictEqual(DidExchangeState.InvitationSent)
    expect(records[1].state).toStrictEqual(DidExchangeState.Start)
  })

  test('Should remove record', () => {
    const records: SerializedInstance<BaseRecord>[] = []
    const record = new ConnectionRecord({
      role: DidExchangeRole.Requester,
      state: DidExchangeState.Start,
    })

    addRecordInState(ConnectionRecord, records, record)
    expect(records.length).toStrictEqual(1)

    removeRecordInState(ConnectionRecord, records, record)
    expect(records.length).toStrictEqual(0)
  })
})

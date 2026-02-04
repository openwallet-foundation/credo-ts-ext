import type { DidCommBasicMessageRecord as BasicMessageRecordExample } from './BasicMessagesControllerTypes'

import { DidCommBasicMessageRecord, DidCommBasicMessageRole } from '@credo-ts/didcomm'

export const basicMessageRecordExample: BasicMessageRecordExample = {
  id: '74bcf865-1fdc-45b4-b517-9def02dfd25f',
  createdAt: new Date('2022-08-18T08:38:40.216Z'),
  type: DidCommBasicMessageRecord.type,

  content: 'Hello!',
  sentTime: '2022-08-18T08:38:40.216Z',
  connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  role: DidCommBasicMessageRole.Sender,
}

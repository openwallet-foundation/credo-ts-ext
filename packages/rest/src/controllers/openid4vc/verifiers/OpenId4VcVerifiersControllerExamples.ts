import type { OpenId4VcVerifiersRecord } from './OpenId4VcVerifiersControllerTypes'

import { OpenId4VcVerifierRecord } from '@credo-ts/openid4vc'

export const openId4VcIssuersRecordExample: OpenId4VcVerifiersRecord = {
  id: 'a3327f09-1d48-48a5-89b1-6678a33c0539',
  createdAt: new Date('2024-03-29T15:26:58.347Z'),
  updatedAt: new Date('2024-03-29T15:26:58.347Z'),
  type: OpenId4VcVerifierRecord.type,
  publicVerifierId: '0aa796ef-d79d-457f-a4b9-40b99e47fef2',
}

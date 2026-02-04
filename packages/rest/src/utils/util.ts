import type { AskarPostgresStorageConfig, AskarSqliteStorageConfig } from '@credo-ts/askar'

export const BCOVRIN_TEST_GENESIS = `{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"138.197.138.255","client_port":9702,"node_ip":"138.197.138.255","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"138.197.138.255","client_port":9704,"node_ip":"138.197.138.255","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"138.197.138.255","client_port":9706,"node_ip":"138.197.138.255","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}
{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"138.197.138.255","client_port":9708,"node_ip":"138.197.138.255","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"}`

// TODO: Utilities required for key mapping
// export const keyAlgorithmToCurve: Partial<Record<KeyAlgorithm, Curve>> = {
//     [KeyAlgorithm.Ed25519]: 'Ed25519',
//     [KeyAlgorithm.X25519]: 'X25519',

//     [KeyAlgorithm.EcSecp256r1]: 'P-256',
//     [KeyAlgorithm.EcSecp384r1]: 'P-384',
//     [KeyAlgorithm.EcSecp256k1]: 'secp256k1',
// }
export const curveToKty = {
    Ed25519: 'OKP',
    X25519: 'OKP',
    'P-256': 'EC',
    'P-384': 'EC',
    'P-521': 'EC',
    secp256k1: 'EC',
} as const

export type Curve = 'Ed25519' | 'X25519' | 'P-256' | 'P-384' | 'P-521' | 'secp256k1'

export type OkpCurve = 'Ed25519' | 'X25519'
export type EcCurve = 'P-256' | 'P-384' | 'P-521' | 'secp256k1'

export type OkpType = {
    kty: 'OKP'
    crv: 'Ed25519' | 'X25519'
}

export type EcType = {
    kty: 'EC'
    crv: 'P-256' | 'P-384' | 'P-521' | 'secp256k1'
}

export type KmsCreateKeyTypeAssymetric =
    | {
        kty: 'OKP'
        crv: 'Ed25519' | 'X25519'
    }
    | {
        kty: 'EC'
        crv: 'P-256' | 'P-384' | 'P-521' | 'secp256k1'
    }

export enum RsaModulusLength {
    RSA_2048 = 2048,
    RSA_3072 = 3072,
    RSA_4096 = 4096,
}

export enum DidMethod {
    Indy = 'indy',
    Key = 'key',
    Web = 'web',
    Polygon = 'polygon',
    Peer = 'peer',
}

export const supportedKeyTypesDID: Record<DidMethod, readonly { kty: string; crv: string }[]> = {
    [DidMethod.Indy]: [{ kty: 'OKP', crv: 'Ed25519' }],

    [DidMethod.Peer]: [
        { kty: 'OKP', crv: 'Ed25519' },
        { kty: 'OKP', crv: 'X25519' },
    ],

    [DidMethod.Key]: [
        { kty: 'OKP', crv: 'Ed25519' },
        { kty: 'OKP', crv: 'X25519' },
        { kty: 'EC', crv: 'P-256' },
        { kty: 'EC', crv: 'P-384' },
        { kty: 'EC', crv: 'P-521' },
        { kty: 'EC', crv: 'secp256k1' },
    ],

    [DidMethod.Web]: [
        { kty: 'OKP', crv: 'Ed25519' },
        { kty: 'OKP', crv: 'X25519' },
        { kty: 'EC', crv: 'P-256' },
        { kty: 'EC', crv: 'secp256k1' },
    ],

    [DidMethod.Polygon]: [{ kty: 'EC', crv: 'secp256k1' }],
}

// function normalizeToCurve(input: Curve | KeyAlgorithm): Curve | undefined {
//     // Already a Curve
//     if (input in curveToKty) {
//         return input as Curve
//     }

//     // Try mapping from KeyAlgorithm
//     return keyAlgorithmToCurve[input as KeyAlgorithm]
// }

// export function getTypeFromCurve(key: Curve | KeyAlgorithm): OkpType | EcType {
//     let keyTypeInfo: OkpType | EcType
//     const normalizedCurve = normalizeToCurve(key)
//     if (normalizedCurve && curveToKty[normalizedCurve] === 'OKP') {
//         keyTypeInfo = {
//             kty: 'OKP',
//             crv: normalizedCurve as OkpCurve,
//         }
//     } else if (normalizedCurve && curveToKty[normalizedCurve] === 'EC') {
//         keyTypeInfo = {
//             kty: 'EC',
//             crv: normalizedCurve as EcCurve,
//         }
//     } else {
//         keyTypeInfo = {
//             kty: 'EC',
//             crv: 'P-256',
//         }
//     }
//     return keyTypeInfo
// }


export const getDatabaseConfig = (args: any): AskarSqliteStorageConfig | AskarPostgresStorageConfig => {
  const dbType = args['db-type'] || 'sqlite'; // Default to sqlite if not specified
  if (dbType.type === 'postgres') {
    return {
      type: 'postgres',
      config: {
        host: args['postgres-host'],
      },
      credentials: {
        account: args['postgres-username'],
        password: args['postgres-password'],
        ...(args['adminAccount'] ? { adminAccount: args['adminAccount'] } : {}),
        ...(args['adminPassword'] ? { adminPassword: args['adminPassword'] } : {}),
      },
    }
  }
  return {
    type: 'sqlite',
    config: {
      ...(args['sqlite-path'] ? { path: args['sqlite-path'] } : {}),
      ...(args['sqlite-in-memory'] ? { inMemory: args['sqlite-in-memory'] === 'true' } : {}),
    },
  }
};

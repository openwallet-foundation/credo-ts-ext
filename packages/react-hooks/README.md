<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>React Hooks for Aries Framework JavaScript</b></h1>
<p align="center">
  <a
    href="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript-ext/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
  <a href="https://www.typescriptlang.org/"
    ><img
      alt="typescript"
      src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg"
  /></a>
</p>

This package exposes useful React hooks that allow you to easily interact with AFJ.

Everything exported from Hooks:

```ts
import
	AgentProvider, {
	useAgent,
	useConnections,
	useConnectionById,
	useConnectionByState,
	useCredentials,
	useCredentialById,
	useCredentialByState,
	useProofs,
	useProofById,
	useProofByState
} from '@aries-framework/react-hooks'
```

First step is to wrap your entire app in our `<AgentProvider/>`. The provider takes an initialized agent. The base of your app should look something like this:

```ts
import AgentProvider from "@aries-framework/react-hooks"

const App = () => {
	const [agent, setAgent] = useState(undefined)

	const initializeAgent = async () => {
		await // initialize your agent
		setAgent(yourAgent)
	}

	useEffect(() => {
		initializeAgent()
	}, [])

	return (
		<AgentProvider agent={agent}>
			// Your app here
		</AgentProvider>
	)
}
```

And that's it! Your app should be set up to recieve all the necessary data your app will need! Now let's see how we actually get that data to our components.

The `useAgent` hook returns `{ agent, loading }` so anytime you need access to any of the methods tied to the agent, you can `useAgent()` anywhere.

The following is an example of how you could use the `useConnections` hook to render a full list of all a user's connections.

```ts
import { useConnections } from '@aries-framework/react-hooks'

const MyConnectionsComponent = () => {
	// all base hooks return an array of objects and a loading boolean
	const { connections, loading } = useConnections()

	return (
		<Flatlist
			data={connections}
			renderItem={({item}) => <MyListItem connection={item} />}
		/>
	)
}
```

The three base hooks: `useConnections`, `useCredentials`, and `useProofs` work just like the above! Just call the hook, destructure the data, and pass it through!

Each base hook has a `ById` version that returns a singular record. For example if I wanted only a specific connectionRecord, I'd do this.
```ts
const connection = useConnectionById(id)
```

More commonly, you'll want to get a filtered list of records based off of their state. Well, Hooray! We have a `ByState` version as well. For example, you can do this:
```ts
const credentials = useCredentialByState(CredentialState.OfferReceived)
```

Boom Bam Baby!
That's all you need to know to get that data flowinggg.

import { readFile, writeFile } from 'fs/promises'
import { generateSpecAndRoutes } from 'tsoa'

interface SwaggerJson {
  paths: {
    [path: string]: {
      [method: string]: { parameters?: unknown[]; security?: unknown }
    }
  }
}

async function run() {
  await generateSpecAndRoutes({})

  // Modify swagger
  const swaggerJson: SwaggerJson = JSON.parse(await readFile('./src/generated/swagger.json', 'utf-8'))

  for (const [path, pathValue] of Object.entries(swaggerJson.paths)) {
    for (const [method, methodValue] of Object.entries(pathValue)) {
      swaggerJson.paths[path][method] = {
        ...methodValue,
        parameters: [...(methodValue.parameters ?? []), { $ref: '#/components/parameters/tenant' }],
        // Removes the security
        security: undefined,
      }
    }
  }

  await writeFile('./src/generated/swagger.json', JSON.stringify(swaggerJson, null, 2))
  // eslint-disable-next-line no-console
  console.log('Successfully generated spec and routes')
}

run()

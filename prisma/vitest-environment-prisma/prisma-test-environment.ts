import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    console.log('Setup')

    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      teardown() {
        console.log('Teardown')
      },
    }
  },
}

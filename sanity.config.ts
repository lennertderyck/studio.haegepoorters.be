import { visionTool } from '@sanity/vision'
import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

dayjs.locale('nl-be');

export default defineConfig({
  name: 'default',
  title: 'Haegepoorters.be',

  projectId: 'vlef6i8p',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
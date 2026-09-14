import {visionTool} from '@sanity/vision'
import dayjs from 'dayjs'
import 'dayjs/locale/nl-be'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {RenderIcon} from './src/components/Icon/Icon.utils'
import {resolve} from './src/presentation/resolve'
import {structure} from './src/structure'

dayjs.locale('nl-be')

export default defineConfig({
  name: 'default',
  title: 'Haegepoorters.be',

  projectId: 'vlef6i8p',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: 'http://localhost:3333',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev.filter((template) => template.id !== 'content'),
      {
        id: 'content-page',
        title: 'Page',
        description: 'Create a new page with content',
        schemaType: 'content',
        icon: RenderIcon('file-text-fill'),
        value: {
          isFolder: false,
        },
      },
      {
        id: 'content-folder',
        title: 'Folder',
        description: 'Create a new folder to organize content',
        schemaType: 'content',
        icon: RenderIcon('folder-2-fill'),
        value: {
          isFolder: true,
        },
      },
    ],
  },
})

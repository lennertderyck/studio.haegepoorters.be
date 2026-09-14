import {defineType} from 'sanity'
import {RenderIcon} from '../src/components/Icon/Icon.utils'

export const contentType = defineType({
  name: 'content',
  title: 'Content',
  type: 'document',
  icon: RenderIcon('folder-2-fill'),
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isFolder',
      title: 'Is Folder',
      type: 'boolean',
      description: 'Toggle to make this a directory/folder instead of a page with content',
      initialValue: false,
      readOnly: true,
    },
    {
      name: 'parent',
      title: 'Parent Folder',
      type: 'reference',
      to: [{type: 'content'}],
      description: 'Select a parent folder to nest this item',
      options: {
        filter: 'isFolder == true',
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
      hidden: ({document}) => document?.isFolder === true,
      description: 'Content is only available for pages, not folders',
    },
  ],
  preview: {
    select: {
      title: 'title',
      isFolder: 'isFolder',
      parent: 'parent.title',
    },
    prepare({title, isFolder, parent}) {
      return {
        title: title,
        subtitle: parent ? `In: ${parent}` : isFolder ? 'Folder' : 'Page',
        media: RenderIcon(isFolder ? 'folder-2-fill' : 'file-text-fill'),
      }
    },
  },
})

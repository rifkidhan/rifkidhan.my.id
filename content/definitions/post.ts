import { defineDocumentType } from 'contentlayer/source-files'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blogs/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    publishedAt: {
      type: 'date',
      required: true
    },
    status: {
      type: 'enum',
      options: ['draft', 'published'],
      required: true
    }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, '')
    }
  }
}))

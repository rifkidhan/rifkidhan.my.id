import {
  Client,
  isNotionClientError,
  NotionClientError,
  NotionErrorCode
} from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { cache } from 'react'

const notion = new Client({
  auth: process.env.NOTION_KEY,
  fetch
})

export const getAllPublished = cache(async () => {
  try {
    const res = await notion.databases.query({
      database_id: process.env.DATABASE_ID as string,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          timestamp: 'last_edited_time',
          direction: 'descending'
        }
      ]
    })

    const allPosts = res.results

    return allPosts.map((post) => {
      return getMetadata(post)
    })
  } catch (error) {
    if (isNotionClientError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown',
        status: error.code || 500,
        message: error.message
      }
    }
    throw {
      error
    }
  }
})

const notion2md = new NotionToMarkdown({
  notionClient: notion
})

export const getSinglePost = cache(async (slug: string) => {
  try {
    const res = await notion.databases.query({
      database_id: process.env.DATABASE_ID as string,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug
          }
        }
      }
    })

    const page = res.results[0]
    const metadata = getMetadata(page)
    const mdBlock = await notion2md.pageToMarkdown(page.id)
    const mdString = notion2md.toMarkdownString(mdBlock)

    return {
      metadata,
      content: mdString
    }
  } catch (error) {
    if (isNotionClientError(error)) {
      throw {
        cause: error.cause?.toString() || 'unknown',
        status: error.code || 500,
        message: error.message
      }
    }
    throw {
      error
    }
  }
})

const getMetadata = (post: any) => {
  const getTag = (tags: any[]) => {
    const allTags = tags.map(({ id, name, color }) => {
      return {
        id,
        name,
        color
      }
    })

    return allTags
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description.rich_text[0].plain_text,
    tags: getTag(post.properties.Tags.multi_select),
    slug: post.properties.Slug.formula.string,
    cover: post.cover && post.cover.external.url,
    createdTime: post.created_time,
    lastEdited: post.last_edited_time,
    author: post.properties.Author.people
  }
}

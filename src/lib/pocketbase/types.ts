interface Tags {
  id: string
  title: String
}

interface Metadata {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
}

interface IPost {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  title: string
  published: boolean
  description: string
  featured_image: string
  featured_image_caption: string
  slug: string
  content: string
  tags: string[]
  expand: {
    tags: Tags[]
  }
}

export interface SlugPosts extends Metadata {
  items: Pick<IPost, 'id' | 'slug' | 'updated'>[]
}
export interface AllPosts extends Metadata {
  items: Omit<IPost, 'tags' | 'content' | 'published' | 'expand'>[]
}

export interface Post extends Metadata {
  items: IPost[]
}

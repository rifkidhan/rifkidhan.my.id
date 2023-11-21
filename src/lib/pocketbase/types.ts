const test = {
  collectionId: 'nwb413pm3f29pdj',
  collectionName: 'tags',
  created: '2023-11-17 10:22:31.758Z',
  description: '',
  feature_image: '',
  id: '1wc37osxxflqm0s',
  posts: [],
  title: 'teknologi',
  updated: '2023-11-17 10:22:31.758Z'
}

interface Tags {
  id: string
  title: String
}

export interface Post {
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

export interface AllPosts {
  page: number
  perPage: number
  totalPages: number
  totalItems: number
  items: Omit<Post, 'tags' | 'content' | 'published'>[]
}

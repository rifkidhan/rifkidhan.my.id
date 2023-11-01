type Post = {
  slug: string
  id: string
  uuid: string
  title: string
  html: string
  plaintext: string
  comment_id: string
  feature_image?: string
  feature_image_alt?: string
  feature_image_caption?: string
  featured: boolean
  visibility: string
  created_at: string
  updated_at: string
  published_at: string
  custom_excerpt?: string
  codeinjection_head?: string
  codeinjection_foot?: string
  custom_template?: string
  canonical_url?: string
  url: string
  excerpt: string
  reading_time: number
  access: boolean
  og_image?: string
  og_title?: string
  og_description?: string
  twitter_image?: string
  twitter_title?: string
  twitter_description?: string
  meta_title?: string
  meta_description?: string
  email_subject?: string
}

type Author = {
  id: string
  name: string
  slug: string
  profile_image?: string
  cover_image?: string
  bio?: string
  website?: string
  location?: string
  facebook?: string
  twitter?: string
  meta_title?: string
  meta_description?: string
  url?: string
}

type Tag = {
  id: string
  name: string
  slug: string
  description?: string
  feature_image?: string
  visibility: string
  og_image?: string
  og_title?: string
  og_description?: string
  twitter_image?: string
  twitter_title?: string
  twitter_description?: string
  meta_title?: string
  meta_description?: string
  codeinjection_head?: string
  codeinjection_foot?: string
  canonical_url?: string
  accent_color?: string
  url?: string
}

type Pagination = {
  page: number
  limit: number
  pages: number
  total: number
  next?: string | number
  prev?: string | number
}

export type AllPosts = {
  posts: Pick<
    Post,
    | 'id'
    | 'slug'
    | 'title'
    | 'feature_image'
    | 'feature_image_alt'
    | 'excerpt'
    | 'published_at'
    | 'custom_excerpt'
    | 'updated_at'
  >[]
  metadata: {
    pagination: Pagination
  }
}

type ExtendedPost = Post & {
  tags: Tag[]
  authors: Author[]
  primary_author: Author
  primary_tag: Tag
}

export type SinglePost = {
  posts: ExtendedPost[]
}

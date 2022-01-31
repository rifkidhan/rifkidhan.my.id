import { gql } from "graphql-request"
import { fetchAPI } from "@/libs/api"

export const getMenu = gql`
query getMenuIndex {
    menu {
        id
        title
        slug
    }
}
`

export async function getPostForHome() {
    const data = await fetchAPI(
        `
        query getBlogHome {
            blog(filter: {status: {_eq: "published"}}, limit: 4, sort: "-date_created") {
                id
                title
                feature_image {
                    id
                }
                content
                slug
            }
        }
        `,
    )

    return data.blog
}

export const getBlogPostIndex = gql`
    query getBlogIndex($category: String){
        blog(filter: {category: {blog_category_id: {title: {_eq: $category}}}, status: {_eq: "published"}}) {
            id
            title
            slug
            feature_image {
                id
            }
            content
        }
    }
`
export async function getBlogPostsIndex() {
    const data = await fetchAPI(
    `
        query getBlogIndex {
            blog {
                id
                title
                slug
                feature_image {
                    id
                }
                content
            }
        }
    `,
    )

    return data.blog
}

export async function getCategoryBlog() {
    const data = await fetchAPI(
    `
        query getBlogCategory{
            blog_category{
                id
                title
            }
        }
    `
    )

    return data.blog_category
}

export const getBlogCategory = gql`
    query getBlogCategory{
        blog_category{
            id
            title
        }
    }
`

export async function getBlogPost(slug: string) {
    const data = await fetchAPI(
        `
        query getBlogPost($slug: String) {
            blog(filter: {status: {_eq: "published"}, slug: {_eq: $slug}}) {
                id
                title
                subtitle
                slug
                category {
                    blog_category_id {
                        id
                        title
                    }
                }
                feature_image {
                    id
                }
                content
            }
        }
    `,
        {
            variables: {
                slug
            }
        }
    )

    return data.blog
}

export async function getBlogPostBySlug() {
    const data = await fetchAPI(
        `
        query postBySlug{
            blog {
                slug
            }
        }
        `
    )

    return data.blog
}
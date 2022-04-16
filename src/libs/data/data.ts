import { getDirectus } from "@libs/directus";

export async function getPostForHome() {
  const directus = await getDirectus();
  const { data: blog } = await directus.items("blog").readByQuery({
    fields: ["id", "title", "feature_image.*", "content", "slug"],
    limit: 4,
    sort: ["-date_updated"],
    filter: { status: { _eq: "published" } },
  });

  return blog;
}

export async function getBlogPostsIndex() {
  const directus = await getDirectus();
  const { data: blog } = await directus.items("blog").readByQuery({
    fields: ["id", "title", "slug", "feature_image.id", "content"],
  });

  return blog;
}

export async function getBlogCategories() {
  const directus = await getDirectus();
  const { data: blog_category } = await directus
    .items("blog_category")
    .readByQuery({
      fields: ["id", "title"],
    });

  return blog_category;
}

export async function getBlogPostBySlug() {
  const directus = await getDirectus();
  const { data: blog } = await directus.items("blog").readByQuery({
    fields: ["slug"],
    filter: { status: { _eq: "published" } },
    limit: -1,
  });

  return blog;
}

export async function getBlogPost(slug: string) {
  const directus = await getDirectus();
  const { data: blog } = await directus.items("blog").readByQuery({
    fields: [
      "id",
      "title",
      "subtitle",
      "slug",
      "category.title",
      "feature_image.id ",
      "feature_image.width",
      "feature_image.height",
      "content",
      "date_created",
      "date_updated",
      "user_created.first_name",
      "user_created.last_name",
      "meta_title",
      "meta_description",
      "tags",
    ],
    filter: { slug: { _eq: slug }, status: { _eq: "published" } },
  });

  return blog;
}

export async function getHomeFeature() {
  const directus = await getDirectus();
  const { data: home_feature } = await directus
    .items("home_feature")
    .readByQuery({
      fields: ["id", "title", "content", "animation.filename_disk"],
      filter: { status: { _eq: "published" } },
    });

  return home_feature;
}

export async function getAboutMe() {
  const directus = await getDirectus();
  const { data: about_me } = await directus.items("about_me").readByQuery({
    fields: [
      "title",
      "slug",
      "image.id",
      "image.width",
      "image.height",
      "description",
    ],
  });

  return about_me;
}

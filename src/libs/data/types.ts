import { ID } from "@directus/sdk";

export type Blog = {
  id: ID;
  user_created: {
    first_name: string;
    last_name: string;
  };
  date_created: string;
  date_updated: string;
  status: string;
  category: BlogCategory;
  slug: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
  title: string;
  subtitle: string;
  excerpt: string;
  feature_image: {
    id: string;
    width: number;
    height: number;
  };
  content: string;
};

export type BlogCategory = {
  id: ID;
  title: string;
  slug: string;
  blog: Blog;
};

export type AboutMe = {
  id: ID;
  title: string;
  slug: string;
  image: string;
  description: string;
};

export type Menu = {
  id: ID;
  title: string;
  slug: string;
};

export type HomeFeature = {
  id: ID;
  status: string;
  title: string;
  animation: {
    filename_disk: string;
  };
  content: string;
};

export type AllContent = {
  blog: Blog;
  blog_category: BlogCategory;
  about_me: AboutMe;
  menu: Menu;
  home_feature: HomeFeature;
};

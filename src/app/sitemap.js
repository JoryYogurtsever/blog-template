// import { MetadataRoute } from "next";
import Post from '../lib/models/post.model.js';
import { connect } from '../lib/mongodb/mongoose.js';
export default async function sitemap() {
  await connect();
  const posts = await Post.find({});
  // console.log(posts)
  let slugs = posts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.slug}`,
      lastModified: new Date(post.updatedAt)
    }))
  // return slugs
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`
    },
    ...slugs
  ]
}
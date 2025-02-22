import Post from '../../../lib/models/post.model.js';
import { connect } from '../../../lib/mongodb/mongoose.js';
import CallToAction from '@/app/components/CallToAction';
import RecentPosts from '@/app/components/RecentPosts';
import { Button } from 'flowbite-react';
import Link from 'next/link';

export async function generateStaticParams() {
  let slugs = null;
  try {
    await connect();
    const posts = await Post.find({});
    // console.log(posts)
    let slugs = posts.map((post) => ({
        slug: post.slug,
      }))
    return slugs
    // const result = await fetch(process.env.URL + '/api/post/get', {
    //   method: 'POST',
    //   body: JSON.stringify({ limit: 9, order: 'desc' }),
    // }).then((res) => res.json())
    // return ([
    //   { slug: 'seo-post' },
    //   { slug: 'post-3' },
    //   { slug: 'post-2' },
    //   { slug: 'new-post' }
    // ])
    // const data = await result.json();
    // return data.posts.map((post) => ({
    //   slug: post.slug,
    // }))
  } catch (error) {
    slugs = { title: 'Failed to load post' };
  }
}
export async function generateMetadata({ params }) {
  let post = null;
  try {
    const {slug} = await params;
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      // cache: 'no-store',
    });
    const data = await result.json();
    post = data.posts[0];
    if (!post) throw new Error("no post")
  } catch (error) {
    post = { title: 'Failed to load post' };
  }
  // console.log(post)
  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      images: [
        {
          url: post.image,
          // alt: post.title
        }
      ]
    },
    keywords: post.keywords ? [...post.keywords] : null,
  }
}
export default async function PostPage({ params }) {
  let post = null;
  try {
    const {slug} = await params;
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ slug }),
      // cache: 'no-store',
    });
    const data = await result.json();
    post = data.posts[0];
  } catch (error) {
    post = { title: 'Failed to load post' };
  }
  if (!post || !post.title === 'Failed to load post') {
    return (
      <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h2 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
          Post not found
        </h2>
      </main>
    );
  }
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <Link
        href={`/search?category=${post && post.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <RecentPosts limit={3} />
    </main>
  );
}
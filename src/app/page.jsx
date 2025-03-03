import Link from "next/link";
import CallToAction from "./components/CallToAction";
import RecentPosts from "./components/RecentPosts";

export async function generateStaticParams() {
  let posts = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: 9, order: "desc" }),
      // cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    posts = { title: "Failed to load post" };
  }
  return posts;
}

export default async function Home() {
  let posts = null;
  try {
    const result = await fetch(process.env.URL + "/api/post/get", {
      method: "POST",
      body: JSON.stringify({ limit: 9, order: "desc" }),
      // cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log("Error getting post:", error);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          vehicula augue malesuada porttitor ullamcorper. Curabitur elementum
          suscipit magna, vitae suscipit ipsum aliquet ac. Morbi luctus ac mi at
          consectetur. Vivamus dapibus ac nunc ac dignissim. Phasellus tempus
          sodales nibh, eget convallis neque ultrices vel. Nulla efficitur magna
          diam, sed mattis mauris fringilla eget. Vivamus sapien purus, blandit
          non blandit nec, mollis eget purus. Curabitur semper viverra magna,
          ullamcorper fermentum leo commodo eu. Donec viverra quam sed efficitur
          blandit. Vivamus vel tortor efficitur, venenatis est at, hendrerit
          lorem.
        </p>
        <Link
          href="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="p-3 flex flex-col gap-8 py-7">
        <RecentPosts limit={9} />
        <Link
          href={"/search?category=null"}
          className="text-lg text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
}

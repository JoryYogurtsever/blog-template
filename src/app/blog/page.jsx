import { Pagination } from "flowbite-react";
import PostCard from "../components/PostCard";

export default async function Blog() {
  //   const [currentPage, setCurrentPage] = useState(1);

//   const onPageChange = (page: number) => setCurrentPage(page);
  let posts = null;
  try {
    const result = await fetch(process.env.URL + '/api/post/get', {
      method: 'POST',
      body: JSON.stringify({ order: 'desc' }),
      // cache: 'no-store',
    });
    const data = await result.json();
    posts = data.posts;
  } catch (error) {
    console.log('Error getting post:', error);
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {posts && posts.map((post) => <PostCard key={post._id} post={post} isLarge={true}/>)}
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
          {/* <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} /> */}
      </div>
    </>
  )
}

// "use client";

// import { Pagination } from "flowbite-react";
// import { useState } from "react";

// export function Blog() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const onPageChange = (page: number) => setCurrentPage(page);

//   return (
//     <div className="flex overflow-x-auto sm:justify-center">
//       <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
//     </div>
//   );
// }

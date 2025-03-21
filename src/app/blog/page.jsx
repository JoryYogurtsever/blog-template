"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostCard from '../components/PostCard';
import { Pagination } from "flowbite-react";

export default function Blog() {
  let postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();

  const fetchPosts = async (urlParams) => {
    setLoading(true);
    const searchQuery = urlParams.toString();
    const res = await fetch('/api/post/get', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 10,
        startIndex: currentPage*10,
      }),
    });
    if (!res.ok) {
      setLoading(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      setTotalPages(Math.ceil(data.totalPosts/postsPerPage))
      console.log(data)
    }
  };

  const onPageChange = (page) => {
    setCurrentPage(page-1);
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set('page', page);
    const searchQuery = urlParams.toString();
    router.push(`/blog?${searchQuery}`);
  }
  const router = useRouter();
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const pageFromUrl = urlParams.get('page');
    if (pageFromUrl) {
      setCurrentPage(pageFromUrl-1)
    } else {
      fetchPosts(urlParams);
    }
  }, [searchParams]);
  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    fetchPosts(urlParams);
 },[currentPage])
  return (
    <>
      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
        {loading && <p className='text-xl text-gray-500'>Loading...</p>}
        {!loading &&
          posts &&
          posts.map((post) => <PostCard key={post._id} post={post} isLarge={true}/>)}
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-center mb-5">
        <Pagination currentPage={currentPage+1} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
      {/* <BlogContent currentPage={currentPage+1} totalPages={100} onPageChange={onPageChange} /> */}
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

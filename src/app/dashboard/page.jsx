'use client';

import Image from 'next/image'
import {useUser} from '@clerk/nextjs'
import { useEffect, useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import { useSearchParams } from 'next/navigation';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
export default function Dashboard() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');
  const {isSignedIn, user, isLoaded} = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [searchParams]);
  
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn && user.publicMetadata.isAdmin) {
    return (
      <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>
          {/* Sidebar */}
          <DashSidebar />
        </div>
        {/* profile... */}
        {tab === 'profile' && <DashProfile />}

        {tab === 'posts' && <DashPosts />}

        {tab === 'users' && <DashUsers />}
        {tab === 'dash' && <DashboardComp />}
      </div>
    );
  } else {
    return (
      <>
        <h1 className="text-center text-3xl my-7 font-semibold">
          You are not authorized to view this page
        </h1>
        <div className="text-center">
        <Image 
        style={{margin: "auto"}}
        src="/download.jpg"
        width={500}
        height={500}
        alt="Admin Only"
        />
        </div>
      </>
    )
  }
}
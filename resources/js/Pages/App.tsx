import React from 'react';
import { Head } from '@inertiajs/react';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/Components/Layout/Sidebar';
import Header from '@/Components/Layout/Header';
import { cn } from '@/lib/utils';

interface AppProps {
  auth: {
    user: any;
  };
  flash: {
    message?: string;
    error?: string;
  };
  children?: React.ReactNode;
}

export default function App({ auth, flash, children }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      <Head title="NetaSampark - Political CRM" />
      
      <div className="min-h-screen bg-gray-50">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="lg:pl-72">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
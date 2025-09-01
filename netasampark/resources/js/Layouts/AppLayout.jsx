import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    UsersIcon,
    SpeakerWaveIcon,
    TicketIcon,
    CalendarIcon,
    NewspaperIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    CurrencyRupeeIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Voters', href: '/voters', icon: UsersIcon },
    { name: 'Campaigns', href: '/campaigns', icon: SpeakerWaveIcon },
    { name: 'Communications', href: '/communications/inbox', icon: SpeakerWaveIcon },
    { name: 'Tickets', href: '/tickets', icon: TicketIcon },
    { name: 'Events', href: '/events', icon: CalendarIcon },
    { name: 'News', href: '/news', icon: NewspaperIcon },
    { name: 'Surveys', href: '/surveys', icon: ClipboardDocumentListIcon },
    { name: 'Analytics', href: '/analytics/dashboard', icon: ChartBarIcon },
    { name: 'Finance', href: '/finance/expenses', icon: CurrencyRupeeIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AppLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { auth, tenant } = usePage().props;

    return (
        <div className="h-full">
            <Head title={title} />
            
            {/* Mobile sidebar */}
            <div className={classNames(
                sidebarOpen ? 'fixed inset-0 z-50 lg:hidden' : 'hidden'
            )}>
                <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
                <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white">
                    <div className="flex h-16 items-center justify-between px-6">
                        <img className="h-8 w-auto" src="/logo.svg" alt="NetaSampark" />
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="mt-6">
                        <ul className="space-y-1 px-3">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        <item.icon className="h-6 w-6 shrink-0" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <img className="h-8 w-auto" src="/logo.svg" alt="NetaSampark" />
                        <span className="ml-2 text-xl font-bold text-gray-900">NetaSampark</span>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="flex items-center gap-x-3 rounded-md px-2 py-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50"
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-64">
                {/* Top navigation */}
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="h-6 w-px bg-gray-200 lg:hidden" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1">
                            {/* Search can be added here */}
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            {/* Tenant info */}
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
                            <div className="flex items-center gap-x-2">
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900">{tenant?.name}</div>
                                    <div className="text-gray-500">Plan: {tenant?.plan}</div>
                                </div>
                            </div>

                            {/* User menu */}
                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                                >
                                    <span className="sr-only">Your profile</span>
                                    <img
                                        className="h-8 w-8 rounded-full bg-gray-50"
                                        src={auth?.user?.avatar || `https://ui-avatars.com/api/?name=${auth?.user?.name}&background=3b82f6&color=fff`}
                                        alt=""
                                    />
                                    <span className="hidden lg:flex lg:items-center">
                                        <span className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                                            {auth?.user?.name}
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
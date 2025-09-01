import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    PlusIcon, 
    MagnifyingGlassIcon,
    FunnelIcon,
    ArrowUpTrayIcon,
    PhoneIcon,
    EnvelopeIcon,
    ChatBubbleLeftRightIcon,
    UserIcon
} from '@heroicons/react/24/outline';

const supportLevelColors = {
    strong_support: 'bg-green-100 text-green-800',
    lean_support: 'bg-lime-100 text-lime-800',
    neutral: 'bg-gray-100 text-gray-800',
    lean_opposition: 'bg-orange-100 text-orange-800',
    strong_opposition: 'bg-red-100 text-red-800',
};

export default function VotersIndex() {
    const { voters, constituencies, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [selectedConstituency, setSelectedConstituency] = useState(filters.constituency_id || '');
    const [supportLevel, setSupportLevel] = useState(filters.support_level || '');
    const [consentFilter, setConsentFilter] = useState(filters.consent_filter || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/voters', {
            search,
            constituency_id: selectedConstituency,
            support_level: supportLevel,
            consent_filter: consentFilter,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedConstituency('');
        setSupportLevel('');
        setConsentFilter('');
        router.get('/voters', {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout title="Voters">
            <div className="space-y-6">
                {/* Header */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Voters</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Manage your voter database with comprehensive profiling and segmentation.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:flex sm:space-x-3">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                            Import
                        </button>
                        <Link
                            href="/voters/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                            Add Voter
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSearch} className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-6 sm:gap-4">
                        <div className="sm:col-span-2">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                                Search
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="Search by name, ID, phone..."
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="constituency" className="block text-sm font-medium text-gray-700">
                                Constituency
                            </label>
                            <select
                                id="constituency"
                                value={selectedConstituency}
                                onChange={(e) => setSelectedConstituency(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">All Constituencies</option>
                                {constituencies.map((constituency) => (
                                    <option key={constituency.id} value={constituency.id}>
                                        {constituency.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="support_level" className="block text-sm font-medium text-gray-700">
                                Support Level
                            </label>
                            <select
                                id="support_level"
                                value={supportLevel}
                                onChange={(e) => setSupportLevel(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">All Levels</option>
                                <option value="strong_support">Strong Support</option>
                                <option value="lean_support">Lean Support</option>
                                <option value="neutral">Neutral</option>
                                <option value="lean_opposition">Lean Opposition</option>
                                <option value="strong_opposition">Strong Opposition</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="consent_filter" className="block text-sm font-medium text-gray-700">
                                Consent
                            </label>
                            <select
                                id="consent_filter"
                                value={consentFilter}
                                onChange={(e) => setConsentFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            >
                                <option value="">All Voters</option>
                                <option value="sms">SMS Consent</option>
                                <option value="whatsapp">WhatsApp Consent</option>
                                <option value="email">Email Consent</option>
                                <option value="voice">Voice Consent</option>
                            </select>
                        </div>

                        <div className="flex items-end space-x-2">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                                <FunnelIcon className="-ml-1 mr-2 h-5 w-5" />
                                Filter
                            </button>
                            {(search || selectedConstituency || supportLevel || consentFilter) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Voters List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {voters.data.map((voter) => (
                            <li key={voter.id}>
                                <Link
                                    href={`/voters/${voter.id}`}
                                    className="block hover:bg-gray-50 px-4 py-4 sm:px-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <UserIcon className="h-6 w-6 text-gray-600" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {voter.name}
                                                    </p>
                                                    {voter.is_influencer && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            Influencer
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <span>ID: {voter.voter_id}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{voter.constituency?.name}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>Booth {voter.booth?.number}</span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                    {voter.phone && (
                                                        <div className="flex items-center">
                                                            <PhoneIcon className="h-4 w-4 mr-1" />
                                                            {voter.phone}
                                                        </div>
                                                    )}
                                                    {voter.email && (
                                                        <div className="flex items-center">
                                                            <EnvelopeIcon className="h-4 w-4 mr-1" />
                                                            {voter.email}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {voter.support_level && (
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${supportLevelColors[voter.support_level]}`}>
                                                    {voter.support_level.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </span>
                                            )}
                                            <div className="flex space-x-1">
                                                {voter.sms_consent && (
                                                    <div className="h-2 w-2 bg-green-400 rounded-full" title="SMS Consent" />
                                                )}
                                                {voter.whatsapp_consent && (
                                                    <div className="h-2 w-2 bg-green-500 rounded-full" title="WhatsApp Consent" />
                                                )}
                                                {voter.email_consent && (
                                                    <div className="h-2 w-2 bg-blue-400 rounded-full" title="Email Consent" />
                                                )}
                                                {voter.voice_consent && (
                                                    <div className="h-2 w-2 bg-purple-400 rounded-full" title="Voice Consent" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination */}
                    {voters.links && (
                        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            {/* Pagination component would go here */}
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {voters.from} to {voters.to} of {voters.total} results
                                </div>
                                <div className="flex space-x-2">
                                    {voters.prev_page_url && (
                                        <Link
                                            href={voters.prev_page_url}
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {voters.next_page_url && (
                                        <Link
                                            href={voters.next_page_url}
                                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {voters.data.length === 0 && (
                    <div className="text-center py-12">
                        <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No voters found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Get started by adding your first voter or importing from a file.
                        </p>
                        <div className="mt-6 flex justify-center space-x-3">
                            <Link
                                href="/voters/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Add Voter
                            </Link>
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5" />
                                Import from File
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
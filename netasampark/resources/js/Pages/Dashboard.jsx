import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    UsersIcon, 
    SpeakerWaveIcon, 
    TicketIcon,
    ChartBarIcon,
    CalendarIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const stats = [
    { name: 'Total Voters', stat: '71,897', icon: UsersIcon, change: '+12%', changeType: 'increase' },
    { name: 'Active Campaigns', stat: '8', icon: SpeakerWaveIcon, change: '+2', changeType: 'increase' },
    { name: 'Open Tickets', stat: '24', icon: TicketIcon, change: '-3', changeType: 'decrease' },
    { name: 'Engagement Rate', stat: '58.16%', icon: ChartBarIcon, change: '+2.1%', changeType: 'increase' },
];

const recentActivities = [
    {
        id: 1,
        type: 'campaign',
        content: 'Festival Wishes Campaign launched',
        time: '2 hours ago',
        icon: SpeakerWaveIcon,
    },
    {
        id: 2,
        type: 'ticket',
        content: 'New ticket: Road repair request in Ward 12',
        time: '4 hours ago',
        icon: TicketIcon,
    },
    {
        id: 3,
        type: 'event',
        content: 'Public rally scheduled for tomorrow',
        time: '6 hours ago',
        icon: CalendarIcon,
    },
];

const upcomingEvents = [
    {
        id: 1,
        title: 'Public Rally - Ward 15',
        date: 'Tomorrow, 6:00 PM',
        location: 'Community Center',
        attendees: 250,
    },
    {
        id: 2,
        title: 'Booth Committee Meeting',
        date: 'Sept 3, 10:00 AM',
        location: 'Party Office',
        attendees: 45,
    },
];

export default function Dashboard() {
    return (
        <AppLayout title="Dashboard">
            <div className="space-y-6">
                {/* Page header */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Welcome back! Here's what's happening with your campaign.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.name} className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6">
                            <dt>
                                <div className="absolute rounded-md bg-primary-500 p-3">
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                            </dt>
                            <dd className="ml-16 flex items-baseline">
                                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {item.change}
                                </p>
                            </dd>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                            <div className="mt-6 flow-root">
                                <ul className="-mb-8">
                                    {recentActivities.map((activity, activityIdx) => (
                                        <li key={activity.id}>
                                            <div className="relative pb-8">
                                                {activityIdx !== recentActivities.length - 1 ? (
                                                    <span
                                                        className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                                                        aria-hidden="true"
                                                    />
                                                ) : null}
                                                <div className="relative flex items-start space-x-3">
                                                    <div className="relative">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500">
                                                            <activity.icon className="h-5 w-5 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div>
                                                            <div className="text-sm">
                                                                <span className="font-medium text-gray-900">
                                                                    {activity.content}
                                                                </span>
                                                            </div>
                                                            <p className="mt-0.5 text-sm text-gray-500">{activity.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Events</h3>
                            <div className="mt-6">
                                <div className="space-y-4">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    <CalendarIcon className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                    <p className="text-sm text-gray-500">{event.date}</p>
                                                    <p className="text-xs text-gray-400">{event.location} • {event.attendees} attendees</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Link
                                        href="/events"
                                        className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        View all events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Link
                                href="/campaigns/create"
                                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <SpeakerWaveIcon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">New Campaign</p>
                                    <p className="text-sm text-gray-500">Create SMS/WhatsApp campaign</p>
                                </div>
                            </Link>

                            <Link
                                href="/voters/create"
                                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <UsersIcon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">Add Voter</p>
                                    <p className="text-sm text-gray-500">Register new voter</p>
                                </div>
                            </Link>

                            <Link
                                href="/events/create"
                                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <CalendarIcon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">Schedule Event</p>
                                    <p className="text-sm text-gray-500">Plan rally or meeting</p>
                                </div>
                            </Link>

                            <Link
                                href="/tickets/create"
                                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <TicketIcon className="h-6 w-6 text-primary-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">New Ticket</p>
                                    <p className="text-sm text-gray-500">Log citizen issue</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
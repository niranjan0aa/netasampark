import React from 'react';
import { Head } from '@inertiajs/react';
import { 
  UsersIcon, 
  ChatBubbleLeftRightIcon, 
  TicketIcon, 
  CalendarIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';

const stats = [
  {
    name: 'Total Voters',
    value: '45,231',
    change: '+20.1%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Active Campaigns',
    value: '12',
    change: '+2',
    changeType: 'positive',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Open Tickets',
    value: '89',
    change: '-12.5%',
    changeType: 'negative',
    icon: TicketIcon,
  },
  {
    name: 'Upcoming Events',
    value: '23',
    change: '+5',
    changeType: 'positive',
    icon: CalendarIcon,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'voter_import',
    message: 'Bulk voter import completed for Ward 5',
    time: '2 hours ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'campaign',
    message: 'Festival campaign sent to 10,000 voters',
    time: '4 hours ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'ticket',
    message: 'New grievance ticket #1234 created',
    time: '6 hours ago',
    status: 'pending',
  },
  {
    id: 4,
    type: 'event',
    message: 'Rally scheduled for tomorrow at Central Park',
    time: '1 day ago',
    status: 'scheduled',
  },
];

export default function Dashboard() {
  return (
    <>
      <Head title="Dashboard - NetaSampark" />
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your campaign today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === 'positive' ? (
                    <TrendingUpIcon className="mr-1 h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDownIcon className="mr-1 h-4 w-4 text-red-500" />
                  )}
                  {stat.change} from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest updates from your campaign
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {activity.type === 'voter_import' && <UsersIcon className="h-4 w-4 text-blue-600" />}
                        {activity.type === 'campaign' && <ChatBubbleLeftRightIcon className="h-4 w-4 text-green-600" />}
                        {activity.type === 'ticket' && <TicketIcon className="h-4 w-4 text-orange-600" />}
                        {activity.type === 'event' && <CalendarIcon className="h-4 w-4 text-purple-600" />}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div>
                      <Badge 
                        variant={activity.status === 'success' ? 'default' : 
                                activity.status === 'pending' ? 'secondary' : 'outline'}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <UsersIcon className="mr-2 h-4 w-4" />
                Import Voters
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4" />
                Send Campaign
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Event
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TicketIcon className="mr-2 h-4 w-4" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Overview of your recent campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-muted-foreground">Delivery Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">12.8%</div>
                <div className="text-sm text-muted-foreground">Reply Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">₹2.45</div>
                <div className="text-sm text-muted-foreground">Cost per Contact</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
  ChatBubbleLeftRightIcon, 
  PlusIcon, 
  PaperAirplaneIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Textarea } from '@/Components/ui/textarea';

const campaigns = [
  {
    id: 1,
    name: 'Festival Greetings Campaign',
    type: 'WhatsApp',
    status: 'Active',
    recipients: 10000,
    sent: 9850,
    delivered: 9450,
    replied: 1200,
    created: '2024-01-15',
    template: 'Festival_Greeting_01'
  },
  {
    id: 2,
    name: 'Voter Registration Reminder',
    type: 'SMS',
    status: 'Scheduled',
    recipients: 5000,
    sent: 0,
    delivered: 0,
    replied: 0,
    created: '2024-01-16',
    template: 'Voter_Registration_01'
  },
  {
    id: 3,
    name: 'Rally Invitation',
    type: 'Email',
    status: 'Draft',
    recipients: 2500,
    sent: 0,
    delivered: 0,
    replied: 0,
    created: '2024-01-17',
    template: 'Rally_Invitation_01'
  }
];

const templates = [
  {
    id: 1,
    name: 'Festival Greeting',
    type: 'WhatsApp',
    content: '🎉 Happy {festival}! Wishing you and your family joy and prosperity. - {candidate_name}',
    status: 'Approved',
    language: 'Hindi'
  },
  {
    id: 2,
    name: 'Voter Registration Reminder',
    type: 'SMS',
    content: 'Dear {voter_name}, please ensure your voter ID is ready for the upcoming elections. - {party_name}',
    status: 'Pending',
    language: 'English'
  },
  {
    id: 3,
    name: 'Rally Invitation',
    type: 'Email',
    content: 'Join us for a grand rally at {venue} on {date}. Your presence matters! - {candidate_name}',
    status: 'Approved',
    language: 'English'
  }
];

const inboxMessages = [
  {
    id: 1,
    from: '+91 98765 43210',
    type: 'WhatsApp',
    message: 'Thank you for the festival wishes! When is the next rally?',
    time: '2 hours ago',
    status: 'Unread'
  },
  {
    id: 2,
    from: '+91 87654 32109',
    type: 'SMS',
    message: 'I want to volunteer for the campaign. How can I help?',
    time: '4 hours ago',
    status: 'Read'
  },
  {
    id: 3,
    from: 'voter@email.com',
    type: 'Email',
    message: 'Please add me to your supporter list. I believe in your vision.',
    time: '1 day ago',
    status: 'Replied'
  }
];

export default function Communication() {
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <>
      <Head title="Communication Hub - NetaSampark" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Communication Hub</h1>
            <p className="text-muted-foreground">
              Manage SMS, WhatsApp, Email, and Voice campaigns
            </p>
          </div>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <PaperAirplaneIcon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">156,789</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
              <CheckCircleIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">94.2%</div>
              <p className="text-xs text-muted-foreground">+1.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
              <ChatBubbleLeftIcon className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">12.8%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Monitor and manage your communication campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <Badge variant="outline">{campaign.type}</Badge>
                          <Badge 
                            variant={campaign.status === 'Active' ? 'default' : 
                                    campaign.status === 'Scheduled' ? 'secondary' : 'outline'}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Template: {campaign.template} • Created: {campaign.created}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span>Recipients: {campaign.recipients.toLocaleString()}</span>
                          <span>Sent: {campaign.sent.toLocaleString()}</span>
                          <span>Delivered: {campaign.delivered.toLocaleString()}</span>
                          <span>Replies: {campaign.replied.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Pause
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>
                  Manage approved and pending message templates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{template.name}</h3>
                          <Badge variant="outline">{template.type}</Badge>
                          <Badge 
                            variant={template.status === 'Approved' ? 'default' : 'secondary'}
                          >
                            {template.status}
                          </Badge>
                          <Badge variant="outline">{template.language}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {template.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inbox Messages</CardTitle>
                <CardDescription>
                  View and respond to incoming messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inboxMessages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium">{message.from}</span>
                            <Badge variant="outline">{message.type}</Badge>
                            <Badge 
                              variant={message.status === 'Unread' ? 'default' : 
                                      message.status === 'Read' ? 'secondary' : 'outline'}
                            >
                              {message.status}
                            </Badge>
                            <span className="text-sm text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                          <Button variant="outline" size="sm">
                            Forward
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                  <CardDescription>
                    Compare performance across communication channels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ChatBubbleLeftIcon className="h-4 w-4 text-green-600" />
                        <span>WhatsApp</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">94.2%</div>
                        <div className="text-xs text-gray-500">Delivery Rate</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <PhoneIcon className="h-4 w-4 text-blue-600" />
                        <span>SMS</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">89.7%</div>
                        <div className="text-xs text-gray-500">Delivery Rate</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <EnvelopeIcon className="h-4 w-4 text-purple-600" />
                        <span>Email</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">92.1%</div>
                        <div className="text-xs text-gray-500">Delivery Rate</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign ROI</CardTitle>
                  <CardDescription>
                    Return on investment for recent campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Festival Campaign</span>
                      <div className="text-right">
                        <div className="font-medium text-green-600">₹2.45</div>
                        <div className="text-xs text-gray-500">Cost per Contact</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Voter Registration</span>
                      <div className="text-right">
                        <div className="font-medium text-blue-600">₹1.89</div>
                        <div className="text-xs text-gray-500">Cost per Contact</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Rally Invitation</span>
                      <div className="text-right">
                        <div className="font-medium text-purple-600">₹0.75</div>
                        <div className="text-xs text-gray-500">Cost per Contact</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
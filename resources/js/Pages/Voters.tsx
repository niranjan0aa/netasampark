import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { 
  UsersIcon, 
  PlusIcon, 
  FunnelIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { generateInitials } from '@/lib/utils';

const voters = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    constituency: 'Mumbai Central',
    ward: 'Ward 5',
    booth: 'Booth 12',
    age: 35,
    gender: 'Male',
    occupation: 'Business',
    support_level: 'Strong',
    last_contact: '2024-01-15',
    tags: ['Influencer', 'Business Owner']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    phone: '+91 87654 32109',
    email: 'priya.sharma@email.com',
    constituency: 'Mumbai Central',
    ward: 'Ward 5',
    booth: 'Booth 12',
    age: 28,
    gender: 'Female',
    occupation: 'Teacher',
    support_level: 'Moderate',
    last_contact: '2024-01-10',
    tags: ['Educator', 'Community Leader']
  },
  {
    id: 3,
    name: 'Amit Patel',
    phone: '+91 76543 21098',
    email: 'amit.patel@email.com',
    constituency: 'Mumbai Central',
    ward: 'Ward 5',
    booth: 'Booth 12',
    age: 42,
    gender: 'Male',
    occupation: 'Engineer',
    support_level: 'Weak',
    last_contact: '2024-01-05',
    tags: ['Professional', 'Tech Savvy']
  }
];

const constituencies = [
  'Mumbai Central',
  'Mumbai North',
  'Mumbai South',
  'Mumbai East',
  'Mumbai West'
];

const wards = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5',
  'Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10'
];

export default function Voters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedSupportLevel, setSelectedSupportLevel] = useState('');

  const filteredVoters = voters.filter(voter => {
    const matchesSearch = voter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voter.phone.includes(searchTerm) ||
                         voter.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesConstituency = !selectedConstituency || voter.constituency === selectedConstituency;
    const matchesWard = !selectedWard || voter.ward === selectedWard;
    const matchesSupport = !selectedSupportLevel || voter.support_level === selectedSupportLevel;
    
    return matchesSearch && matchesConstituency && matchesWard && matchesSupport;
  });

  return (
    <>
      <Head title="Voter CRM - NetaSampark" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Voter CRM</h1>
            <p className="text-muted-foreground">
              Manage your voter database and segmentation
            </p>
          </div>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Voter
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">+2,341 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Strong Supporters</CardTitle>
              <UsersIcon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18,456</div>
              <p className="text-xs text-muted-foreground">40.8% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moderate Supporters</CardTitle>
              <UsersIcon className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">15,789</div>
              <p className="text-xs text-muted-foreground">34.9% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weak Supporters</CardTitle>
              <UsersIcon className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">10,986</div>
              <p className="text-xs text-muted-foreground">24.3% of total</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filters & Search</CardTitle>
            <CardDescription>
              Narrow down your voter list with advanced filters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search voters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedConstituency}
                onChange={(e) => setSelectedConstituency(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Constituencies</option>
                {constituencies.map(constituency => (
                  <option key={constituency} value={constituency}>{constituency}</option>
                ))}
              </select>
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Wards</option>
                {wards.map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
              <select
                value={selectedSupportLevel}
                onChange={(e) => setSelectedSupportLevel(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">All Support Levels</option>
                <option value="Strong">Strong</option>
                <option value="Moderate">Moderate</option>
                <option value="Weak">Weak</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Voters List */}
        <Card>
          <CardHeader>
            <CardTitle>Voters ({filteredVoters.length})</CardTitle>
            <CardDescription>
              Manage your voter database with detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredVoters.map((voter) => (
                <div key={voter.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/avatars/${voter.id}.png`} alt={voter.name} />
                    <AvatarFallback>{generateInitials(voter.name)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900">{voter.name}</h3>
                      <Badge 
                        variant={voter.support_level === 'Strong' ? 'default' : 
                                voter.support_level === 'Moderate' ? 'secondary' : 'destructive'}
                      >
                        {voter.support_level}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        {voter.phone}
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="h-4 w-4 mr-1" />
                        {voter.email}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {voter.constituency} • {voter.ward} • {voter.booth}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2">
                      {voter.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
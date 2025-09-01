import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
    {
        id: 'starter',
        name: 'Starter',
        price: '₹2,999',
        period: '/month',
        description: 'Perfect for small constituencies',
        features: [
            '10,000 voter contacts',
            '5,000 SMS/month',
            '2,000 WhatsApp messages/month',
            'Basic analytics',
            'Email support',
        ],
    },
    {
        id: 'professional',
        name: 'Professional',
        price: '₹9,999',
        period: '/month',
        description: 'Ideal for assembly constituencies',
        features: [
            '50,000 voter contacts',
            '25,000 SMS/month',
            '10,000 WhatsApp messages/month',
            'Advanced analytics & predictions',
            'Voice campaigns',
            'Priority support',
            'Custom integrations',
        ],
        popular: true,
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: '₹29,999',
        period: '/month',
        description: 'For parliamentary constituencies',
        features: [
            'Unlimited voter contacts',
            'Unlimited messaging',
            'Full feature access',
            'Dedicated account manager',
            'Custom development',
            'White-label options',
        ],
    },
];

export default function TenantRegistration() {
    const [selectedPlan, setSelectedPlan] = useState('professional');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        subdomain: '',
        plan: 'professional',
        admin_name: '',
        admin_email: '',
        admin_password: '',
        phone: '',
        organization: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    const handleSubdomainChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
        setData('subdomain', value);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Register Your Organization" />
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">
                        Start Your Free Trial
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Get started with NetaSampark in minutes. 14-day free trial, no credit card required.
                    </p>
                </div>

                <div className="mt-12 lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Registration Form */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Organization Details</h2>
                        
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="e.g., BJP Delhi, Congress Mumbai"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Organization Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="contact@yourorganization.com"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700">
                                    Choose Your Subdomain
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        id="subdomain"
                                        value={data.subdomain}
                                        onChange={handleSubdomainChange}
                                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        placeholder="yourname"
                                    />
                                    <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        .netasampark.com
                                    </span>
                                </div>
                                {errors.subdomain && <p className="mt-1 text-sm text-red-600">{errors.subdomain}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="+91 98765 43210"
                                />
                                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <hr className="my-6" />

                            <h3 className="text-lg font-medium text-gray-900 mb-4">Admin User Details</h3>

                            <div>
                                <label htmlFor="admin_name" className="block text-sm font-medium text-gray-700">
                                    Admin Name
                                </label>
                                <input
                                    type="text"
                                    id="admin_name"
                                    value={data.admin_name}
                                    onChange={(e) => setData('admin_name', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                                {errors.admin_name && <p className="mt-1 text-sm text-red-600">{errors.admin_name}</p>}
                            </div>

                            <div>
                                <label htmlFor="admin_email" className="block text-sm font-medium text-gray-700">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    id="admin_email"
                                    value={data.admin_email}
                                    onChange={(e) => setData('admin_email', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                                {errors.admin_email && <p className="mt-1 text-sm text-red-600">{errors.admin_email}</p>}
                            </div>

                            <div>
                                <label htmlFor="admin_password" className="block text-sm font-medium text-gray-700">
                                    Admin Password
                                </label>
                                <input
                                    type="password"
                                    id="admin_password"
                                    value={data.admin_password}
                                    onChange={(e) => setData('admin_password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                                {errors.admin_password && <p className="mt-1 text-sm text-red-600">{errors.admin_password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                            >
                                {processing ? 'Creating Account...' : 'Start Free Trial'}
                            </button>
                        </form>
                    </div>

                    {/* Plan Selection */}
                    <div className="mt-8 lg:mt-0">
                        <h2 className="text-lg font-medium text-gray-900 mb-6">Select Your Plan</h2>
                        <div className="space-y-4">
                            {plans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`relative rounded-lg border p-4 cursor-pointer ${
                                        selectedPlan === plan.id
                                            ? 'border-primary-500 ring-2 ring-primary-500'
                                            : 'border-gray-300'
                                    } ${plan.popular ? 'ring-2 ring-primary-200' : ''}`}
                                    onClick={() => {
                                        setSelectedPlan(plan.id);
                                        setData('plan', plan.id);
                                    }}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-2 left-4">
                                            <span className="bg-primary-500 text-white px-2 py-1 text-xs font-medium rounded">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                                            <p className="text-sm text-gray-500">{plan.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                                            <div className="text-sm text-gray-500">{plan.period}</div>
                                        </div>
                                    </div>
                                    
                                    <ul className="mt-4 space-y-2">
                                        {plan.features.slice(0, 3).map((feature) => (
                                            <li key={feature} className="flex items-center text-sm text-gray-600">
                                                <CheckIcon className="h-4 w-4 text-green-500 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                        {plan.features.length > 3 && (
                                            <li className="text-sm text-gray-500">
                                                +{plan.features.length - 3} more features
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="text-sm font-medium text-blue-900">14-Day Free Trial</h4>
                            <p className="mt-1 text-sm text-blue-700">
                                No credit card required. Full access to all features during trial period.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
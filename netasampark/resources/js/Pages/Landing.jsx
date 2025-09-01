import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    UsersIcon, 
    SpeakerWaveIcon, 
    ChartBarIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    CheckIcon
} from '@heroicons/react/24/outline';

const features = [
    {
        name: 'Voter CRM',
        description: 'Comprehensive voter database with demographic profiling, segmentation, and household mapping.',
        icon: UsersIcon,
    },
    {
        name: 'Multi-Channel Communication',
        description: 'SMS, WhatsApp, Email, and Voice campaigns with DLT compliance and real-time tracking.',
        icon: DevicePhoneMobileIcon,
    },
    {
        name: 'Campaign Analytics',
        description: 'Advanced analytics with support prediction, swing booth detection, and ROI tracking.',
        icon: ChartBarIcon,
    },
    {
        name: 'Issue Tracking',
        description: 'Complete grievance management system with SLA tracking and citizen notifications.',
        icon: SpeakerWaveIcon,
    },
    {
        name: 'Multi-language Support',
        description: 'Full support for all Indian languages with automatic translation capabilities.',
        icon: GlobeAltIcon,
    },
    {
        name: 'Compliance Ready',
        description: 'Election Commission compliance, TRAI DLT integration, and automated reporting.',
        icon: ShieldCheckIcon,
    },
];

const plans = [
    {
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

export default function Landing() {
    return (
        <div className="bg-white">
            <Head title="Political CRM & Campaign Management" />

            {/* Header */}
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="text-2xl font-bold text-primary-600">NetaSampark</span>
                        </a>
                    </div>
                    <div className="flex lg:flex-1 lg:justify-end">
                        <Link
                            href="/register"
                            className="text-sm font-semibold leading-6 text-gray-900 mr-4"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href="/admin/login"
                            className="text-sm font-semibold leading-6 text-primary-600"
                        >
                            Admin Login <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero section */}
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Complete Political CRM & Campaign Management
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Empower your political campaigns with NetaSampark - India's most comprehensive 
                            political CRM with voter management, multi-channel communication, and advanced analytics.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/register"
                                className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Start Free Trial
                            </Link>
                            <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features section */}
            <div id="features" className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Everything you need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Complete Political Campaign Solution
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            From voter management to campaign execution, NetaSampark provides all the tools 
                            you need to run successful political campaigns in India.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {features.map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Pricing section */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600">Pricing</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Choose the right plan for your campaign
                        </p>
                    </div>
                    <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`rounded-3xl p-8 ring-1 ${
                                    plan.popular
                                        ? 'bg-primary-600 ring-primary-600 text-white'
                                        : 'bg-white ring-gray-200'
                                }`}
                            >
                                <h3 className={`text-lg font-semibold leading-8 ${
                                    plan.popular ? 'text-white' : 'text-gray-900'
                                }`}>
                                    {plan.name}
                                </h3>
                                <p className={`mt-4 text-sm leading-6 ${
                                    plan.popular ? 'text-primary-100' : 'text-gray-600'
                                }`}>
                                    {plan.description}
                                </p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className={`text-4xl font-bold tracking-tight ${
                                        plan.popular ? 'text-white' : 'text-gray-900'
                                    }`}>
                                        {plan.price}
                                    </span>
                                    <span className={`text-sm font-semibold leading-6 ${
                                        plan.popular ? 'text-primary-100' : 'text-gray-600'
                                    }`}>
                                        {plan.period}
                                    </span>
                                </p>
                                <Link
                                    href="/register"
                                    className={`mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                                        plan.popular
                                            ? 'bg-white text-primary-600 hover:bg-gray-100 focus-visible:outline-white'
                                            : 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                                    }`}
                                >
                                    Start free trial
                                </Link>
                                <ul className={`mt-8 space-y-3 text-sm leading-6 ${
                                    plan.popular ? 'text-primary-100' : 'text-gray-600'
                                }`}>
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon
                                                className={`h-6 w-5 flex-none ${
                                                    plan.popular ? 'text-white' : 'text-primary-600'
                                                }`}
                                                aria-hidden="true"
                                            />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <p className="text-xs leading-5 text-gray-500">
                            &copy; 2025 NetaSampark. All rights reserved.
                        </p>
                    </div>
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-gray-500">
                            Built for Indian political campaigns with compliance and security in mind.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
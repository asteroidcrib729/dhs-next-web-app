"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const toggleBilling = (cycle: 'monthly' | 'annual') => {
        setBillingCycle(cycle);
    };

    const plans = [
        {
            name: 'Freelancer',
            description: 'The essentials to provide your best work for clients.',
            monthlyPrice: 19,
            annualPrice: 15,
            features: [
                '5 products',
                'Up to 1,000 subscribers',
                'Basic analytics',
                '48-hour support response time',
            ],
            popular: false,
        },
        {
            name: 'Startup',
            description: 'A plan that scales with your rapidly growing business.',
            monthlyPrice: 29,
            annualPrice: 25,
            features: [
                '25 products',
                'Up to 10,000 subscribers',
                'Advanced analytics',
                '24-hour support response time',
                'Marketing automations',
            ],
            popular: true,
        },
        {
            name: 'Enterprise',
            description: 'Dedicated support and infrastructure for your company.',
            monthlyPrice: 59,
            annualPrice: 55,
            features: [
                'Unlimited products',
                'Unlimited subscribers',
                'Advanced analytics',
                '1-hour, dedicated support response time',
                'Marketing automations',
                'Custom reporting tools',
            ],
            popular: false,
        },
    ];

    const CheckIcon = () => (
        <svg
            className="h-5 w-5 shrink-0 text-indigo-500"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5 10l3 3 7-7" />
        </svg>
    );

    return (
        <section className="relative isolate overflow-hidden bg-white py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-semibold leading-7 text-indigo-400">Pricing</h2>
                    <p className="mt-6 text-3xl font-bold tracking-tight text-black sm:text-4xl">
                        Pricing that grows with you
                    </p>
                    <p className="mt-6 text-lg leading-8 text-black">
                        Choose an affordable plan that&#39;s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
                    </p>

                    {/* Billing toggle */}
                    <div className="mt-10 flex justify-center text-sm">
                        <button
                            type="button"
                            className={`relative flex items-center px-4 py-2 rounded-l-full border border-indigo-500 focus:outline-none ${billingCycle === 'monthly'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-transparent text-indigo-400'
                                }`}
                            onClick={() => toggleBilling('monthly')}
                        >
                            Monthly
                        </button>
                        <button
                            type="button"
                            className={`relative flex items-center px-4 py-2 rounded-r-full border border-indigo-500 focus:outline-none -ml-px ${billingCycle === 'annual'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-transparent text-indigo-400'
                                }`}
                            onClick={() => toggleBilling('annual')}
                        >
                            Annually
                        </button>
                    </div>
                </div>

                {/* Pricing cards container */}
                <div className="mt-12 grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                    {plans.map((plan) => {
                        const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
                        return (
                            <div
                                key={plan.name}
                                className={`
                                    relative rounded-2xl p-8 xl:p-10 hover:scale-[103%] hover:shadow-lg hover:shadow-indigo-600 transition-all duration-300 
                                    ${plan.popular ? 'bg-gradient-to-b from-[#0F1040] via-[#0C0F3A] to-[#05061A] ring-2 ring-indigo-600' : 'bg-[#0D1036]'}
                                `}
                            >
                                {/* "Most popular" badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                                            Most popular
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold leading-8 text-white">{plan.name}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-400">{plan.description}</p>
                                <p className="mt-8 flex items-baseline gap-x-2">
                                    <span className="text-4xl font-bold tracking-tight text-white">${price}</span>
                                    <span className="text-base font-medium text-gray-400">/month</span>
                                </p>
                                <Link
                                    href="/contact"
                                    className={`text-center mt-8 block w-full rounded-lg px-4 py-2 text-sm font-semibold shadow-sm focus:outline-none transition-colors pointer-cursor ${plan.popular
                                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                                        }`}
                                >
                                    Buy plan
                                </Link>
                                {/* Features list */}
                                <ul className="mt-8 space-y-4 text-sm leading-6 text-gray-300">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckIcon />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Decorative background gradient blob in the lower section. */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-80 bg-gradient-to-tr from-indigo-600/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                aria-hidden="true"
            />
        </section>
    );
}
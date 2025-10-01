import React from 'react';

const Pricing: React.FC = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$19',
            features: [
                'Everything you need to get started',
                'Email marketing',
                'Website builder',
                'Advanced analytics',
                'Customer segmentation',
                'Priority phone support',
            ],
            buttonText: 'Start a free trial',
        },
        {
            name: 'Growth',
            price: '$49',
            features: [
                'All the essentials for your growing team',
                'Email marketing',
                'Website builder',
                'Advanced analytics',
                'Customer segmentation',
                'Priority phone support',
            ],
            buttonText: 'Start a free trial',
        },
        {
            name: 'Scale',
            price: '$99',
            features: [
                'All the features you need for scale',
                'Email marketing',
                'Website builder',
                'Advanced analytics',
                'Customer segmentation',
                'Priority phone support',
            ],
            buttonText: 'Start a free trial',
        },
    ];

    const brands = [
        {
            name: 'Transistor', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.8211 4 15.426 4.70014 16.5165 5.8698C17.6069 7.03947 18.232 8.61869 18.232 10.3235C18.232 12.0283 17.6069 13.6075 16.5165 14.7772C15.426 15.9469 13.8211 16.647 12 16.647C10.1789 16.647 8.57398 15.9469 7.48352 14.7772C6.39306 13.6075 5.76799 12.0283 5.76799 10.3235C5.76799 8.61869 6.39306 7.03947 7.48352 5.8698C8.57398 4.70014 10.1789 4 12 4ZM12 6C10.4289 6 9.00661 6.60835 7.96282 7.70889C6.91903 8.80943 6.33333 10.2798 6.33333 11.8571C6.33333 13.4344 6.91903 14.9048 7.96282 16.0053C9.00661 17.1059 10.4289 17.7142 12 17.7142C13.5711 17.7142 14.9934 17.1059 16.0372 16.0053C17.081 14.9048 17.6667 13.4344 17.6667 11.8571C17.6667 10.2798 17.081 8.80943 16.0372 7.70889C14.9934 6.60835 13.5711 6 12 6Z" fill="#7C3AED" />
                    <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#7C3AED" />
                </svg>
            )
        },
        {
            name: 'Laravel', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.8211 4 15.426 4.70014 16.5165 5.8698C17.6069 7.03947 18.232 8.61869 18.232 10.3235C18.232 12.0283 17.6069 13.6075 16.5165 14.7772C15.426 15.9469 13.8211 16.647 12 16.647C10.1789 16.647 8.57398 15.9469 7.48352 14.7772C6.39306 13.6075 5.76799 12.0283 5.76799 10.3235C5.76799 8.61869 6.39306 7.03947 7.48352 5.8698C8.57398 4.70014 10.1789 4 12 4ZM12 6C10.4289 6 9.00661 6.60835 7.96282 7.70889C6.91903 8.80943 6.33333 10.2798 6.33333 11.8571C6.33333 13.4344 6.91903 14.9048 7.96282 16.0053C9.00661 17.1059 10.4289 17.7142 12 17.7142C13.5711 17.7142 14.9934 17.1059 16.0372 16.0053C17.081 14.9048 17.6667 13.4344 17.6667 11.8571C17.6667 10.2798 17.081 8.80943 16.0372 7.70889C14.9934 6.60835 13.5711 6 12 6Z" fill="#F05340" />
                    <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#F05340" />
                </svg>
            )
        },
        {
            name: 'Tuple', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.8211 4 15.426 4.70014 16.5165 5.8698C17.6069 7.03947 18.232 8.61869 18.232 10.3235C18.232 12.0283 17.6069 13.6075 16.5165 14.7772C15.426 15.9469 13.8211 16.647 12 16.647C10.1789 16.647 8.57398 15.9469 7.48352 14.7772C6.39306 13.6075 5.76799 12.0283 5.76799 10.3235C5.76799 8.61869 6.39306 7.03947 7.48352 5.8698C8.57398 4.70014 10.1789 4 12 4ZM12 6C10.4289 6 9.00661 6.60835 7.96282 7.70889C6.91903 8.80943 6.33333 10.2798 6.33333 11.8571C6.33333 13.4344 6.91903 14.9048 7.96282 16.0053C9.00661 17.1059 10.4289 17.7142 12 17.7142C13.5711 17.7142 14.9934 17.1059 16.0372 16.0053C17.081 14.9048 17.6667 13.4344 17.6667 11.8571C17.6667 10.2798 17.081 8.80943 16.0372 7.70889C14.9934 6.60835 13.5711 6 12 6Z" fill="#1C64F2" />
                    <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#1C64F2" />
                </svg>
            )
        },
        {
            name: 'SavvyCal', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.8211 4 15.426 4.70014 16.5165 5.8698C17.6069 7.03947 18.232 8.61869 18.232 10.3235C18.232 12.0283 17.6069 13.6075 16.5165 14.7772C15.426 15.9469 13.8211 16.647 12 16.647C10.1789 16.647 8.57398 15.9469 7.48352 14.7772C6.39306 13.6075 5.76799 12.0283 5.76799 10.3235C5.76799 8.61869 6.39306 7.03947 7.48352 5.8698C8.57398 4.70014 10.1789 4 12 4ZM12 6C10.4289 6 9.00661 6.60835 7.96282 7.70889C6.91903 8.80943 6.33333 10.2798 6.33333 11.8571C6.33333 13.4344 6.91903 14.9048 7.96282 16.0053C9.00661 17.1059 10.4289 17.7142 12 17.7142C13.5711 17.7142 14.9934 17.1059 16.0372 16.0053C17.081 14.9048 17.6667 13.4344 17.6667 11.8571C17.6667 10.2798 17.081 8.80943 16.0372 7.70889C14.9934 6.60835 13.5711 6 12 6Z" fill="#5EEAD4" />
                    <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#5EEAD4" />
                </svg>
            )
        },
        {
            name: 'Statamic', icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.8211 4 15.426 4.70014 16.5165 5.8698C17.6069 7.03947 18.232 8.61869 18.232 10.3235C18.232 12.0283 17.6069 13.6075 16.5165 14.7772C15.426 15.9469 13.8211 16.647 12 16.647C10.1789 16.647 8.57398 15.9469 7.48352 14.7772C6.39306 13.6075 5.76799 12.0283 5.76799 10.3235C5.76799 8.61869 6.39306 7.03947 7.48352 5.8698C8.57398 4.70014 10.1789 4 12 4ZM12 6C10.4289 6 9.00661 6.60835 7.96282 7.70889C6.91903 8.80943 6.33333 10.2798 6.33333 11.8571C6.33333 13.4344 6.91903 14.9048 7.96282 16.0053C9.00661 17.1059 10.4289 17.7142 12 17.7142C13.5711 17.7142 14.9934 17.1059 16.0372 16.0053C17.081 14.9048 17.6667 13.4344 17.6667 11.8571C17.6667 10.2798 17.081 8.80943 16.0372 7.70889C14.9934 6.60835 13.5711 6 12 6Z" fill="#F87171" />
                    <path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#F87171" />
                </svg>
            )
        },
    ];

    const tableFeatures = [
        {
            category: 'Features',
            items: [
                { name: 'Edge content delivery', starter: true, growth: true, scale: true },
                { name: 'Custom domains', starter: true, growth: true, scale: true },
                { name: 'Team members', starter: 1, growth: 3, scale: 'Unlimited' },
                { name: 'Storage capacity', starter: '10GB', growth: '20GB', scale: 'Unlimited' },
            ],
        },
        {
            category: 'Reporting',
            items: [
                { name: 'Advanced analytics', starter: true, growth: true, scale: true },
                { name: 'Email reports', starter: false, growth: true, scale: true },
                { name: 'Professional reports', starter: false, growth: false, scale: true },
                { name: 'Custom report builder', starter: false, growth: false, scale: true },
            ],
        },
        {
            category: 'Support',
            items: [
                { name: '24/7 online support', starter: true, growth: true, scale: true },
                { name: 'Dedicated account manager', starter: false, growth: true, scale: true },
                { name: 'Priority phone support', starter: false, growth: true, scale: true },
                { name: 'API access', starter: false, growth: false, scale: true },
            ],
        },
    ];

    const CheckIcon: React.FC = () => (
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );

    const MinusIcon: React.FC = () => (
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
    );

    return (
        <section className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-gray-50">
                        Pricing that grows with your team size
                    </h2>
                    <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
                        Choose an affordable plan that&#39;s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 mb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`rounded-3xl shadow-lg p-8 flex flex-col ${index === 1 ? 'bg-indigo-600' : 'bg-gray-800 border border-gray-700'
                                }`}
                        >
                            <h3 className={`text-xl font-semibold ${index === 1 ? 'text-white' : 'text-gray-200'}`}>
                                {plan.name}
                            </h3>
                            <p className="mt-4 flex items-baseline">
                                <span className={`text-5xl font-extrabold tracking-tight ${index === 1 ? 'text-white' : 'text-gray-50'}`}>
                                    {plan.price}
                                </span>
                                <span className={`ml-1 text-2xl font-medium ${index === 1 ? 'text-indigo-200' : 'text-gray-400'}`}>
                                    USD
                                </span>
                                <span className={`ml-1 text-lg font-medium ${index === 1 ? 'text-indigo-200' : 'text-gray-400'}`}>
                                    / month
                                </span>
                            </p>
                            <p className={`mt-2 text-base ${index === 1 ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {plan.features[0]}
                            </p>

                            <div className="mt-8 flex flex-col justify-center">
                                <a
                                    href="#"
                                    className={`inline-block w-full py-4 text-center rounded-lg text-lg font-semibold shadow-sm transition-colors duration-200 ${index === 1
                                            ? 'bg-white text-indigo-600 hover:bg-gray-100'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                >
                                    {plan.buttonText}
                                </a>
                            </div>

                            <ul role="list" className={`mt-8 space-y-3 flex-grow ${index === 1 ? 'text-indigo-200' : 'text-gray-400'}`}>
                                {plan.features.slice(1).map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <CheckIcon />
                                        <span className="ml-3 text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Brands Section */}
                <div className="flex justify-center items-center space-x-8 lg:space-x-12 mb-20 flex-wrap gap-y-6">
                    {brands.map((brand) => (
                        <div key={brand.name} className="flex flex-col items-center justify-center">
                            {brand.icon}
                            <span className="mt-2 text-sm text-gray-400">{brand.name}</span>
                        </div>
                    ))}
                </div>

                {/* Feature Comparison Table */}
                <div className="relative overflow-x-auto rounded-lg shadow-lg border border-gray-700">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs uppercase bg-gray-800 text-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Feature
                                </th>
                                {plans.map((plan) => (
                                    <th key={`th-${plan.name}`} scope="col" className="px-6 py-4 text-center">
                                        {plan.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableFeatures.map((categoryData, catIndex) => (
                                <React.Fragment key={categoryData.category}>
                                    <tr className="bg-gray-800">
                                        <th scope="row" colSpan={plans.length + 1} className="px-6 py-4 font-bold text-lg text-gray-50">
                                            {categoryData.category}
                                        </th>
                                    </tr>
                                    {categoryData.items.map((item, itemIndex) => (
                                        <tr
                                            key={item.name}
                                            className={`${itemIndex % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} border-b border-gray-700`}
                                        >
                                            <td className="px-6 py-3 font-medium text-gray-300 whitespace-nowrap">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {typeof item.starter === 'boolean' ? (item.starter ? <CheckIcon /> : <MinusIcon />) : item.starter}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {typeof item.growth === 'boolean' ? (item.growth ? <CheckIcon /> : <MinusIcon />) : item.growth}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {typeof item.scale === 'boolean' ? (item.scale ? <CheckIcon /> : <MinusIcon />) : item.scale}
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
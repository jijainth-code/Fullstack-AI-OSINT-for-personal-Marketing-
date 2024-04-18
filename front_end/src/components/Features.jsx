import 'tailwindcss/tailwind.css';
import React from 'react';

const features = [
  { id: 1, title: 'Feature One', description: 'Description of feature one.' },
  { id: 2, title: 'Feature Two', description: 'Description of feature two.' },
  { id: 3, title: 'Feature Three', description: 'Description of feature three.' },
];

const FeatureCard = ({ title, description }) => (
  <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
    <p className="font-normal text-gray-700">{description}</p>
  </div>
);

const Features = () => {
  return (
    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {features.map(feature => (
        <FeatureCard key={feature.id} {...feature} />
      ))}
    </div>
  );
};

export default Features;

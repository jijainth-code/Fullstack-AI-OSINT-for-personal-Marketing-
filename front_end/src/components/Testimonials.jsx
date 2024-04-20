import 'tailwindcss/tailwind.css';
import React from 'react';

const testimonials = [
  { id: 1, name: 'John Doe', text: 'This service is fantastic! It really helped us grow.' },
  { id: 2, name: 'Jane Smith', text: 'Absolutely love it! Highly recommended.' }
];

const TestimonialCard = ({ name, text }) => (
  <div className="p-6 max-w-md bg-white rounded-lg border border-gray-200 shadow-md">
    <p className="text-gray-600">{text}</p>
    <p className="mt-4 text-gray-900 font-bold">{name}</p>
  </div>
);

const Testimonials = () => {
  return (
    <div className="p-5 flex space-x-4 overflow-x-auto">
      {testimonials.map(testimonial => (
        <TestimonialCard key={testimonial.id} {...testimonial} />
      ))}
    </div>
  );
};

export default Testimonials;

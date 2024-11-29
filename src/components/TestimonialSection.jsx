import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";

const TestimonialSection = () => {
  const testimonials = [
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 4,
      text: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and.",
      name: "Name Surname 1",
    },
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae nisi euismod, gravida lorem.",
      name: "Name Surname 2",
    },
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 3,
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      name: "Name Surname 3",
    },
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 4,
      text: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      name: "Name Surname 4",
    },
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 5,
      text: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      name: "Name Surname 5",
    },
    {
      imageSrc: "https://via.placeholder.com/50x50",
      rating: 4,
      text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
      name: "Name Surname 6",
    },
  ];

  return (
    <section className="py-12 mx-auto mt-20 mb-40 bg-white rounded-lg container-fluid">
      <h2 className="px-8 mb-6 text-4xl font-semibold text-left ">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            imageSrc={testimonial.imageSrc}
            rating={testimonial.rating}
            text={testimonial.text}
            name={testimonial.name}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;

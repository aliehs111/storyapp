import React, { useState } from 'react';
import axios from 'axios';


const faqs = [
    {
      id: 1,
      question: "Your first day of school! ",
      answer:
        "Did your parents take you?  Did you ride a school bus?  Did you walk to school?  Did you bring a lunch?  Did you have a favorite teacher?  Did you have a best friend at school?",
    },
    {
      id: 2,
      question: "Tell them how you learned to read.",
      answer:
        "Who who taught you and how old were you when you learned to read? Do you remember the book you read?  What language did you first learn? Did you every write letters to people?",
    },
    {
      id: 3,
      question: "Tell them about your favoite activity when you were their age",
      answer:
        "What was it like not to have cell phones or tablets? Did you play outside with other kids?  Did you like to draw pictures or play with legos?",
    },
    {
      id: 4,
      question: "Read them a book!",
      answer:
        "Maybe you could read them your favorite childhood book or tell them about that book and who would read it to you.  Why did you like that book?  Did you ever go to the library as a child and borrow books?",
    },
    {
      id: 5,
      question: "Ask them to upload a video to tell you what kind of stories they want to hear",
      answer:
        "In any of your video uploads, be sure to ask them for feedback on the video.  This app is meant to be an interactive community centered around all the people who love Kenzo and Kohji!",
    },
    {
      id: 6,
      question: "Tell them about your pets!",
      answer:
        "Maybe include your pet in the video! And tell them about any other pets you have had in your lifetime and what was special about them!",
    },
    {
      id: 7,
      question: "Tell them about family members who are no longer with us and your special memories of family traditions",
      answer:
        "Tell them about their own ancestors if you know about them.  Tell them about your own grandparents and great grandparents and what you remember about them.  Tell them about family traditions that you remember and what made them special.",
    },
    {
      id: 8,
      question: "Tell them a funny story!",
      answer:
        "Did you lose your keys today just to find them in your pocket?  Did you bump into someone at the grocery store?  Did your pet do something funny?  Kenzo and Kohji love a good laugh!!",
    },
    {
        id: 9,
        question: "Take the boys for a virtual walk!",
        answer:
          "Are you taking your pet for a walk?  Maybe you're going to the mall or the grocery store.  Show he boys a little bit of your environment so they can see what you're up to!",
      },

  ]
  
  export default function StoryTopics() {
  return (
    <div className="dark:bg-gray-900 dark:text-white flex min-h-full flex-1 flex-col justify-center px-4 py-6 lg:px-4">
<div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Story Ideas! Tell Kenzo and Kohji about...</h2>
       
        <div className="mt-20">
          <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-base font-semibold leading-7 text-white">{faq.question}</dt>
                <dd className="mt-2 text-base leading-7 text-gray-300">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </div>
  )
  };    
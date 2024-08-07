import React, { useState } from 'react';
import axios from 'axios';

import kenzoProfile from '../assets/kenzoProfile.jpeg';
import kohjihike from '../assets/kohjihike.jpeg';
import kekoipad from '../assets/kekoipad.jpeg';
import kenzosailing from '../assets/kenzosailing.jpeg';

import kenzohockey from '../assets/kenzohockey.jpeg';
import kohjimustache from '../assets/kohjimustache.jpeg';
import StoryApp from '../assets/StoryApp.png'

const logo = StoryApp 


const bgImage = kenzoProfile;
const img1 = kohjihike;
const img2 = kekoipad;
const img3 = kenzosailing;
const img4 = kenzohockey;
const img5 = kohjimustache;




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
      question: "Tell them about family members or special friends who are no longer with us and your special memories of family traditions",
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
          "Are you taking your pet for a walk?  Maybe you're going to the mall or the grocery store.  Show the boys a little bit of your environment so they can see what you're up to!",
      },
      {
        id: 10,
        question: "Do you remember the day each one of them was born?",
        answer:
          "What were you doing that day?  How did you finally hear they were born?  When is the first time you laid eyes on them?  What did they look like when they were born?",
      },
      {
        id: 11,
        question: "What is your favorite season or holiday?",
        answer:
          "Are you a big fan of summer?  Do you love Christmas?  Why are some of these seasons or holidays special for you?  Share some memories of these holidays or seasons from when you were little!",
      },
      {
        id: 12,
        question: "Food Videos!",
        answer:
          "So many topics on food!  Are you cooking something special?  What food did you like best when you were a kid?  What food do you like now?  What food do you not like?",
      },

  ]
  
  export default function StoryTopics() {
  return (
    <div className="dark:bg-gray-900 dark:text-white flex min-h-full flex-1 flex-col justify-center px-4 py-6 lg:px-4">
<div className="bg-gray-900">
<img
          alt="Your Company"
          src={logo}
          className="mx-auto h-40 w-auto rounded-md"
        />
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-10 lg:px-8">
  
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">Here's some topics to give you some ideas...</h2>
       
        <div className="mt-10">
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

<div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                    <div className="relative">
                      <img
                        alt=""
                        src={img1}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <img
                        alt=""
                        src={img2}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={img3}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <img
                        alt=""
                        src={img4}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <img
                        alt=""
                        src={img5}
                        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>

    </div>
    </div>
  )
  };    
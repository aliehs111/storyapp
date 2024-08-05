import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import kenzoProfile from "../assets/kenzoProfile.jpeg";

import kekohike from "../assets/kekohike.jpeg";

const bgImage = kenzoProfile;

const wideImage = kekohike;

const stats = [
  { label: "Transactions every 24 hours", value: "44 million" },
  { label: "Assets under holding", value: "$119 trillion" },
  { label: "New users annually", value: "46,000" },
];
const values = [
  {
    name: "Stories are a communal currency of humanity.",
    description: "--Tahir Shah, in Arabian Nights",
  },
  {
    name: "The human species thinks in metaphors and learns through stories.",
    description: "--Mary Catherine Bateson",
  },
  {
    name: "Sometimes reality is too complex. Stories give it form.",
    description: "--Jean Luc Godard",
  },
  {
    name: "There's always room for a story that can transport people to another place.",
    description: "--J.K. Rowling",
  },
  {
    name: "If you want your children to be smart, tell them stories. If you want them to be really smart, tell them more stories. If you want your children to be brilliant, tell them even more stories.",
    description: "--Albert Einstein",
  },
  {
    name: "You’re never going to kill storytelling because it’s built into the human plan. We come with it.",
    description: "–Margaret Atwood",
  },
];

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

export default function LearnMore() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative bg-white">
      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10">
          {/* Background Image */}
          <img
            alt=""
            src={bgImage}
            className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 -z-10 bg-black/75" />

          {/* <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg> */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                {/* Centering the text */}
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl text-center mx-auto pt-8 text-slate-300 text-opacity-75">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-3xl">
                    You are a child of the universe, no less than the trees and
                    the stars; you have a right to be here.
                  </h1>
                  <h3 className="text-2xl font-bold tracking-tight text-slate-400 sm:text-xl">
                    {" "}
                    -- Desiderata, Max Ehrmann{" "}
                  </h3>
                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    It has been scientifically proven that children who have
                    their family and loved ones verbally tell them stories have
                    better self-esteem, are more resilient, and have a better
                    sense of their self and how they view the world. There are
                    even studies of a childrens' brains while being told a story
                    as the brain works to conjure up the the imagery and think
                    about the feelings of the storyteller's and other
                    characters.
                  </p>
                    <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                      In modern life when children are separated from extended
                      family, children can miss out on their own family's
                      historical culture. An it's not about the the notable
                      fantastic tales, it's the day-to-day lives, the seemingly
                      inconsequential aspects of day-to-day living and sharing
                      our thoughts with a child that help them really understand
                      where they came from and the values of their family. They
                      need to see their heros in life are just as human, just as
                      falable as they are.
                    </p>
                 
                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    Why StoryApp? While the needs of human children have not
                    changed, the way the modern world communicates with them
                    has. StoryApp is a way to bridge the gap between the old and
                    the new. It is a way to connect with Kenzo and Kohji in a
                    way that is meaningful and lasting. It is a way to share
                    your stories with them in a way that is safe and secure. It
                    is a way to create a legacy of love and connection that will
                    last a lifetime.
                  </p>
                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    Thank you for testing this app and I hope we will all have
                    fun with this! There will be bugs and things that need
                    improvement. Any and all feedback is greatly appreciated!
                    Please email questions, comments, ideas for new features
                    to&nbsp;
                    <a
                      href="mailto:smcgov11.11@gmail.com"
                      className="underline text-pink-400"
                    >
                      smcgov11.11@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-4xl divide-y divide-white/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
                Frequently asked questions
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-white/10">
                {faqs.map((faq) => (
                  <Disclosure key={faq.question} as="div" className="pt-6">
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <PlusSmallIcon
                            aria-hidden="true"
                            className="h-6 w-6 group-data-[open]:hidden"
                          />
                          <MinusSmallIcon
                            aria-hidden="true"
                            className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">
                        {faq.answer}
                      </p>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src={wideImage}
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}
        <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tell them a Story!
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              It doesn't have to be an exciting story, just anything about your day, or a memory of your grandparents, or about your pets or your recent trip to the grocery store.  The point is that the boys know you took the time and shared a piece of your life, whether that is the mundane or the fantastic.  Be sure to check out the story ideas page if you need some inspiration.
            </p>
          
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {values.map((value) => (
              <div key={value.name}>
                <dt className="font-semibold text-gray-900">{value.name}</dt>
                <dd className="mt-1 text-gray-600">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>
    </div>
  );
}

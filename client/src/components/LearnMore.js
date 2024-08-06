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
import StoryApp from "../assets/StoryApp.png";

const logo = StoryApp;

const bgImage = kenzoProfile;

const wideImage = kekohike;

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
    question: "Who will see my videos?",
    answer:
      "The targeted audience is of course Kenzo and Kohji, but the videos will be stored in a secure database and only accessible to registered users of this app.  In future development, there may be more features to index the videos in such a way that only certain users can see them.  Don't be shy about it.  Consider it a community of people brought together through our love for Kenzo and Kohji and let's all get to know each other better!",
  },
  {
    question: "Can I delete my videos?",
    answer:
      "Yes, you can delete your videos.  Only the user who uploaded the video has permission to delete their own video.   In future development, there will be admistrative users who can manage the database of videos and users.",
  },
  {
    question: "Can anyone download the videos?",
    answer:
      "Not with this current beta version.  In future development, there will be more features to download the videos and delete them from this platform so to save space in the database for future videos.  You may notice there is a button to download the videos but it's not working on all devices yet.  You can try it if you like.",
  },
  {
    question:
      "I have an idea to make this app better.  How can I suggest improvements and new features?",
    answer:
      "Thank you! Please email me at smcgov@11.11@gmail.com with your ideas and suggestions.  I would love to hear from you!  When you contact me about any technical issues, please include which browser, device type and any other technical details of how you are accessing the app.  It should be working on computers, tablets and phones, Mac, Windows, Android and iOS.",
  },
  {
    question:
      "I know a potential user who is not comfortable with the tech involved here.  Can I create a separate profile for them?",
    answer:
      "Of course!  As long as you have their permission.  You can log in and out of the app as different users.  We may have the best and most interesting contributions from the less tech savy!  And you can also share a special guest video on your own profile.",
  },
  {
    question:
      "I'd like to speak to the boys in a language other than English.  Would that be okay?",
    answer:
      "Please do!  In fact, it's exactly the intent of the app to enrich them with their family culture and history.  You can speak in any language you like.  If you are comfortable, you can also include a translation in the video description.",
  },
  {
    question:
      "I know another family who would like their own StoryApp.  How can I get this app for another other people?",
    answer:
      "Working on it!  And you're part of the plan helping with this beta version to test and improve the app.  There will be similar versions for sligtly different circumstances, such as people who are who are in the hospital or nursing home.  The app will be customized for the needs of the users.  There will also be a special occassion limited version coming soon!",
  },
  {
    question: "What is my email being used for?",
    answer:
      "Nothing now in this beta version except for signing in and testing the format for the registration.  You will not receive any emails.  In future development there may be features to reach out to users with specific story ideas or to notify users of new video uploads and things like that.  Right now it is just test data and you can actually use a fake email if you want.",
  },
  {
    question: "Can I have this as an app on my phone?",
    answer:
      "Yes.  When you are using it with the weblink on your phone or tablet, you can add it to your home screen on your phone.  It will look like an app and you can access it anytime.  Use the feature that you would use to share the link with someone else, then you should see an option to save to your home screen.  In future development, there will be an app available in the app store.",
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
          <div className="absolute inset-0 -z-10 bg-black/70" />

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
                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl text-center mx-auto pt-10 text-slate-300 text-opacity-60">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-3xl">
                    You are a child of the universe, no less than the trees and
                    the stars; you have a right to be here.
                  </h1>
                  <h3 className="text-lg tracking-tight text-right text-slate-400 sm:text-lg text-opacity-70">
                    {" "}
                    -- Desiderata, Max Ehrmann
                  </h3>
                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    It has been scientifically proven that children who are told
                    stories have higher self-esteem, are more resilient, and
                    have a better understanding of themselves and how they view
                    the world. Studies have even shown that when children listen
                    to stories, their brains actively work to conjure up imagery
                    and consider the emotions of the storyteller and other
                    characters.
                  </p>
                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    In our modern world, children can easily become less in tune
                    with their extended family, becoming unaware of all their
                    family's historic and cultural context. It's the seemingly
                    inconsequential aspects of day-to-day living while sharing
                    thoughts and memories with a child that can help them truly
                    understand where they come from and the values of their
                    family.
                  </p>

                  <p className="relative mt-6 text-lg leading-8 sm:max-w-md lg:max-w-none">
                    Why StoryApp? While the needs of children have not changed,
                    the way the modern world communicates with them has.
                    StoryApp is a way to bridge the gap between the old and the
                    new. It offers a meaningful and lasting way to connect with
                    Kenzo and Kohji by creating a digital treasure chest of
                    stories and thoughts that they can access anytime and
                    eventually share with their own children.
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
  <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-20">
    <div className="mx-auto max-w-4xl divide-y divide-white/10">
      <img
        alt="Your Company"
        src={logo}
        className="mx-auto h-34 w-auto rounded-md" // Increase height and adjust width accordingly
      />
      <h2 className="text-2xl font-bold leading-10 tracking-tight text-white mt-8">
        Frequently asked questions
      </h2>
      <dl className="mt-10 space-y-6 divide-y divide-white/10">
        {faqs.map((faq) => (
          <Disclosure key={faq.question} as="div" className="pt-6">
            <dt>
              <Disclosure.Button className="group flex w-full items-start justify-between text-left bg-teal-600 text-white rounded-md px-4 py-2 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500">
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
              </Disclosure.Button>
            </dt>
            <Disclosure.Panel as="dd" className="mt-2 pr-12">
              <p className="text-base leading-7 text-gray-300">
                {faq.answer}
              </p>
            </Disclosure.Panel>
          </Disclosure>
        ))}
      </dl>
    </div>
  </div>
</div>


        {/* Image section */}
        <div className="mt-10 sm:mt-10 xl:mx-auto xl:max-w-7xl xl:px-8">
          <img
            alt=""
            src={wideImage}
            className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
          />
        </div>

        {/* Values section */}

        <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-20 lg:px-8 pb-8 ">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              C'mon! What are you waiting for? Tell them a Story!
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="register"
                className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Get started
              </a>
             
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              It doesn't have to be an exciting story, just anything about your
              day, or a memory of your grandparents, or about your pets or your
              recent trip to the grocery store. The point is that the boys know
              you took the time and shared a piece of your life, whether that is
              the mundane or the fantastic. Be sure to check out the story ideas
              page if you need some inspiration.  That will be available once you're logged in.
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

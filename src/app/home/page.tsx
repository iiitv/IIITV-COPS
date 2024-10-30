"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import axios from "axios";

// import { HeroParallax } from "./components/hero-parallax"

import Image from "next/image";

// export const products = [
//   {
//     title: "Moonbeam",
//     link: "https://gomoonbeam.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
//   },
//   {
//     title: "Cursor",
//     link: "https://cursor.so",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/cursor.png",
//   },
//   {
//     title: "Rogue",
//     link: "https://userogue.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/rogue.png",
//   },

//   {
//     title: "Editorially",
//     link: "https://editorially.org",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/editorially.png",
//   },
//   {
//     title: "Editrix AI",
//     link: "https://editrix.ai",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/editrix.png",
//   },
//   {
//     title: "Pixel Perfect",
//     link: "https://app.pixelperfect.quest",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
//   },

//   {
//     title: "Algochurn",
//     link: "https://algochurn.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
//   },
//   {
//     title: "Aceternity UI",
//     link: "https://ui.aceternity.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//   },
//   {
//     title: "Tailwind Master Kit",
//     link: "https://tailwindmasterkit.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
//   },
//   {
//     title: "SmartBridge",
//     link: "https://smartbridgetech.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
//   },
//   {
//     title: "Renderwork Studio",
//     link: "https://renderwork.studio",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
//   },

//   {
//     title: "Creme Digital",
//     link: "https://cremedigital.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
//   },
//   {
//     title: "Golden Bells Academy",
//     link: "https://goldenbellsacademy.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
//   },
//   {
//     title: "Invoker Labs",
//     link: "https://invoker.lol",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/invoker.png",
//   },
//   {
//     title: "E Free Invoice",
//     link: "https://efreeinvoice.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
//   },
// ];

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  mode: string;
}

export default function Home() {
  type EventCategory = "upcoming" | "past" | "ongoing";
  const [events, setEvents] = useState<{
    upcoming: Event[];
    past: Event[];
    ongoing: Event[];
  }>({
    upcoming: [],
    past: [],
    ongoing: [],
  });
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory>("upcoming");

  // Fetch events once on component mount
  useEffect(() => {
    async function fetchEvents() {
      try {
        const [upcomingRes, pastRes, ongoingRes] = await Promise.all([
          axios.get("/api/v1/get/events?category=upcoming"),
          axios.get("/api/v1/get/events?category=past"),
          axios.get("/api/v1/get/events?category=ongoing"),
        ]);

        setEvents({
          upcoming: upcomingRes.data.slice(0, 3),
          past: pastRes.data.slice(0, 3),
          ongoing: ongoingRes.data.slice(0, 3),
        });

        // Default displayed events to "upcoming"
        setDisplayedEvents(upcomingRes.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  // Handle category toggle
  const handleCategoryChange = (category: EventCategory) => {
    setSelectedCategory(category);
    setDisplayedEvents(events[category]);
  };

  // Category titles for dynamic title display
  const categoryTitles: { [key in EventCategory]: string } = {
    upcoming: "Upcoming ",
    past: "Past ",
    ongoing: "Ongoing ",
  };

  return (
    <div className="flex flex-col min-h-dvh">
      {/* <HeroParallax products={products} /> */}
      <section className="lg:h-[90dvh] w-full py-12 md:py-24 lg:py-0 bg-background text-muted flex justify-around">
        <div className="px-4 md:px-6 grid gap-6 lg:grid-cols-2 lg:gap-12 max-w-[1240px] flex items-center justify-around">
          <div className="space-y-4 md:flex md:items-center md:flex-col text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Unlock Your Coding Potential
            </h1>
            <p className=" max-w-[600px] text-lg md:text-xl">
              Join our vibrant community of coders and unlock your full
              potential through workshops, events, and shared resources.
            </p>
            <div className="flex flex-col gap-2 justify-center sm:flex-row lg:justify-start">
              <Link
                href="/auth"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary text-primary-foreground px-8 text-sm font-medium shadow transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors hover:bg-muted hover:text-primary-foreground border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/home/placeholder.png"
              alt="Coding Club"
              width={400}
              height={600}
              className="rounded-lg w-[400px] lg:w-[500px]"
            />
          </div>
        </div>
      </section>
      <section id="features" className="bg-background py-20 px-6 md:px-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <LaptopIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Workshops</h3>
            <p className="text-muted-foreground">
              Dive into hands-on coding workshops and learn from experienced
              instructors.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <MilestoneIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Mentorship</h3>
            <p className="text-muted-foreground">
              Receive personalized guidance from our network of industry
              mentors.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <GroupIcon className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Connect with like-minded coders and build lasting friendships.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-24 flex item-center justify-center bg-secondary">
        <div className="container px-4 md:px-6 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {categoryTitles[selectedCategory]}
              <span className="text-primary">Events</span>
            </h2>
            <div className="flex gap-4">
              {(["upcoming", "ongoing", "past"] as EventCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={` px-2 py-1 md:px-4 md:py-2 rounded-md ${
                      selectedCategory === category
                        ? "bg-primary text-secondary text-sm sm:text-base"
                        : "bg-secondary text-sm sm:text-base border hover:bg-muted hover:text-secondary transition duration-250"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ),
              )}
            </div>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out our events and workshops to learn new skills, network
              with fellow coders, and have fun!
            </p>
          </div>

          <div className="lg:flex grid gap-6 lg:justify-center sm:grid-cols-2 lg:grid-cols-3">
          {displayedEvents.length > 0 ? (
              displayedEvents.map((event) => (
                <Card key={event.id} className="lg:w-1/3 w-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{event.name}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{formatTime(event.time)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <LocateIcon className="h-5 w-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{event.mode?"Online":"Offline"}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/event/${event.id}`}
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      prefetch={false}
                    >
                      Register
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="w-full col-span-5 content-center justify-center flex py-20 lg:pt-16 lg:pb-44">
                <p className="text-center sm:text-xl">No <span className="text-primary">{selectedCategory}</span> events available. Check back soon for future updates.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background flex item-center justify-center">
        <div className="container px-4 md:px-6 space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Club <span className="text-primary">Resources</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our collection of tutorials, projects, and other
                resources to help you grow as a coder.
              </p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col bg-secondary border-none">
              <CardHeader>
                <CardTitle>Tutorials</CardTitle>
                <CardDescription>
                  Learn new technologies and programming languages.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid gap-4">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Intro to JavaScript
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Learn the fundamentals of JavaScript, the most popular
                    programming language for the web.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    React.js for Beginners
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Get started with React, a popular JavaScript library for
                    building user interfaces.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Python for Data Analysis
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Explore the power of Python for data manipulation,
                    visualization, and machine learning.
                  </div>
                </Link>
              </CardContent>
            </Card>
            <Card className="flex flex-col bg-secondary border-none">
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Build real-world applications to showcase your skills.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid gap-4">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Todo List App
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Build a simple todo list application using HTML, CSS, and
                    JavaScript.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Weather App
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Create a weather application that fetches data from a
                    weather API.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    E-commerce Website
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Build a full-stack e-commerce website with a shopping cart
                    and checkout process.
                  </div>
                </Link>
              </CardContent>
            </Card>
            <Card className="flex flex-col bg-secondary border-none">
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Connect with fellow coders and get support from the community.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 grid gap-4">
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Discord Server
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Join our vibrant Discord server to chat, ask questions, and
                    collaborate with other members.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    Meetups
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Attend our local and virtual meetups to network, learn, and
                    share your projects.
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">
                    LinkedIN
                  </div>
                  <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    Join our Coding Club on LinkedIn to learn, collaborate, and
                    network!
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day)); // Month is 0-indexed

  const formattedDay = date.getDate();
  const monthName = date.toLocaleString("default", { month: "long" });
  const formattedYear = date.getFullYear();

  return `${formattedDay} ${monthName} ${formattedYear}`;
}

const formatTime = (timeString: string): string => {
  const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
  const match = timeString.match(timeRegex);
  if (!match) {
    return 'Invalid Time Format';
  }
  
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 becomes 12)
  const formattedMinutes = String(minutes).padStart(2, '0');
  
  return `${hours}:${formattedMinutes} ${ampm}`;
};


function LaptopIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  );
}

function GroupIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  );
}

function MenuIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MilestoneIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
      <path d="M12 13v8" />
      <path d="M12 3v3" />
    </svg>
  );
}

function CalendarIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function LocateIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function XIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

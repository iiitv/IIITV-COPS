"use client";
import React, { useState ,useEffect } from "react";
import { useRouter } from "next/navigation";
import "./styles.css"
import Loader from "@/components/ui/loader";
import EventCard from "./components/eventCard"

import { Montserrat, Alata } from "next/font/google";
const montserratFont = Montserrat({
  weight: ["100", "200", "400", "600"],
  subsets: ["latin"],
});
const alataFont = Alata({ weight: ["400"], subsets: ["latin"] });

export default function Events() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [nextPageEvents, setNextPageEvents] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [hasMoreEvents, setHasMoreEvents] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (page) => {
    try {
      setHasMoreEvents(false);
      setLoading(true); 
      const response = await fetch(`/api/v1/get/events?page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
    finally {
      setHasMoreEvents(true);
      setLoading(false);
    }
  };

  const getMoreEvents = async () => {
    setEvents((prevEvents) => [...prevEvents, ...nextPageEvents]);
    setPageCount((prev) => prev + 1);

    const newEvents = await fetchEvents(pageCount + 2);
    if (newEvents.length === 0) {
      setHasMoreEvents(false);
    } else {
      setNextPageEvents(newEvents);
    }
  };

  useEffect(() => {
    const loadInitialEvents = async () => {
      const firstPageEvents = await fetchEvents(pageCount);
      const secondPageEvents = await fetchEvents(pageCount + 1);

      setEvents(firstPageEvents);
      setNextPageEvents(secondPageEvents);

      if (secondPageEvents.length === 0) {
        setHasMoreEvents(false);
      }
    };
    loadInitialEvents();
    }, []);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="w-[95%]">
        <p className={`underline text-3xl ml-4 ${alataFont.className}`}>
          Events
        </p>
        <div className="grid lg:grid-cols-3 gap-8 px-4 mt-6 sm:grid-cols-2 grid-cols-1 grid-rows-1">
          {/* Static Quote Box in 2nd column, 1st row */}
          <div className="h-full lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:row-span-1 sm:col-span-2 col-span-1 p-4 bg-gray-700 rounded-2xl flex items-center justify-center text-white text-center">
            Random image or quote
          </div>

          {events.map((event, index) => (
            <EventCard event={event} key={index}/>
          ))}
        </div>

        {loading ? (
          <div className="w-full flex justify-center p-12">
            <p className={`text-xl px-5 ${montserratFont.className}`}>
              Loading...{" "}
            </p>
            <Loader />
          </div>
        ) : (
          hasMoreEvents && (
            <div
            className={`${montserratFont.className} w-full flex justify-center my-10`}
          >
            <button
              className="show-more-button"
              onClick={getMoreEvents}
            >
              <p>Show More</p>
            </button>
          </div>
          )
        )}
      </div>
    </div>
  );
}

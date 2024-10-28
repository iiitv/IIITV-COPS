import React, { useState } from "react";

import { getPublicUrl } from "@/lib/utils";
import Link from "next/link";

import { Montserrat, Alata } from "next/font/google";
const montserratFont = Montserrat({
  weight: ["100", "200", "400", "600"],
  subsets: ["latin"],
});
const boldMontserratFont = Montserrat({
  weight: ["600"],
  subsets: ["latin"],
});

export default function EventCard(props) {
  const [event, setEvent] = useState(props.event);
  const [eventDate, setEventDate] = useState(event.date);
  const [eventTime, setEventTime] = useState(event.time);
  let posterUrl = getPublicUrl(`/events/${event.id}/poster`);
  return (
    <div className={`${montserratFont.className} lg:row-span-2 lg:col-span-1 w-full h-full`}>
      <Link href={`\\event\\${event.id}`}>
        <div className="flex flex-col">
          <div className="w-full h-full border-2 border-primary rounded-2xl overflow-hidden">
            <img src={posterUrl} className="object-cover" />
          </div>
          <div className={`${montserratFont.className} ms-2 mt-1`}>
            <p className="text-primary">{formatDate(eventDate)} | {formatTime(eventTime)}</p>
            <p className="font-semibold text-xl">{event.name}</p>
            <p className="text-sm">{trimString(event.description,50)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const date = new Date(year, month - 1, day); // Month is 0-indexed
  
    const formattedDay = date.getDate();
    const monthName = date.toLocaleString("default", { month: "long" });
    const formattedYear = date.getFullYear();
  
    return `${formattedDay} ${monthName} ${formattedYear}`;
  }


  const formatTime = (timeString) => {
    const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;
    const match = timeString.match(timeRegex);
    if (!match) {
        return 'Invalid Time Format';
    }
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${hours}:${formattedMinutes} ${ampm}`;
};

const trimString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
};
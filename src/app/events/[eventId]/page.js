import Footer from "@/app/Sections/Footer";
import Navbar from "@/app/Sections/Navbar";
import Navbar2 from "@/app/Sections/Navbar2";
import React from "react";

export async function generateStaticParams() {
  const res = await fetch("https://famebusinesssolutions.com/bendcc/eventlist");
  const data = await res.json()
  
  return data.data.data.map((product) => ({
    eventId: product.eventId,
  }));
}

async function getData(eventId) {
  const res = await fetch(
    `https://famebusinesssolutions.com/bendcc/eventdetail?event_id=${eventId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function EventDetails({ params }) {
  const eventId = params.eventId;
  const events = await getData(eventId);

  return (
    <>
      <Navbar2 />
      {/* <h1>Event Title is {events.data.event_title}</h1> */}
      <div className="container event-main">
        <div className="row">
          <div className="col-lg-12"></div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <img
              className="event-page-image"
              src={`https://famebusinesssolutions.com/bendcc/public/events/${events?.data.event_image}`}
              alt={events.event_title}
            />
          </div>
          <div className="col-lg-8 ">
            <div className="">
              <div className=" px-5 ">
                <h1 className="event-page-heading mb-3">
                  {events.data.event_title}
                </h1>
                <p className="event-page-para">
                  {events.data.event_description}
                </p>
                <div className="event-page-details row">
                  <div className=" col-lg-4 ">
                    <h2>Details</h2>
                    <div>
                      <h4>Date:</h4>
                      <p>{events.data.event_startdate}</p>
                    </div>
                    <div>
                      <h4>Time:</h4>
                      <p>{events.data.event_starttime}</p>
                    </div>
                    <div className="">
                      <h4>Category:</h4>
                      <p>{events.data.event_categories}</p>
                    </div>
                    <div className="">
                      <h4>Cost:</h4>
                      <p>{events.data.event_cost}</p>
                    </div>
                  </div>
                  <div className=" col-lg-4 ">
                    <h2>Organizer</h2>
                    <div>
                      <p>{events.data.organizer_detail}</p>
                    </div>
                  </div>
                  <div className=" col-lg-4 ">
                    <h2>Venue</h2>
                    <div>
                      <p>{events.data.venue_detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* button will come here */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="map-container">
              <iframe
                width="100%"
                height="400"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  events.data.event_city
                )}&t=&z=44&ie=UTF8&iwloc=B&output=embed`}
              >
                <a href="https://www.maps.ie/population/">
                  Find Population on Map
                </a>
              </iframe>
            </div>
          </div>
        </div>
        <div className="row"></div>
      </div>
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }) {
  const eventId = params.eventId;
  const events = await getData(eventId);
  return {
    title: events.data.event_title,
    description: events.data.event_description,
  };
}

import React from 'react'
import EventCard from "./EventCard";

const EventGridView = ({ events }) => {
  return (
    <div>
      <div className="border-0 row px-0 mt-4">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => {
            if (!event || !event.event_id) {
              console.error("Invalid event:", event);
              return null; // Skip rendering this event
            }
            return (
              <div className="col-lg-3" key={event.event_id}>
                <EventCard event={event} />
              </div>
            );
          })
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default EventGridView;

import React from "react";

const CalenderButtons = () => {
  function formatDateToGoogleCalendarFormat(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Format the date and time components
    const formattedDateTime = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;

    return formattedDateTime;
  }

  function formatDateToOutlookCalendarFormat(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Extract date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    // Format the date and time components
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }

  const constructGoogleCalendarLink = () => {
    const googleCalendarLink =
      "https://www.google.com/calendar/render?action=TEMPLATE" +
      `&text=${encodeURIComponent(events.data.event_title)}` +
      `&details=${encodeURIComponent(events.data.event_description)}` +
      `&dates=${encodeURIComponent(
        formattedStartDate + "/" + formattedEndDate
      )}`;

    window.open(googleCalendarLink, "_blank");
  };

  const constructOutlookCalendarLink = () => {
    // Format start and end dates using the new function for Outlook Calendar
    const formattedStartDate = formatDateToOutlookCalendarFormat(
      events.data.event_startdate + " " + events.data.event_starttime
    );
    const formattedEndDate = formatDateToOutlookCalendarFormat(
      events.data.event_enddate + " " + events.data.event_endtime
    );

    // Construct the Outlook Calendar link
    const outlook365Link =
      "https://outlook.office.com/calendar/action/compose?subject=" +
      encodeURIComponent(events.data.event_title) +
      "&body=" +
      encodeURIComponent(events.data.event_description) +
      "&startdt=" +
      encodeURIComponent(formattedStartDate) +
      "&enddt=" +
      encodeURIComponent(formattedEndDate);

    // Open the Outlook Calendar link in a new window
    window.open(outlook365Link, "_blank");
  };

  const constructOutlookLiveCalendarLink = () => {
    // Format start and end dates using the new function for Outlook Calendar
    const formattedStartDate = formatDateToOutlookCalendarFormat(
      events.data.event_startdate + " " + events.data.event_starttime
    );
    const formattedEndDate = formatDateToOutlookCalendarFormat(
      events.data.event_enddate + " " + events.data.event_endtime
    );

    // Construct the Outlook Live Calendar link
    const outlookLiveLink =
      "https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent" +
      "&subject=" +
      encodeURIComponent(events.data.event_title) +
      "&body=" +
      encodeURIComponent(events.data.event_description) +
      "&startdt=" +
      encodeURIComponent(formattedStartDate) +
      "&enddt=" +
      encodeURIComponent(formattedEndDate);

    // Open the Outlook Live Calendar link in a new window
    window.open(outlookLiveLink, "_blank");
  };

  const formatDateForICal = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const generateICalLink = () => {
    // Splitting the time and checking if it's in AM or PM format
    const startTimeParts = events.data.event_starttime.split(" ");
    const isPM = startTimeParts[1].toLowerCase() === "pm";
    // Splitting the time into hours, minutes, and seconds
    const timeParts = startTimeParts[0].split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    // Adjusting hours if it's PM
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    // Constructing the start date and time
    const startDate = new Date(
      `${events.data.event_startdate}T${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
    const endDate = new Date(
      `${events.data.event_enddate}T${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    );
    // Format dates in ISO string format without milliseconds
    const formattedStartDate = startDate.toISOString().slice(0, -5);
    const formattedEndDate = endDate.toISOString().slice(0, -5);

    // Create an iCalendar event string
    const iCalEvent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTART:${formattedStartDate}
    DTEND:${formattedEndDate}
    SUMMARY:${events.data.event_summary}
    DESCRIPTION:${events.data.event_description}
    END:VEVENT
    END:VCALENDAR`;

    // Base64 encode the iCalendar event
    const encodedICalEvent = btoa(iCalEvent);

    // Create a webcal URL with the encoded iCalendar event
    const webcalURL = `webcal://icalendar.org/subscribe/${encodedICalEvent}`;

    // Open the webcal URL to add the event to the calendar
    window.open(webcalURL);
  };

  return (
    <>
      <div className="dropdown calender-dropdown-btn">
        <button
          className="btn dropdown-toggle calender-btn search-btn btn m-2"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add to Calendar
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <button
              className="dropdown-item"
              onClick={constructGoogleCalendarLink}
            >
              <span>
                <img
                  className="rounded-3 calender-icon "
                  src={googleCalender}
                />
              </span>
              Add to Google Calendar
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={constructOutlookCalendarLink}
            >
              <span>
                <img className="rounded-3 calender-icon " src={outlookImg} />
              </span>
              Outlook 360
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={constructOutlookLiveCalendarLink}
            >
              <span>
                <img className="rounded-3 calender-icon " src={outlookLive} />
              </span>
              Outlook Live
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={generateICalLink}>
              <span>
                <img className="rounded-3 calender-icon " src={icalender} />
              </span>
              iCalender
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CalenderButtons;

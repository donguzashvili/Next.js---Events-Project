import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/eventList";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { handleFirebaseData } from "@/helpers/apiUtil";
import { eventType } from "@/types/eventDataType";
import Head from "next/head";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState<eventType[]>();
  const router = useRouter();

  const filterData = router.query.slug;

  useEffect(() => {
    fetch("https://nextjs-course-c4de9-default-rtdb.europe-west1.firebasedatabase.app/events.json")
      .then((res) => res.json())
      .then((response) => {
        setLoadedEvents(handleFirebaseData(response));
      });
  }, [filterData]);

  if (!filterData)
    return (
      <>
        <Head>
          <title>Filtered Events</title>
          <meta name="description" content={`A list of filtered events.`} />
        </Head>
        <p>Loading...</p>;
      </>
    );

  const filteredYear = filterData![0];
  const filteredMonth = filterData![1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content={`All events for ${numMonth - 1}/${numYear}.`} />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;

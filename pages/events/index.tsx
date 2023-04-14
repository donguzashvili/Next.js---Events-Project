import EventList from "@/components/events/eventList";
import EventsSearch from "@/components/events/eventsSearch";
import { getAllData } from "@/helpers/apiUtil";
import { eventType } from "@/types/eventDataType";
import Head from "next/head";
import { useRouter } from "next/router";

function AllEventsPage({ events }: { events: eventType[] }) {
  const router = useRouter();

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow to evolve..." />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;

export async function getStaticProps() {
  const data = await getAllData();

  return { props: { events: data }, revalidate: 60 };
}

import Link from "next/link";
import { getAllData, getFeaturedEvents } from "../helpers/apiUtil";
import EventList from "@/components/events/eventList";
import { eventType } from "@/types/eventDataType";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletterRegistration";

const HomePage = ({ featuredEvents }: { featuredEvents: eventType[] }) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events that allow to evolve..." />
      </Head>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  const isFeaturedEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: isFeaturedEvents,
      revalidate: 500,
    },
  };
}

export default HomePage;

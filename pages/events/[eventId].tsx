import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import ErrorAlert from "@/components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "@/helpers/apiUtil";
import { eventType } from "@/types/eventDataType";
import { GetStaticProps } from "next";
import Head from "next/head";

function EventDetailPage({ event }: { event: eventType }) {
  if (!event)
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const eventId = context.params?.eventId;
  const event = typeof eventId === "string" && (await getEventById(eventId));

  return {
    props: { event },
    revalidate: 30,
  };
};

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const ids = events.map((el) => ({ params: { eventId: el.id } }));
  return { paths: ids, fallback: true };
}

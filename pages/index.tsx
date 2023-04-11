import Link from "next/link";
import { getFeaturedEvents } from "../dummyData";
import EventList from "@/components/events/eventList";

const HomePage = () => {
  const featuredEvenets = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvenets} />
    </div>
  );
};

export default HomePage;

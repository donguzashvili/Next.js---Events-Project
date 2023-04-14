import { eventType } from "@/types/eventDataType";
import EventItem from "./eventItem";

// ** styles
import classes from "./eventList.module.css";
import { GetServerSideProps } from "next";

type props = {
  items: eventType[];
};

function EventList({ items }: props) {
  return (
    <ul className={classes.list}>
      {items.map((el) => (
        <EventItem key={el.id} date={el.date} image={el.image} id={el.id} title={el.title} location={el.location} isFeatured={el.isFeatured} description={el.description} />
      ))}
    </ul>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

export default EventList;

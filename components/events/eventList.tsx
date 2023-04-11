import { propType } from "@/types/eventDataType";
import EventItem from "./eventItem";

// ** styles
import classes from "./eventList.module.css";

type props = {
  items: propType[];
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

export default EventList;

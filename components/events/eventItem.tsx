import { propType } from "@/types/eventDataType";
import Image from "next/image";

// ** View
import Button from "../ui/button";

// ** styles
import classes from "./eventItem.module.css";

// ** icons
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import { useRouter } from "next/router";

function EventItem({ title, image, date, location, id }: propType) {
  const router = useRouter();
  const formatedDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  const imageUrl = window.location.host.includes("github") ? image : `/${image}`;

  console.log(window.location);

  return (
    <li className={classes.item}>
      <div className={classes.image}>
        <Image src={imageUrl} alt="decoration" fill />
      </div>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formatedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;

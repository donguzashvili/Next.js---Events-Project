import Image from "next/image";

import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";

// ** style
import classes from "./event-logistics.module.css";
import { useRouter } from "next/router";

type logisticProps = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};

function EventLogistics({ date, address, image, imageAlt }: logisticProps) {
  const router = useRouter();
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  const URL = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";
  const imageUrl = URL.includes("github") ? image : `/${image}`;

  console.log(URL);

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={imageUrl} alt={imageAlt} fill />
      </div>
      <ul className={classes.list}>
        <LogisticsItem Icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem Icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;

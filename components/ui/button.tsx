import Link from "next/link";

// ** style imports
import classes from "./button.module.css";
import React from "react";

type buttonType = {
  link?: string;
  onClick?(): void;
  children: React.ReactNode;
};

function Button({ link, children, onClick }: buttonType) {
  if (!link)
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  return (
    <Link className={classes.btn} href={link}>
      {children}
    </Link>
  );
}

export default Button;

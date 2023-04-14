import { FormEvent, useEffect, useRef, useState, useContext } from "react";
import classes from "./newsletterRegistration.module.css";
import ErrorAlert from "../ui/error-alert";
import NotificationContext from "@/store/notificationContext";

function NewsletterRegistration() {
  const [error, setError] = useState<boolean>(false);
  const [success, setSucces] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useContext(NotificationContext);

  function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    showNotification({ title: "Signing up...", message: "Registering for newsletter.", status: "pending" });
    const reqBody = JSON.stringify({ email: emailRef.current?.value });

    fetch("/api/newsletter", {
      method: "POST",
      body: reqBody,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        setSucces(data.message);
        showNotification({ title: "Success!", message: "Successfully registered for newsletter!", status: "success" });
      })
      .catch((err) => {
        showNotification({ title: "Error!", message: err.message || "Something went wrong!", status: "error" });
      });
  }

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  }, [error]);

  if (error) return <ErrorAlert>Please enter valid email!</ErrorAlert>;

  if (success) return <ErrorAlert>{success}</ErrorAlert>;

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input type="email" id="email" placeholder="Your email" aria-label="Your email" ref={emailRef} />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./contact.scss";

interface ContactFormData {
  name: string;
  subject: string;
  description: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<ContactFormData>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Add your submission logic here
      // Example: await submitContactForm(data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      // Success
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="badge badge-primary">Contact Us</div>
      <h1 className="contact-header">Lets get in touch</h1>
      <p className="contact-description">
        Or reach out directly at{" "}
        <a href="mailto:contact@example.com">contact@example.com</a>
      </p>

      {submitError && <div className="alert alert-error">{submitError}</div>}

      {submitSuccess && (
        <div className="alert alert-success">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name?</legend>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`input full-width ${errors.name ? "input-error" : ""}`}
            placeholder="Type here"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span className="error-text" id="name-error" role="alert">
              {errors.name.message}
            </span>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Subject</legend>
          <input
            type="text"
            id="subject"
            {...register("subject", {
              required: "Subject is required",
              minLength: {
                value: 3,
                message: "Subject must be at least 3 characters",
              },
            })}
            className={`input full-width ${
              errors.subject ? "input-error" : ""
            }`}
            placeholder="Type here"
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
          />
          {errors.subject && (
            <span className="error-text" id="subject-error" role="alert">
              {errors.subject.message}
            </span>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Message</legend>
          <textarea
            id="description"
            {...register("description", {
              required: "Message is required",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters",
              },
            })}
            className={`textarea h-24 full-width ${
              errors.description ? "input-error" : ""
            }`}
            placeholder="Type your message here"
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          ></textarea>
          {errors.description && (
            <span className="error-text" id="description-error" role="alert">
              {errors.description.message}
            </span>
          )}
        </fieldset>

        <button
          type="submit"
          className="btn btn-primary submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Contact;

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../../config/emailjs.config";
import { RootState } from "../../store/store";
import "./report-bug.scss";

interface BugReportFormData {
  name: string;
  email: string;
  description: string;
}

const ReportBug: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const user = useSelector((state: RootState) => state.global.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BugReportFormData>({
    mode: "onTouched",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit: SubmitHandler<BugReportFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.BUG_REPORT_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          name: data.name,
          email: data.email,
          title: "Bug Report",
          message: data.description,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit bug report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-bug-container">
      <div className="badge badge-error">Report a Bug</div>
      <h1 className="report-bug-header">Help us improve</h1>
      <p className="report-bug-description">
        Found a bug? Let us know and we'll fix it as soon as possible.
      </p>

      {submitError && <div className="alert alert-error">{submitError}</div>}

      {submitSuccess && (
        <div className="alert alert-success">
          Thank you! Your bug report has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="report-bug-form">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Name</legend>
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
          <legend className="fieldset-legend">Email</legend>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`input full-width ${errors.email ? "input-error" : ""}`}
            placeholder="your.email@example.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span className="error-text" id="email-error" role="alert">
              {errors.email.message}
            </span>
          )}
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Bug Description</legend>
          <textarea
            id="description"
            {...register("description", {
              required: "Bug description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className={`textarea h-24 full-width ${
              errors.description ? "input-error" : ""
            }`}
            placeholder="Please describe the bug you encountered..."
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
          {isSubmitting ? "Submitting..." : "Submit Bug Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportBug;

// src/components/ErrorBoundary.jsx
import React from "react";
import NotFound from "../pages/NotFound";
import * as Sentry from "@sentry/react"; // Assuming Sentry is used for error reporting

/**
 * ErrorBoundary - A React component that catches JavaScript errors anywhere in its child component tree,
 * logs them, reports them to Sentry in production, and displays a fallback UI.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null,
    };
  }

  /**
   * Static lifecycle method that updates state when an error occurs in a child component.
   * @param {Error} error - The error that was thrown.
   * @returns {Object} An object to update the state indicating an error has occurred.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Lifecycle method that logs the error, captures additional context, reports to Sentry in production,
   * and updates the state with detailed error information.
   * @param {Error} error - The error that was thrown.
   * @param {Object} errorInfo - An object with information about the component where the error occurred.
   */
  componentDidCatch(error, errorInfo) {
    // Capture detailed error information
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      location: window.location.href,
      // Add more context if necessary, e.g., user ID, session data
      userId: this.props.userId || "Anonymous",
    };

    // Log error to console with detailed grouping
    console.group("ErrorBoundary caught an error:");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.log("Detailed Error Info:", errorDetails);
    console.groupEnd();

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorDetails: errorDetails,
    });

    // Report error to Sentry in production
    if (process.env.NODE_ENV === "production") {
      Sentry.withScope((scope) => {
        scope.setExtras({
          timestamp: errorDetails.timestamp,
          userAgent: errorDetails.userAgent,
          location: errorDetails.location,
          userId: errorDetails.userId,
        });
        scope.setTag("environment", process.env.NODE_ENV);
        Sentry.captureException(error);
      });
    }
  }

  /**
   * Render method that displays either the child components or a fallback UI with detailed error information in development.
   * @returns {React.ReactElement} The UI to render based on the error state.
   */
  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <NotFound />
          {process.env.NODE_ENV === "development" && (
            <div className="relative max-w-lg px-4 py-3 mx-auto mt-6 text-red-700 bg-red-100 border border-red-400 rounded">
              <h2 className="mb-2 text-xl font-bold">An Error Occurred</h2>
              <details className="error-details">
                <summary className="px-3 py-2 text-lg font-semibold bg-red-200 rounded cursor-pointer error-summary">
                  View Error Details
                </summary>
                <div className="p-4 bg-white border-t border-red-400 rounded-b error-content">
                  <p>
                    <strong className="font-semibold">Error Message:</strong>{" "}
                    {this.state.errorDetails?.message}
                  </p>
                  <p>
                    <strong className="font-semibold">Stack Trace:</strong>
                  </p>
                  <pre className="p-3 overflow-x-auto whitespace-pre-wrap bg-gray-100 rounded stack-trace">
                    {this.state.errorDetails?.stack}
                  </pre>
                  <p>
                    <strong className="font-semibold">Component Stack:</strong>
                  </p>
                  <pre className="p-3 overflow-x-auto whitespace-pre-wrap bg-gray-100 rounded component-stack">
                    {this.state.errorDetails?.componentStack}
                  </pre>
                  <p>
                    <strong className="font-semibold">Timestamp:</strong>{" "}
                    {this.state.errorDetails?.timestamp}
                  </p>
                  <p>
                    <strong className="font-semibold">User Agent:</strong>{" "}
                    {this.state.errorDetails?.userAgent}
                  </p>
                  <p>
                    <strong className="font-semibold">Location:</strong>{" "}
                    {this.state.errorDetails?.location}
                  </p>
                  <p>
                    <strong className="font-semibold">User ID:</strong>{" "}
                    {this.state.errorDetails?.userId}
                  </p>
                </div>
              </details>
            </div>
          )}
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

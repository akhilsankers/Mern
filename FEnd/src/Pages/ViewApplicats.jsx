import React, { useEffect, useState } from "react";
import { getApplicationsByJob, updateApplicationStatus } from "../api/api";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";


function ViewApplicants({ jobId }) {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await getApplicationsByJob(jobId);
        if (response.success) {
          setApplicants(response.data);
        } else {
          console.error("Failed to load applicants");
        }
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) fetchApplicants();
  }, [jobId]);

  //  Handle Accept / Reject
  const handleStatusChange = async (applicationId, status) => {
    try {
      const response = await updateApplicationStatus(applicationId, status);
      if (response.success) {
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status } : app
          )
        );
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading applicants...</p>
      </div>
    );
  }

  if (!applicants || applicants.length === 0) {
    return (
      <Alert variant="info" className="text-center">
        No applicants have applied for this job yet.
      </Alert>
    );
  }

  return (
    <div className="container">
      <h3 className="fw-bold text-center mb-4">
        Applicants ({applicants.length})
      </h3>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {applicants.map((app) => (
          <Card
            key={app._id}
            className="shadow-sm border-0"
            style={{ width: "22rem" }}
          >
            <Card.Body>
              <Card.Title className="fw-semibold text-dark">
                {app.name || "Unnamed Applicant"}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {app.email}
              </Card.Subtitle>

              <Card.Text className="text-secondary small mb-3">
                <strong>Message:</strong> {app.message || "—"}
              </Card.Text>

              {app.resumeUrl && (
                <a
                  href={`https://mern-backend-tqtd.onrender.com/${app.resumeUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm w-100 mb-3"
                >
                  View Resume
                </a>
              )}

              {/*  Display current status */}
              <div className="text-center mb-3">
                {app.status === "accepted" ? (
                  <Badge bg="success" className="px-3 py-2">
                    Accepted 
                  </Badge>
                ) : app.status === "rejected" ? (
                  <Badge bg="danger" className="px-3 py-2">
                    Rejected 
                  </Badge>
                ) : (
                  <Badge bg="warning" text="dark" className="px-3 py-2">
                    Pending ⏳
                  </Badge>
                )}
              </div>

              {/*  Only show buttons when status is pending */}
              {app.status === "pending" && (
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusChange(app._id, "accepted")}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleStatusChange(app._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              )}

              <p className="text-muted text-end small mt-3 mb-0">
                Applied on: {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ViewApplicants;

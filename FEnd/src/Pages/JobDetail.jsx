import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import ApplyModal from "../components/ApplyModal"; // ✅ import modal

function JobDetail({ job }) {
  const [showApplyModal, setShowApplyModal] = useState(false);

  if (!job) return null;

  return (
    <>
      <Card className="shadow-sm border-0 p-4">
        <Card.Title className="fw-bold fs-4 text-dark mb-2">{job.title}</Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {job.company || "Unknown Company"} • {job.location || "N/A"}
        </Card.Subtitle>

        <div className="mb-3">
          <Badge bg="info" className="me-2">{job.jobType || "Full-Time"}</Badge>
          {job.experience && <Badge bg="secondary">{job.experience}+ Years Experience</Badge>}
        </div>

        <Card.Text className="text-secondary small mb-3">
          💰 <strong>{job.salaryRange || "Not specified"}</strong> <br />
          📅 Posted on: <strong>{new Date(job.createdAt).toDateString()}</strong>
        </Card.Text>

        <div className="text-muted" style={{ lineHeight: "1.6" }}>
          <p>{job.description}</p>
          {job.responsibilities && (
            <>
              <p><strong>Responsibilities:</strong></p>
              <ul>
                {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </>
          )}
          {job.requirements && (
            <>
              <p><strong>Requirements:</strong></p>
              <ul>
                {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </>
          )}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="success" size="sm" onClick={() => setShowApplyModal(true)}>
            Apply Now
          </Button>
          <Button variant="outline-primary" size="sm">Save Job</Button>
        </div>
      </Card>

      {/* Modal */}
      <ApplyModal show={showApplyModal} onClose={() => setShowApplyModal(false)} job={job} />
    </>
  );
}

export default JobDetail;

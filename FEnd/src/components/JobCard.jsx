import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Badge } from 'react-bootstrap';

function JobCard({ job }) {
  return (
    <Card className="shadow-sm border-2 mb-4" style={{ width: '30rem' }}>
      <Card.Body>
        {/* Job Title */}
        <Card.Title className="fw-bold text-dark">{job.title}</Card.Title>

        {/* Company and Location */}
        <Card.Subtitle className="mb-2 text-muted">
          {job.company} • {job.location}
        </Card.Subtitle>

        {/* Job Type and Salary */}
        <Card.Text className="text-secondary small mb-3">
          <span className="d-block">
            <strong>Type:</strong>{' '}
            <Badge bg="info" className="me-2">{job.type}</Badge>
          </span>
          <span className="d-block">
            <strong>Salary:</strong>{' '}
            <Badge bg="primary" className="me-2">{job.salaryRange}</Badge>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobCard;

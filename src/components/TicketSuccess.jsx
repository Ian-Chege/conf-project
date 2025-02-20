import React from 'react';
import PropTypes from 'prop-types';
import './TicketSuccess.css';

const DummyQRCode = () => (
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100" height="100" fill="url(#grid)" />
    <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="30" y="30" width="40" height="40" fill="currentColor" />
    <rect x="40" y="40" width="20" height="20" fill="white" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    {/* Add some random squares to make it look more like a QR code */}
    <rect x="20" y="85" width="10" height="10" fill="currentColor" />
    <rect x="85" y="20" width="10" height="10" fill="currentColor" />
    <rect x="75" y="75" width="10" height="10" fill="currentColor" />
    <rect x="15" y="15" width="10" height="10" fill="currentColor" />
  </svg>
);

function TicketSuccess({ registrationData, onReset }) {
  const { fullName, email, githubUsername, avatar, submissionDate } = registrationData;
  const date = new Date(submissionDate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const ticketId = React.useMemo(() => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }, []);

  return (
    <div className="ticket-success">
      <div className="ticket-card">
        <div className="ticket-header">
          <h2>Conference Ticket</h2>
          <div className="ticket-date">{formattedDate}</div>
        </div>

        <div className="ticket-content">
          <div className="ticket-avatar">
            <img src={avatar} alt={fullName} />
          </div>

          <div className="ticket-details">
            <div className="ticket-field">
              <label>Attendee</label>
              <span>{fullName}</span>
            </div>

            <div className="ticket-field">
              <label>Email</label>
              <span>{email}</span>
            </div>

            <div className="ticket-field">
              <label>GitHub</label>
              <span>@{githubUsername}</span>
            </div>

            <div className="ticket-qr">
              <div className="qr-code">
                <DummyQRCode />
              </div>
              <span className="ticket-id">#{ticketId}</span>
            </div>
          </div>
        </div>

        <button className="reset-button" onClick={onReset}>
          Generate Another Ticket
        </button>
      </div>
    </div>
  );
}

TicketSuccess.propTypes = {
  registrationData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    githubUsername: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    submissionDate: PropTypes.string.isRequired,
  }).isRequired,
  onReset: PropTypes.func.isRequired,
};

export default TicketSuccess;

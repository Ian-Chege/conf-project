import React from "react";
import PropTypes from "prop-types";
import { QRCodeCanvas } from "qrcode.react";
import "./TicketSuccess.css";

function TicketSuccess({ registrationData, onReset }) {
  const { fullName, email, githubUsername, avatar, submissionDate } =
    registrationData;
  const date = new Date(submissionDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ticketId = React.useMemo(() => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }, []);

  // QR Code Data
  const qrData = JSON.stringify({
    fullName,
    email,
    githubUsername,
    submissionDate: formattedDate,
    ticketId,
  });

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
                <QRCodeCanvas value={qrData} size={128} />
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
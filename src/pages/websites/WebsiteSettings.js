import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

const WebsiteSettings = ({ title = "Coming Soon", description = "This page are currently in maintenance, stay tuned." }) => {
    return (
        <div className="coming-soon-container">
            <ClockIcon className="coming-soon-icon" />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default WebsiteSettings;
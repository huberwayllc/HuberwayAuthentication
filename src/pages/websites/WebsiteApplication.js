import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const WebsiteApplication = () => {
    return (
        <div className="grid-2-col gap-8">
            {/* Colonna sinistra: descrizione */}
            <div className="app-description">
                <h2>Integrate external applications to enhance your website's capabilities</h2>
                <p>
                    Connect your site with a variety of tools to gather reviews, track analytics,
                    and boost visibility. On the right, you’ll find available integrations. Click
                    one to start configuration.
                </p>
            </div>

            {/* Colonna destra: applicazioni */}
            <div className="app-integrations space-y-6">
                {[
                    {
                        name: "Google My Business",
                        description:
                            "Connect your site to Google My Business to display reviews and manage your online presence directly from your dashboard.",
                    },
                ].map((app) => (
                    <div
                        key={app.name}
                        className="integration-box shadow p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
                    >
                        <div className="flex justify-between mb-2">
                            <div>
                                <h3>{app.name}</h3>
                                <p>{app.description}</p>
                            </div>
                            <button className="inline-flex items-center px-3 py-1 text-sm font-medium rounded bg-primary-600 text-white hover:bg-primary-700">
                                <Cog6ToothIcon className="w-4 h-4 mr-1" /> Configure
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default WebsiteApplication;

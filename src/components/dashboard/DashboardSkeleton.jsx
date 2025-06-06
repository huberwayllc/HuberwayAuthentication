// components/dashboard/DashboardSkeleton.jsx
import React from "react";
import Header from "../Header";


const SkeletonBox = ({ height = 20, width = "100%", radius = 8 }) => (
    <div
        style={{
            backgroundColor: "#e2e8f0",
            borderRadius: radius,
            height,
            width,
            marginBottom: 12,
            animation: "pulse 1.5s infinite",
        }}
    />
);

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-container">

            <Header />
            <main className="main-dashboard">
                <div className="grid-section">
                    <div className="one-col-layout">
                        <div className="highlight-box" data-tour="cose-da-fare">
                            <SkeletonBox height={24} width="40%" />
                            <SkeletonBox height={16} width="80%" />
                            <SkeletonBox height={16} width="60%" />
                            <SkeletonBox height={32} width="120px" radius={6} />
                        </div>
                    </div>

                    <div className="two-col-layout">
                        <div className="blog-card">
                            <SkeletonBox height={20} width="70%" />
                            <SkeletonBox height={14} width="90%" />
                            <SkeletonBox height={14} width="50%" />
                        </div>
                        <div className="reports-wrapper" data-tour="resoconti">
                            <SkeletonBox height={24} width="40%" />
                            <div className="report-grid">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="report-card">
                                        <SkeletonBox height={18} width="60%" />
                                        <SkeletonBox height={16} width="40%" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardSkeleton;

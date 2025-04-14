import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
     <Header />
      <main className="software-list dynamic">
      <section className="d-flex gap-2 align-items-center" style={{ display: 'flex', gap: '1rem' }}>
        <div className="flex-1 d-flex flex-column gap-1" style={{ flex: 1 }}>
            <h1 style={{fontSize: "44px", fontWeight: "600"}} className="mt-0">About Us</h1>
            <h6 className="mb-0">
            Huberway's company and culture are a lot like our product. They’re crafted, not cobbled, for a delightful experience.
            </h6>
        </div>
        <div className="flex-1" style={{ flex: 1 }}>
            <img 
            src="https://media.gettyimages.com/id/1425221653/it/foto/visione-uomini-daffari-orgogliosi-e-di-successo-ritraggono-sul-posto-di-lavoro-o-nelledificio.jpg?s=170667a&w=gi&k=20&c=PDDILvVuOjD1PQDowSeulsO9M3unhs8QOL4ZU_DirqM=" 
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }} 
            className="boxShadow1"
            alt="Team at work"
            />
        </div>
       </section>

        <section>
          <h2>My Apps</h2>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;

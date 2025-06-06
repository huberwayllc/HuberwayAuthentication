// components/dashboard/BlogSection.jsx
import React from "react";

const BlogSection = () => (
    <section data-tour="blog">
        <h2>News from Huberway</h2>
        <div className="grid-2col">
            <div className="blog-card">
                <h4>How to Advertise on TikTok</h4>
                <p>Scopri come vendere su TikTok con successo.</p>
                <a href="/blog/advertise-on-tiktok">Leggi →</a>
            </div>
            <div className="blog-card">
                <h4>5 Ways to Use Product Video</h4>
                <p>Usa i video per aumentare le conversioni.</p>
                <a href="/blog/video-conversion">Leggi →</a>
            </div>
        </div>
    </section>
);

export default BlogSection;

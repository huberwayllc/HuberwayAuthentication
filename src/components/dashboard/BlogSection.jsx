import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import "../../styles/BlogSection.css"; // se vuoi isolare lo stile

const BlogSection = ({ posts = [] }) => {
    return (
        <section data-tour="blog">
            <h2>News from Huberway</h2>
            {posts.length === 0 ? (
                <div className="no-news-box">
                    <InformationCircleIcon className="no-news-icon" />
                    <h4>No news available</h4>
                    <p>We’ll update this section with the latest articles soon.</p>
                </div>
            ) : (
                <div className="grid-2col">
                    {posts.map((post) => (
                        <div key={post.title} className="blog-card">
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <a href={post.link}>Read →</a>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default BlogSection;

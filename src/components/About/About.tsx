import type React from "react";

import "./About.css";

const About: React.FC = () => {
  return (
    <>
      <div className="about-container">
        <h1 className="about-title">About The Digital Frontier</h1>

        <p className="about-subtitle">
          Exploring the intersections of technology, culture, and creativity.
        </p>

        <div className="about-body">
          <p>
            Welcome to The Digital Frontier, a place for stories, ideas, and
            explorations of the modern world. Our mission is to provide
            insightful and thought-provoking content that helps you navigate the
            complexities of our digital age. From the latest technological
            advancements to creative expressions that shape our culture, we
            cover a wide range of topics to spark your curosity and inspire new
            ideas.
          </p>

          <p>
            Our community of writers and creators are passionate about what they
            do and are dedicated to sharing their unique perspectives. We
            believe that by sharing our knowledge and experiences, we can all
            learn and grow together. Thank you for joining us on this journey.
            We hope you find something that resonates with you.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;


import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/common/Footer";
import { UserRole } from "@/context/AuthContext";

interface AboutPageProps {
  userType: "job-seeker" | "employer";
}

const AboutPage: React.FC<AboutPageProps> = ({ userType }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userType={userType} />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-ai-primary/10 to-ai-accent/5 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">About Jobs-Here</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Revolutionizing the job search and recruitment process with AI technology
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Our Mission</h2>
              <p>
                At Jobs-Here, we're on a mission to transform how job seekers and employers connect. By leveraging cutting-edge AI technology, we create perfect matches that benefit both parties, saving time and reducing hiring friction.
              </p>

              <h2>Our Story</h2>
              <p>
                Founded in 2023, Jobs-Here emerged from a simple observation: traditional job searching and recruitment processes are inefficient and often frustrating. Our founders, experienced in both HR and AI technology, set out to build a platform that understands the nuanced needs of both job seekers and employers.
              </p>

              <h2>How We're Different</h2>
              <p>
                Unlike traditional job boards or recruitment agencies, Jobs-Here uses sophisticated AI algorithms to analyze not just skills and experience, but also working styles, values, and career aspirations. This holistic approach ensures better matches that lead to higher job satisfaction and employee retention.
              </p>

              {userType === "job-seeker" ? (
                <>
                  <h2>For Job Seekers</h2>
                  <p>
                    As a job seeker, you'll benefit from our AI-powered matching that understands your unique skills, experience, and career goals. Instead of applying to countless positions and never hearing back, our platform connects you with employers who are specifically looking for someone like you.
                  </p>
                  <p>
                    We also provide tools to help you optimize your resume, prepare for interviews, and negotiate offers—all designed to maximize your chances of landing your dream job.
                  </p>
                </>
              ) : (
                <>
                  <h2>For Employers</h2>
                  <p>
                    As an employer, you'll save time and resources by focusing only on candidates who truly match your requirements. Our AI screening tools evaluate candidates comprehensively, considering both hard skills and cultural fit.
                  </p>
                  <p>
                    The result? Faster hiring, reduced costs, and better retention rates. Our data shows that employers using Jobs-Here fill positions 40% faster and see 35% higher employee satisfaction compared to traditional recruiting methods.
                  </p>
                </>
              )}

              <h2>Our Values</h2>
              <ul>
                <li><strong>Innovation:</strong> We continuously improve our technology to provide better matches.</li>
                <li><strong>Transparency:</strong> We believe in honest communication between job seekers and employers.</li>
                <li><strong>Equality:</strong> We're committed to providing fair opportunities for all, regardless of background.</li>
                <li><strong>Excellence:</strong> We strive to deliver the highest quality service to our users.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

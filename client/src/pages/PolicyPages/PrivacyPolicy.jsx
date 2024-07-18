import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MetaTag from '../../components/Meta/MetaTag';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [])
  return (
    <>
      <MetaTag
          title="Privacy Policy - Lab Mantra"
          description="Read our privacy policy to understand how Lab Mantra collects, uses, and protects your personal information."
          keyword="Lab Mantra, privacy policy, personal information, data protection"
      />
        <section className="bread">
            <div className="container">
                <nav aria-label="breadcrumb ">
                    <h2>Privacy policy</h2>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Privacy policy</li>
                    </ol>
                </nav>
            </div>
        </section>

        <section className="container mt-4">
        <div className="row">
          <div className="col">
            <h4>1. Introduction</h4>
            <p>
              Welcome to LabMantra.com. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your personal data when you visit our website.
            </p>
            <h4>2. Information We Collect</h4>
            <p>We may collect the following types of information:</p>
            <ul>
              <li>
                <strong>Personal Identification Information:</strong> Name, email address, phone number, and any other information you provide when you register on our site or subscribe to our newsletter.
              </li>
              <li>
                <strong>Non-Personal Identification Information:</strong> Browser type, IP address, the pages you visit on our site, and other similar information.
              </li>
            </ul>
            <h4>3. How We Use Your Information</h4>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
              <li>To provide and maintain our website.</li>
              <li>To improve our website and services.</li>
              <li>To send periodic emails regarding updates, promotions, or other information that may be of interest to you.</li>
              <li>To respond to your inquiries, questions, or other requests.</li>
            </ul>
            <h4>4. Data Protection and Security</h4>
            <p>
              We implement a variety of security measures to ensure the safety of your personal information. Your data is stored on secure servers, and access is limited to authorized personnel only.
            </p>
            <h4>5. Sharing Your Information</h4>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers.
            </p>
            <h4>6. Cookies</h4>
            <p>
              Our website may use "cookies" to enhance the user experience. Users can choose to set their web browser to refuse cookies or to alert you when cookies are being sent. However, some parts of the site may not function properly if cookies are disabled.
            </p>
            <h4>7. Third-Party Services</h4>
            <p>
              We may use third-party service providers to help us operate our business and the website or administer activities on our behalf. These third parties may have access to your information, but they are obligated to protect it and use it only for the purposes for which it was disclosed.
            </p>
            <h4>8. Your Rights</h4>
            <p>
              You have the right to access, correct, or delete your personal information at any time. You can also opt out of receiving future communications from us by following the unsubscribe instructions in any email we send.
            </p>
            <h4>9. Changes to This Privacy Policy</h4>
            <p>
              LabMantra.com has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes.
            </p>
            <h4>10. Contact Us</h4>
            <p>
              If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
            </p>
            <p>
              Email: <a href="mailto:info@labmantra.com" className="highlight-email">info@labmantra.com</a><br />
              Address: A - 128/129 3rd floor pocket 00 Sector 2 Rohini New Delhi - 110085
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
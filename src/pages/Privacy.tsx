import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/navigation/NavBar";
import "../assets/css/privacy.css";

const Privacy: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Privacy Policy" />
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="privacy-content">
          <p className="intro">
            Biryani Darbaar is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information in compliance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). By using our website or services, you agree to the terms of this Privacy Policy.
          </p>

          <section className="policy-section">
            <h2>Information We Collect</h2>
            <p>We may collect personal information in the following ways:</p>
            <ul>
              <li><strong>Personal Information:</strong> This includes your name, email address, phone number, and any other details you provide when placing an order, subscribing to our newsletter, or contacting us.</li>
              <li><strong>Usage Information:</strong> We may collect details about your interaction with our website, such as your IP address, browser type, and access times.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>How We Use Your Information</h2>
            <p>Your personal information is used for:</p>
            <ul>
              <li>Processing orders and deliveries.</li>
              <li>Improving our services and website experience.</li>
              <li>Communicating with you about promotions, special offers, and updates if you've opted in.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>How We Protect Your Information</h2>
            <p>We use reasonable security measures to protect your personal information from unauthorised access, disclosure, or misuse. However, no data transmission over the internet can be 100% secure, so we cannot guarantee the absolute security of your information.</p>
          </section>

          <section className="policy-section">
            <h2>Sharing Your Information</h2>
            <p>We do not share your personal information with third parties unless:</p>
            <ul>
              <li>It's necessary to fulfil an order, such as sharing with delivery services.</li>
              <li>We are legally required to do so, for example, in response to a lawful request by authorities.</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>Cookies</h2>
            <p>Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us track and personalise your interaction with our website. You can manage or turn off cookies in your browser settings.</p>
          </section>

          <section className="policy-section">
            <h2>Accessing and Correcting Your Information</h2>
            <p>You have the right to request access to your personal information or to ask us to update or delete it. To do so, please contact us using the contact details provided below.</p>
          </section>

          <section className="policy-section">
            <h2>Links to Other Websites</h2>
            <p>Our website may contain links to third-party websites. These websites have their own privacy policies; we are not responsible for their content or privacy practices. Please review their policies before providing any personal information to them.</p>
          </section>

          <section className="policy-section">
            <h2>Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy occasionally to reflect changes in our practices or the law. Any changes will be posted on this page, and we encourage you to review it periodically.</p>
          </section>

          <section className="policy-section">
            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about your privacy, or if you'd like to access or update your personal information, please get in touch with us at:</p>
            <address>
              Biryani Darbaar<br />
              Atol Park, Adelaide, Australia
            </address>
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Privacy;
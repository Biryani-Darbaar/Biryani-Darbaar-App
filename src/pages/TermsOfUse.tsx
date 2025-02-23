import React from "react";
import "../assets/css/TermsOfUse.css";
import { IonContent, IonHeader, IonPage } from "@ionic/react";
import Navbar from "../components/Navbar/Navbar";

const TermsOfUse = () => {
  return (
    <IonPage>
      <IonHeader>
        <Navbar name="Terms of Use" />
      </IonHeader>
      <IonContent>
        <div >
          <div className="terms-content">
            <h1>Terms of Use</h1>
            <p className="last-updated">Last updated: February 2025</p>

            <div className="terms-section">
              <p>
                Welcome to Biryani Darbaar! Please read these Terms of Use
                ("Terms") carefully before using our website and services. You
                agree to be bound by these Terms by accessing or using our
                website. If you do not agree with any part of these Terms, you
                must refrain from using our website.
              </p>
            </div>

            <div className="terms-section">
              <h2>General Information</h2>
              <p>
                Biryani Darbaar operates from Atol Park, Adelaide, Australia,
                and serves authentic Indian biryani and other traditional
                dishes. These Terms govern your use of our website, including
                ordering online, subscribing to newsletters, and any other
                services we may offer.
              </p>
            </div>

            <div className="terms-section">
              <h2>User Responsibilities</h2>
              <p>By using our website, you agree that:</p>
              <ul>
                <li>
                  You will provide accurate and truthful information when
                  placing orders or communicating with us.
                </li>
                <li>
                  You will not engage in any unlawful activity, including
                  transmitting harmful data such as viruses or unauthorised
                  access to our systems.
                </li>
                <li>
                  You will comply with all applicable laws, including Australian
                  privacy and consumer protection.
                </li>
              </ul>
            </div>

            {/* Additional sections following the same pattern */}
            <div className="terms-section">
              <h2>Ordering and Payment</h2>
              <p>
                <strong>Pricing and Availability:</strong> Our website's menu
                items and prices are subject to change without prior notice.
                While we strive for accuracy, there may be occasional errors in
                pricing or item availability.
              </p>
              <p>
                <strong>Payment Processing:</strong> Payments for online orders
                are processed securely through our trusted third-party payment
                gateway.
              </p>
              <p>
                <strong>Order Confirmation:</strong> We will send an order
                confirmation email once you place an order. However, this does
                not constitute an acceptance of your order. We reserve the right
                to cancel any order at our discretion, particularly if it
                violates any part of these Terms.
              </p>
            </div>

            <div className="terms-section">
              <h2>Contact Information</h2>
              <p>
                If you have any questions or concerns about our Terms of Use or
                services, please feel free to contact us at:
              </p>
              <div className="contact-info">
                <p>Biryani Darbaar</p>
                <p>Atol Park, Adelaide, Australia</p>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsOfUse;

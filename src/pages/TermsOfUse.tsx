import React from "react";
import { IonPage } from "@ionic/react";
import Navbar from "../components/navigation/NavBar";

const TermsOfUse: React.FC = () => {
  return (
    <IonPage className="bg-white overflow-y-auto">
      <Navbar />

      <div className="flex flex-col gap-8 items-center w-full justify-center py-8 px-6">
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-2xl text-titleColor font-semibold">
            Terms of Use
          </span>
          <p className="text-sm text-gray-500">Last updated: February 2025</p>

          <p className="text-gray-600 leading-relaxed">
            Welcome to Biryani Darbaar! Please read these Terms of Use
            (&quot;Terms&quot;) carefully before using our website and services.
            By accessing or using our website, you agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you must
            refrain from using our website.
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                General Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Biryani Darbaar operates from Atol Park, Adelaide, Australia,
                and serves authentic Indian biryani and other traditional
                dishes. These Terms govern your use of our website, including
                ordering online, subscribing to newsletters, and any other
                services we may offer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                User Responsibilities
              </h2>
              <p className="text-gray-600 mb-2">By using our website, you agree that:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>
                  You will provide accurate and truthful information when placing
                  orders or communicating with us.
                </li>
                <li>
                  You will not engage in any unlawful activity, including
                  transmitting harmful data such as viruses or unauthorised access
                  to our systems.
                </li>
                <li>
                  You will comply with all applicable laws, including Australian
                  privacy and consumer protection.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Ordering and Payment
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Pricing and Availability:</strong> Menu items and prices
                are subject to change without prior notice. While we strive for
                accuracy, there may be occasional errors in pricing or item
                availability.
              </p>
              <p className="text-gray-600 leading-relaxed mb-2">
                <strong>Payment Processing:</strong> Payments for online orders
                are processed securely through our trusted third-party payment
                gateway.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Order Confirmation:</strong> We will send an order
                confirmation email once you place an order. However, this does
                not constitute an acceptance of your order. We reserve the right
                to cancel any order at our discretion, particularly if it
                violates any part of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                If you have any questions or concerns about our Terms of Use or
                services, please feel free to contact us at:
              </p>
              <address className="not-italic text-gray-700 font-medium">
                Biryani Darbaar <br />
                Atol Park, Adelaide, Australia
              </address>
            </section>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default TermsOfUse;

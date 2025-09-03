import {
  IonPage,
} from "@ionic/react";
import React from "react";
import Navbar from "../components/navigation/NavBar";

const Privacy: React.FC = () => {
  return (
    <IonPage className="bg-white overflow-y-auto">

      <Navbar />
      <div className="flex flex-col gap-8 items-center w-full justify-center py-8 px-6">
        <div className="flex w-full flex-col items-start gap-4">
          <span className="text-2xl text-titleColor font-semibold">Privacy Policy</span>

          <p className="text-gray-600 leading-relaxed">
            Biryani Darbaar is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information in compliance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
            By using our website or services, you agree to the terms of this Privacy Policy.
          </p>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Information We Collect
              </h2>
              <p className="text-gray-600 mb-2">
                We may collect personal information in the following ways:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>
                  <strong>Personal Information:</strong> Your name, email address, phone number, and any other details you provide when placing an order, subscribing to our newsletter, or contacting us.
                </li>
                <li>
                  <strong>Usage Information:</strong> Details about your interaction with our website, such as your IP address, browser type, and access times.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-2">Your information may be used for:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Processing orders and deliveries</li>
                <li>Improving our services and website experience</li>
                <li>Communicating with you about promotions, offers, and updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                How We Protect Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use reasonable security measures to protect your personal information from unauthorised access, disclosure, or misuse. However, no data transmission over the internet can be 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Sharing Your Information
              </h2>
              <p className="text-gray-600 mb-2">
                We do not share your personal information with third parties unless:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>It's necessary to fulfil an order (e.g. with delivery services)</li>
                <li>We are legally required to do so (e.g. lawful requests by authorities)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us track and personalise your interaction. You can manage or turn off cookies in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Accessing & Correcting Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to request access to your personal information or to ask us to update or delete it. Please contact us using the details below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Links to Other Websites
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may contain links to third-party websites. These have their own privacy policies, and we are not responsible for their content or practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy occasionally. Any changes will be posted here, and we encourage you to review it periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-2">
                If you have any questions about your privacy, please contact us:
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

export default Privacy;
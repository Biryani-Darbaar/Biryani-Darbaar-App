import React, { useRef, useEffect, useState } from "react";

const correctOTP = "1234"; // Validate from your server

interface OtpInputWithValidationProps {
  numberOfDigits: number; // Prop to define the number of OTP digits
}

const OtpInputWithValidation: React.FC<OtpInputWithValidationProps> = ({
  numberOfDigits,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpBoxReference = useRef<HTMLInputElement[]>([]);

  function handleChange(value: string, index: number) {
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (
      e.key === "Enter" &&
      e.currentTarget.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue !== "" && otpValue !== correctOTP) {
      setOtpError("❌ Wrong OTP Please Check Again");
    } else {
      setOtpError(null);
    }
  }, [otp]);

  return (
    <article style={{ width: "50%", margin: "auto", paddingTop: "2rem" }}>
      <p style={{ fontSize: "2rem", fontWeight: "500", color: "white" }}>
        OTP Input With Validation
      </p>

      <p
        style={{
          fontSize: "1rem",
          color: "white",
          marginTop: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        One Time Password (OTP)
      </p>

      <div className="">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference!)}
            style={{
              border: "1px solid white",
              width: "5rem",
              height: "auto",
              padding: "0.75rem",
              borderRadius: "0.375rem",
              backgroundColor: "black",
              color: "white",
              outline: "none",
              transition: "border 0.2s",
            }}
            className="focus:border-2 appearance-none"
          />
        ))}
      </div>

      <p className={`text-lg text-white mt-4 ${otpError ? "error-show" : ""}`}>
        {otpError}
      </p>
    </article>
  );
};

export default OtpInputWithValidation;

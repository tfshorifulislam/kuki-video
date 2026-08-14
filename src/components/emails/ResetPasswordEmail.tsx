import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  url: string;
  userName?: string;
}

export const ResetPasswordEmail = ({ url, userName }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Heading style={heading}>Password Reset Request</Heading>

          {/* Content */}
          <Section style={section}>
            <Text style={text}>Hi {userName || "there"},</Text>
            <Text style={text}>
              We received a request to reset your password. Click the button below to set a new password for your account:
            </Text>

            {/* Action Button */}
            <Section style={btnContainer}>
              <Button style={button} href={url}>
                Reset Password
              </Button>
            </Section>

            {/* Expiry Warning */}
            <Section style={warningBox}>
              <Text style={warningText}>
                ⚠️ <strong>Note:</strong> This link is valid for <strong>5 minutes</strong> only.
              </Text>
            </Section>

            <Text style={text}>
              If you didn't request a password reset, please ignore this email.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section>
            <Text style={footerText}>
              If the button doesn't work, copy and paste this link in your browser:
            </Text>
            <Link href={url} style={link}>
              {url}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

// --- Styles ---
const main = {
  backgroundColor: "#f4f7f9",
  padding: "40px 0",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "30px 20px",
  maxWidth: "500px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  border: "1px solid #e1e8ed",
};

const heading = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#0f172a",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const section = {
  padding: "0 10px",
};

const text = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#475569",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "25px 0",
};

const button = {
  backgroundColor: "#2563eb",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const warningBox = {
  backgroundColor: "#fef3c7",
  borderLeft: "4px solid #f59e0b",
  padding: "10px 14px",
  borderRadius: "4px",
  margin: "20px 0",
};

const warningText = {
  margin: "0",
  fontSize: "13px",
  color: "#92400e",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "20px 0",
};

const footerText = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "0 0 5px 0",
};

const link = {
  color: "#2563eb",
  fontSize: "12px",
  wordBreak: "break-all" as const,
};
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

interface AuthEmailTemplateProps {
  type: "welcome" | "sign-in-notification";
  name?: string;
  device?: string;
  ip?: string;
}

export const AuthEmailTemplate = ({
  type,
  name,
  device,
  ip,
}: AuthEmailTemplateProps) => {
  const previewText = type === "welcome" 
    ? "Welcome to PulseGrid!" 
    : "New sign-in detected on your account.";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <div style={logo}>P</div>
          </Section>
          
          <Heading style={h1}>
            {type === "welcome" ? `Welcome to PulseGrid, ${name || "there"}!` : "New Sign-in Detected"}
          </Heading>

          <Text style={text}>
            {type === "welcome"
              ? "We're excited to have you on board. PulseGrid helps you ship higher-quality code with automated reviews and visual workflows."
              : `Hello ${name || "there"}, we wanted to let you know that a new sign-in occurred on your account.`}
          </Text>

          {type === "sign-in-notification" && (
            <Section style={detailsSection}>
              <Text style={detailsTitle}>Sign-in Details:</Text>
              <Row style={detailRow}>
                <Column style={detailLabel}>Device:</Column>
                <Column style={detailValue}>{device || "Unknown Device"}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>IP Address:</Column>
                <Column style={detailValue}>{ip || "Unknown IP"}</Column>
              </Row>
              <Row style={detailRow}>
                <Column style={detailLabel}>Time:</Column>
                <Column style={detailValue}>{new Date().toLocaleString()}</Column>
              </Row>
            </Section>
          )}

          <Section style={btnSection}>
            <Link
              style={button}
              href="https://pulsegrid.app/dashboard"
            >
              {type === "welcome" ? "Get Started" : "Go to Dashboard"}
            </Link>
          </Section>

          <Text style={text}>
            {type === "sign-in-notification" && "If this wasn't you, please secure your account immediately."}
          </Text>

          <Hr style={hr} />
          
          <Text style={footer}>
            PulseGrid Inc. • 123 Code Lane, SF, CA 94103
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f9fafb",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "580px",
  marginTop: "40px",
  border: "1px solid #e5e7eb",
};

const logoSection = {
  marginBottom: "32px",
};

const logo = {
  width: "40px",
  height: "40px",
  backgroundColor: "#09090b",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "40px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "32px",
  margin: "0 0 20px",
  letterSpacing: "-0.025em",
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 24px",
};

const detailsSection = {
  backgroundColor: "#f3f4f6",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const detailsTitle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "12px",
  margin: "0 0 12px",
};

const detailRow = {
  marginBottom: "8px",
};

const detailLabel = {
  fontSize: "13px",
  color: "#6b7280",
  width: "100px",
};

const detailValue = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#111827",
};

const btnSection = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#09090b",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#9ca3af",
  fontSize: "12px",
  textAlign: "center" as const,
};

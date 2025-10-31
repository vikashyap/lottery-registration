import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface PrizeNotificationEmailProps {
  userName: string;
  prizeName: string;
  prizeColor: string;
  qrCodeDataUrl: string;
  rewardUrl: string;
}

export default function PrizeNotificationEmail({
  userName,
  prizeName,
  prizeColor,
  qrCodeDataUrl,
  rewardUrl,
}: PrizeNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Herzlichen Glückwunsch! Sie haben {prizeName} gewonnen! 🎉
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Heading style={logoHeading}>SJMT</Heading>
            <Text style={logoSubtitle}>SUPER JACK MUAY THAI</Text>
            <Text style={logoTagline}>
              Your authentic Muay Thai gym in Berlin
            </Text>
          </Section>

          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Herzlichen Glückwunsch! 🎉</Heading>
            <Text style={subtitle}>Sie haben beim Glücksrad gewonnen!</Text>
          </Section>

          {/* Prize Section */}
          <Section style={prizeSection}>
            <div style={{ ...prizeBadge, backgroundColor: prizeColor }}>
              <Text style={prizeText}>{prizeName}</Text>
            </div>
          </Section>

          {/* QR Code Section */}
          <Section style={qrSection}>
            <Text style={instructionText}>
              🎁 Klicken Sie auf den Link, um Ihren Preis einzulösen:
            </Text>
            <Link href={rewardUrl} style={linkButton}>
              🎯 Preis jetzt einlösen 🎯
            </Link>
            <Text style={smallText}>
              💻 Link:{" "}
              <Link href={rewardUrl} style={link}>
                {rewardUrl}
              </Link>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Studio Info */}
          <Section style={studioSection}>
            <Heading style={h2}>Besuchen Sie uns im Studio</Heading>
            <Text style={addressText}>
              <strong>Super Jack Muay Thai</strong>
              <br />
              Grünberger Str. 84
              <br />
              10245 Berlin, Deutschland
            </Text>
            <Link
              href="https://maps.app.goo.gl/X5uttU5XCRLx6yxb8"
              style={button}
            >
              📍 Wegbeschreibung anzeigen
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Vielen Dank, dass Sie bei unserem Glücksrad mitgemacht haben!
              <br />
              Wir freuen uns darauf, Sie im Studio zu sehen.
            </Text>
            <Text style={footerText}>
              <strong>Super Jack Muay Thai Team</strong>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const logoSection = {
  padding: "32px 20px",
  textAlign: "center" as const,
  backgroundColor: "#000000",
};

const logoHeading = {
  color: "#ffffff",
  fontSize: "48px",
  fontWeight: "bold",
  margin: "0 0 8px",
  padding: "0",
  letterSpacing: "4px",
};

const logoSubtitle = {
  color: "#f59e0b",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0 0 4px",
  padding: "0",
  letterSpacing: "2px",
};

const logoTagline = {
  color: "#cccccc",
  fontSize: "14px",
  margin: "0",
  padding: "0",
  fontStyle: "italic" as const,
};

const header = {
  padding: "32px 20px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#000000",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 8px",
  padding: "0",
  lineHeight: "1.3",
};

const h2 = {
  color: "#000000",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 16px",
  padding: "0",
};

const subtitle = {
  color: "#666666",
  fontSize: "18px",
  margin: "0",
  padding: "0",
};

const prizeSection = {
  padding: "24px 20px",
  textAlign: "center" as const,
};

const prizeBadge = {
  display: "inline-block",
  padding: "16px 32px",
  borderRadius: "12px",
  margin: "0 auto",
};

const prizeText = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
};

const qrSection = {
  padding: "24px 20px",
  textAlign: "center" as const,
};

const instructionText = {
  color: "#333333",
  fontSize: "16px",
  margin: "0 0 20px",
  fontWeight: "600",
};

const linkButton = {
  backgroundColor: "#f59e0b",
  borderRadius: "12px",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "16px 32px",
  margin: "0 auto 16px",
  border: "3px solid #000000",
};

const qrCode = {
  margin: "0 auto 16px",
  border: "4px solid #000000",
  borderRadius: "8px",
};

const smallText = {
  color: "#666666",
  fontSize: "14px",
  margin: "0",
};

const link = {
  color: "#f59e0b",
  textDecoration: "underline",
};

const divider = {
  borderColor: "#e6e6e6",
  margin: "32px 20px",
};

const studioSection = {
  padding: "0 20px",
  textAlign: "center" as const,
};

const addressText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px",
};

const button = {
  backgroundColor: "#f59e0b",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
  margin: "0 auto",
};

const footer = {
  padding: "0 20px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "8px 0",
};

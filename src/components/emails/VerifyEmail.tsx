import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface VerifyEmailProps {
    url: string;
    userName?: string;
}

const VerifyEmail = ({ url, userName }: VerifyEmailProps) => {
    return (
        <Html>
            <Head />

            <Preview>Verify your email address</Preview>

            <Body
                style={{
                    backgroundColor: "#f4f7fb",
                    fontFamily:
                        "Arial, Helvetica, sans-serif",
                    margin: 0,
                    padding: "40px 20px",
                }}
            >
                <Container
                    style={{
                        maxWidth: "520px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        padding: "40px",
                        boxShadow:
                            "0 4px 20px rgba(0, 0, 0, 0.08)",
                    }}
                >
                    <Section>
                        <Heading
                            style={{
                                fontSize: "28px",
                                fontWeight: "700",
                                color: "#111827",
                                textAlign: "center",
                                margin: "0 0 24px",
                            }}
                        >
                            Verify Your Email
                        </Heading>

                        <Text
                            style={{
                                fontSize: "16px",
                                lineHeight: "26px",
                                color: "#4b5563",
                                margin: "0 0 16px",
                            }}
                        >
                            Hi {userName || "there"},
                        </Text>

                        <Text
                            style={{
                                fontSize: "16px",
                                lineHeight: "26px",
                                color: "#4b5563",
                                margin: "0 0 24px",
                            }}
                        >
                            Thank you for creating an account with us.
                            Please verify your email address by clicking
                            the button below.
                        </Text>

                        <Section
                            style={{
                                textAlign: "center",
                                margin: "30px 0",
                            }}
                        >
                            <Button
                                href={url}
                                style={{
                                    backgroundColor: "#0055ff",
                                    color: "#ffffff",
                                    padding: "14px 28px",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                }}
                            >
                                Verify Email
                            </Button>
                        </Section>

                        <Text
                            style={{
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#6b7280",
                                marginTop: "30px",
                            }}
                        >
                            If the button above doesn't work, copy and
                            paste the following link into your browser:
                        </Text>

                        <Text
                            style={{
                                fontSize: "13px",
                                lineHeight: "20px",
                                color: "#0055ff",
                                wordBreak: "break-all",
                            }}
                        >
                            {url}
                        </Text>

                        <Text
                            style={{
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#9ca3af",
                                marginTop: "30px",
                                textAlign: "center",
                            }}
                        >
                            If you didn't create this account, you can
                            safely ignore this email.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default VerifyEmail;
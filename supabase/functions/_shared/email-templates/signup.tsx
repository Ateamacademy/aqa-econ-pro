/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to Econ Rev – confirm your email</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>📊 Econ Rev</Text>
        <Heading style={h1}>Welcome aboard!</Heading>
        <Text style={text}>
          Thanks for signing up for{' '}
          <Link href={siteUrl} style={link}><strong>Econ Rev</strong></Link>!
          You're one step away from smashing your economics exams.
        </Text>
        <Text style={text}>
          Confirm your email (
          <Link href={`mailto:${recipient}`} style={link}>{recipient}</Link>
          ) by clicking below:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Verify Email
        </Button>
        <Text style={footer}>
          If you didn't create an account, you can safely ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#080B14', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '480px', margin: '0 auto' }
const logo = { fontSize: '18px', fontWeight: 'bold' as const, color: '#818CF8', margin: '0 0 30px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#F1F5F9', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', margin: '0 0 25px' }
const link = { color: '#818CF8', textDecoration: 'underline' }
const button = {
  backgroundColor: '#4F56FF',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600' as const,
  borderRadius: '10px',
  padding: '12px 24px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#475569', margin: '30px 0 0' }

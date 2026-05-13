/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Econ Rev'
const SUPPORT_EMAIL = 'support@econrev.co'

interface Props {
  name?: string
  message?: string
}

const ContactConfirmation = ({ name, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Thanks, ${name}!` : 'Thanks for reaching out!'}</Heading>
        <Text style={text}>
          We've received your message and a member of the {SITE_NAME} team
          will get back to you within 24 hours.
        </Text>
        {message ? (
          <>
            <Hr style={hr} />
            <Text style={label}>Your message</Text>
            <Text style={quote}>{message}</Text>
          </>
        ) : null}
        <Hr style={hr} />
        <Text style={footer}>
          Need anything urgent? Just reply to this email or write to{' '}
          {SUPPORT_EMAIL}.
        </Text>
        <Text style={signature}>— The {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: `We've received your message · ${SITE_NAME}`,
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane', message: 'Do you offer school licences?' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#080B14', margin: '0 0 16px' }
const text = { fontSize: '14px', color: '#334155', lineHeight: '1.6', margin: '0 0 16px' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#64748B', margin: '0 0 6px' }
const quote = { fontSize: '14px', color: '#080B14', lineHeight: '1.6', margin: '0 0 16px', padding: '12px 14px', backgroundColor: '#F1F5F9', borderRadius: '8px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#E2E8F0', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#64748B', margin: '0 0 8px' }
const signature = { fontSize: '13px', color: '#334155', margin: '8px 0 0' }

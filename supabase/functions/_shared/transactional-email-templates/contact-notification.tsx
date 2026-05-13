/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  message?: string
}

const ContactNotification = ({ name, email, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New contact form submission from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New contact form submission</Heading>
        <Text style={row}><strong>Name:</strong> {name || '—'}</Text>
        <Text style={row}><strong>Email:</strong> {email || '—'}</Text>
        <Hr style={hr} />
        <Text style={label}>Message</Text>
        <Text style={quote}>{message || '(empty)'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotification,
  subject: (d: Record<string, any>) =>
    `[Econ Rev] New contact from ${d?.name || d?.email || 'visitor'}`,
  to: 'aminul.miah@ateamacademy.co.uk',
  displayName: 'Contact form notification (admin)',
  previewData: { name: 'Jane', email: 'jane@example.com', message: 'Hi!' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '40px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#080B14', margin: '0 0 16px' }
const row = { fontSize: '14px', color: '#334155', margin: '0 0 6px' }
const label = { fontSize: '11px', textTransform: 'uppercase' as const, letterSpacing: '1px', color: '#64748B', margin: '0 0 6px' }
const quote = { fontSize: '14px', color: '#080B14', lineHeight: '1.6', margin: '0 0 16px', padding: '12px 14px', backgroundColor: '#F1F5F9', borderRadius: '8px', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#E2E8F0', margin: '20px 0' }

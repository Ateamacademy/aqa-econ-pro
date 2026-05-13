import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'EconRev'

interface ParentUpdateProps {
  parentName?: string
  studentName?: string
  teacherName?: string
  subject?: string
  bodyText?: string
}

const ParentUpdateEmail = ({ parentName, studentName, teacherName, subject, bodyText }: ParentUpdateProps) => {
  const paragraphs = (bodyText ?? '').split(/\n\n+/).filter(Boolean)
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{subject ?? `An update on ${studentName ?? 'your child'}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{subject ?? `Update on ${studentName ?? 'your child'}`}</Heading>
          <Text style={text}>{parentName ? `Dear ${parentName},` : 'Hello,'}</Text>
          {paragraphs.length === 0 ? (
            <Text style={text}>{bodyText}</Text>
          ) : (
            paragraphs.map((p, i) => <Text key={i} style={text}>{p}</Text>)
          )}
          <Hr style={hr} />
          <Text style={footer}>
            {teacherName ? `${teacherName} · ` : ''}Sent via {SITE_NAME}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ParentUpdateEmail,
  subject: (d: Record<string, any>) => d?.subject || `Update from ${SITE_NAME}`,
  displayName: 'Parent update',
  previewData: {
    parentName: 'Mrs. Patel',
    studentName: 'Aanya',
    teacherName: 'Mr. Smith',
    subject: 'Aanya — half-term progress',
    bodyText: 'Aanya has had a strong half-term, particularly on macroeconomic policy.\n\nNext step: focus on 25-mark evaluation structure ahead of the mock.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 28px', maxWidth: '560px' }
const h1 = { fontSize: '20px', fontWeight: 'bold', color: '#0b1220', margin: '0 0 18px' }
const text = { fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0 0 14px' }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#9ca3af' }

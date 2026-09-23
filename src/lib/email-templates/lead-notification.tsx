import * as React from 'react'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  formName?: string
  fields?: { label: string; value: string }[]
}

function LeadNotification({ formName = 'Website form', fields = [] }: Props) {
  return (
    <Html>
      <Head />
      <Preview>New {formName} submission</Preview>
      <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ padding: '24px', maxWidth: '560px' }}>
          <Heading style={{ color: '#0b2545', fontSize: '22px' }}>New {formName} submission</Heading>
          <Section style={{ backgroundColor: '#f2f8f5', borderRadius: '8px', padding: '16px' }}>
            {fields.map((f) => (
              <Text key={f.label} style={{ margin: '6px 0', color: '#0e2a47', fontSize: '14px' }}>
                <strong>{f.label}:</strong> {f.value || '—'}
              </Text>
            ))}
          </Section>
          <Text style={{ color: '#6b7280', fontSize: '12px' }}>Reply to this email to contact the sender directly.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadNotification,
  subject: (d: Record<string, any>) => `New ${d.formName ?? 'website'} request`,
  displayName: 'Lead notification',
  to: 'contact@dentalpaymenttech.com',
  previewData: {
    formName: 'Free Savings Analysis',
    fields: [
      { label: 'Name', value: 'Jordan Smith' },
      { label: 'Email', value: 'jordan@practice.com' },
    ],
  },
} satisfies TemplateEntry

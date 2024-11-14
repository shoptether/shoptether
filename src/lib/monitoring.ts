import * as Sentry from '@sentry/nextjs'

export function initMonitoring() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    })
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  console.error(error)
  Sentry.captureException(error, { extra: context })
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, { level })
}
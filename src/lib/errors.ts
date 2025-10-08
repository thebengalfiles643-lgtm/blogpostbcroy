import { NextResponse } from 'next/server'

export type ApiErrorBody = {
  error: string
  details?: unknown
}

export function badRequest(message: string, details?: unknown) {
  return NextResponse.json<ApiErrorBody>({ error: message, details }, { status: 400 })
}

export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json<ApiErrorBody>({ error: message }, { status: 401 })
}

export function notFound(message = 'Not found') {
  return NextResponse.json<ApiErrorBody>({ error: message }, { status: 404 })
}

export function serverError(message = 'Internal server error', details?: unknown) {
  return NextResponse.json<ApiErrorBody>({ error: message, details }, { status: 500 })
}



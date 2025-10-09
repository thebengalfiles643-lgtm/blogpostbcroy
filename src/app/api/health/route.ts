import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // You can add database connectivity check here if needed
    // const { prisma } = await import('@/lib/prisma')
    // await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'BlogSite API'
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        timestamp: new Date().toISOString(),
        error: 'Service unavailable'
      },
      { status: 503 }
    )
  }
}
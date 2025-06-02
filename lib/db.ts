import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const prismadb = globalThis.prisma || 
  new PrismaClient({
    log: ['error', 'warn'],
    errorFormat: 'pretty',
  })

// Add connection management
async function connectDB() {
  try {
    await prismadb.$connect()
    console.log('Database connection established')
  } catch (error) {
    console.error('Database connection failed:', error)
    // Attempt to reconnect after a delay
    setTimeout(connectDB, 5000)
  }
}

// Initialize connection
connectDB()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismadb
}

export default prismadb 
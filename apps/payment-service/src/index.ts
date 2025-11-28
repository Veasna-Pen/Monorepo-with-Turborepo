import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'


const app = new Hono()
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})


app.get('/test', (c) => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({
      message: 'Payment Service: You are not logged in.',
    })
  }

  return c.json({
    message: 'Payment Service:: You are logged in!',
    userId: auth.userId,
  })
})

const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment service is running on port ${info.port}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
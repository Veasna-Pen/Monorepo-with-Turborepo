import Fastify from 'fastify';
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'

const fastify = Fastify();
fastify.register(clerkPlugin)


fastify.get('/health', (request, reply) => {
    reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})


fastify.get('/test', (request, reply) => {

    const { isAuthenticated, userId } = getAuth(request)
    if (!isAuthenticated) {
        return reply.code(401).send({ error: 'Order Service: You are not logged in.' })
    } else {
        reply.status(200).send({ message: 'Order Service: You are logged in!' })
    }

})

const start = async () => {
    try {
        await fastify.listen({ port: 8001 });
        console.log('Order service is running on port 8001');

    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
start();
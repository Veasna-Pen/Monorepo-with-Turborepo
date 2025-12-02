import Fastify from 'fastify';
import { clerkPlugin } from '@clerk/fastify'
import { shouldBeUser } from './middleware/authMiddleware.js';

const fastify = Fastify();
fastify.register(clerkPlugin)


fastify.get('/health', (request, reply) => {
    reply.status(200).send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    })
})


fastify.get('/test', { preHandler: shouldBeUser }, (request, reply) => {
    reply.status(200).send({ message: 'Order Service: You are logged in!', userId: request.userId })
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
import { getAuth } from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
    interface FastifyRequest {
        userId?: string;
    }
}

export const shouldBeUser = async(
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const { isAuthenticated, userId } = getAuth(request);

    if (!isAuthenticated || !userId) {
        reply.code(401).send({ error: "Order Service: You are not logged in." });
        return;
    }

    request.userId = userId;
};



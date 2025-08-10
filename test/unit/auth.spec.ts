import type { H3Event } from 'h3';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.stubGlobal('$database', {} as unknown);
vi.stubGlobal('createError', ({ statusCode, statusMessage, message }) => ({
    statusCode,
    statusMessage,
    message,
}));

// Mock dependencies
vi.mock('better-auth', () => ({
    betterAuth: vi.fn().mockImplementation(() => ({
        api: {
            getSession: vi.fn(),
        },
    })),
}));
vi.mock('better-auth/adapters/prisma', () => ({
    prismaAdapter: vi.fn(),
}));

// mock H3 and createError global
vi.mock('h3', () => ({
    createError: vi.fn().mockImplementation(({ statusCode, statusMessage, message }) => {
        const error = new Error(message);
        (error as unknown).statusCode = statusCode;
        (error as unknown).statusMessage = statusMessage;
        return error;
    }),
}));

const { $auth } = await import('../../server/utils/auth');

const mockSession = { user: { id: '123', email: 'test@example.com' } };

describe('$auth', () => {
    let requireAuth: ReturnType<typeof $auth>['requireAuth'];
    let client: ReturnType<typeof $auth>['client'];
    let event: H3Event;

    beforeEach(() => {
        const auth = $auth();
        requireAuth = auth.requireAuth;
        client = auth.client;
        event = { headers: { authorization: 'Bearer token' } } as H3Event;
    });

    it('returns session when authenticated', async () => {
        (client.api.getSession as unknown).mockResolvedValueOnce(mockSession);
        const session = await requireAuth(event);
        expect(session).toEqual(mockSession);
    });

    it('throws error when not authenticated', async () => {
        (client.api.getSession as unknown).mockResolvedValueOnce(null);
        await expect(requireAuth(event)).rejects.toMatchObject({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: 'Unauthorized',
        });
    });

    it('calls getSession with correct headers', async () => {
        (client.api.getSession as unknown).mockResolvedValueOnce(mockSession);
        await requireAuth(event);
        expect(client.api.getSession).toHaveBeenCalledWith({
            headers: event.headers,
        });
    });
});

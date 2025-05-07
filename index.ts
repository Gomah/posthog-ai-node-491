import { withTracing } from '@posthog/ai';
import { PostHog } from 'posthog-node';
import { createAnthropic } from '@ai-sdk/anthropic';

const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const model = anthropic('claude-3-7-sonnet-20250219');

const analytics = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,

    // Don't batch events and flush immediately - we're running in a serverless environment
    flushAt: 1,
    flushInterval: 0,
});


export function createModelWithTracing(options: Parameters<typeof withTracing>[2]) {
    return withTracing(model, analytics, options);
}

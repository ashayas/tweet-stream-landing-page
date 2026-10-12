export const source = "https://github.com/ashayas/tweetstream";
export const tools = [
  {
    name: "post_tweet",
    role: "THE FINISHER",
    zone: "DEFENSIVE ZONE · BYOC",
    title: "Turn a thought into a post.",
    description:
      "Give your agent the final pass. Publish a post or quote a conversation on X, using your connected account.",
    input: '{ "text": "Good things are built in the open. 🏒" }',
    output:
      '{ "id": "demo_post_01", "text": "Good things are built in the open. 🏒" }',
    point: [-3.7, 1.6],
  },
  {
    name: "reply_to_tweet",
    role: "THE PLAYMAKER",
    zone: "NEUTRAL ZONE · TRANSITION",
    title: "Keep the conversation moving.",
    description:
      "Reply to a specific post with the context your agent needs. You choose the conversation and the play.",
    input: '{ "tweet_id": "1234567890", "text": "Let’s build it." }',
    output: '{ "id": "demo_reply_01", "text": "Let’s build it." }',
    point: [-0.8, 1.85],
  },
  {
    name: "get_tweet",
    role: "THE SCOUT",
    zone: "ATTACKING ZONE · PLAY",
    title: "Read the play before you act.",
    description:
      "Fetch a post, its author, and engagement metrics. Bring useful context into your next agent workflow.",
    input: '{ "tweet_id": "1234567890" }',
    output: '{ "id": "1234567890", "text": "An example post", "likes": 12 }',
    point: [3, 1.7],
  },
  {
    name: "read_timeline",
    role: "THE LOOKOUT",
    zone: "DEFENSIVE ZONE · BYOC",
    title: "Know what’s happening on the ice.",
    description:
      "Read recent posts from your home timeline. Availability depends on the access granted to your X API account.",
    input: '{ "limit": 10 }',
    output: '{ "posts": ["…recent posts from X"] }',
    point: [-3.7, -1.7],
  },
  {
    name: "search_tweets",
    role: "THE TRACKER",
    zone: "NEUTRAL ZONE · TRANSITION",
    title: "Find your next opening.",
    description:
      "Search recent posts by query and give your agent a useful starting point. X access and rate limits apply.",
    input: '{ "query": "open source", "limit": 10 }',
    output: '{ "posts": ["…matching posts from X"] }',
    point: [-0.8, -1.85],
  },
  {
    name: "get_my_profile",
    role: "THE CAPTAIN",
    zone: "ATTACKING ZONE · PLAY",
    title: "Know who you’re playing as.",
    description:
      "Inspect the authenticated account’s profile, handle, bio, and follower count before your agent takes a turn.",
    input: "{}",
    output: '{ "username": "your_handle", "name": "Your name" }',
    point: [3, -1.7],
  },
];
export const configs = {
  local: {
    label: "Your X app · local",
    file: "mcp.json",
    code: JSON.stringify(
      {
        mcpServers: {
          "tweet-stream": {
            command: "node",
            args: ["/absolute/path/to/tweet_stream/dist/cli.js"],
            env: {
              TWEET_STREAM_API_KEY: "ts_live_YOUR_LOCAL_KEY",
              TOKEN_STORE_PATH: "/absolute/path/to/tweetstream/.tokens.json",
            },
          },
        },
      },
      null,
      2,
    ),
    note: "Recommended: create your own X app, run the local OAuth server once, then paste its one-time ts_live key and token-store path here. X usage is billed to your app.",
  },
  byoc: {
    label: "BYOC · Direct Keys",
    file: "mcp.json",
    code: JSON.stringify(
      {
        mcpServers: {
          "tweet-stream": {
            command: "npx",
            args: ["-y", "tweet-stream"],
            env: {
              X_API_KEY: "your_consumer_key",
              X_API_SECRET: "your_consumer_secret",
              X_ACCESS_TOKEN: "your_access_token",
              X_ACCESS_TOKEN_SECRET: "your_access_token_secret",
            },
          },
        },
      },
      null,
      2,
    ),
    note: "Bring Your Own Credentials: Run directly with your X Developer Portal keys. No local server needed, zero keys stored on external servers, and zero shared usage cost.",
  },
  rest: {
    label: "REST API",
    file: "terminal",
    code: 'curl http://localhost:3030/api/v1/me \\\n  -H "Authorization: Bearer YOUR_LOCAL_TWEET_STREAM_TOKEN"',
    note: "For the Node server you started on this machine. Requests use the X app configured in its .env file and are billed to your X developer project.",
  },
};

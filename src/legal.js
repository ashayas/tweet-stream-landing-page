export const policies = {
  privacy: {
    eyebrow: "THE RULEBOOK / 01",
    title: "Privacy policy.",
    intro:
      "Your account. Your data. A clear view of what happens when you use tweet.stream.",
    sections: [
      [
        "Who we are",
        "tweet.stream is an X API and Model Context Protocol (MCP) project maintained by Vartabase AI. This policy covers the tweet.stream website and any tweet.stream service we operate. If you run the open-source software yourself, you control that installation and are responsible for its data practices. Independent hosts and AI clients have their own policies.",
      ],
      [
        "When you visit this website",
        "The landing page does not use advertising trackers, analytics scripts, third-party fonts, tracking cookies, or persistent browser storage. The rink, example tool responses, and score run in your browser; playing does not connect to X or publish anything. Our hosting infrastructure may process standard request information such as IP address, requested URL, browser information, and timestamps to deliver and protect the website.",
      ],
      [
        "When you connect an X account",
        "A configured hosted service uses X OAuth 2.0 with PKCE. You authorize access on X; we do not ask for your X password. The server receives your X user ID, username, display name, access token, refresh token when issued, token expiry, and connection date. It creates a tweet.stream API key to authenticate your requests. The requested scopes are tweet.read, tweet.write, users.read, and offline.access.",
      ],
      [
        "How the service uses information",
        "The hosted server uses credentials to authenticate requests, refresh access when permitted, and carry out API or MCP calls you or your authorized client initiate. Requests can include post text, replies, post identifiers, search queries, and requested timeline data. Relevant information is sent to X to fulfill the request and the result is returned to the requesting client. We do not sell personal information or use it for advertising.",
      ],
      [
        "AI clients and other recipients",
        "If you connect an AI application, information returned by tools may be processed by that application and its model providers under their own terms. Only connect clients you trust. X processes information under its own privacy policy. Infrastructure providers process information needed to operate the service. We may disclose information when legally required or necessary to investigate abuse, protect users, or defend legal rights.",
      ],
      [
        "Storage and retention",
        "The current open-source server persists connected-account credentials and profile fields in an operator-controlled token-store file. Its default implementation does not provide automatic expiry-based deletion of stored sessions. Records remain until removed by the operator or replaced on reconnection. The landing page does not collect or store these credentials. Request bodies are processed to fulfill calls; infrastructure logs and any copies retained by your AI client are managed separately by their operators.",
      ],
      [
        "Disconnecting and deletion",
        "You can revoke tweet.stream in X’s Settings → Security and account access → Apps and sessions → Connected apps. Revoking access stops future authorized X calls but does not itself remove an existing token-store record or delete posts already published to X. To request deletion of a hosted account record, contact the maintainer through the contact page. For a self-hosted instance, ask its operator to remove your record and associated copies. Manage published posts directly on X. Never include API keys, tokens, or private account information in a public issue.",
      ],
      [
        "Your choices and rights",
        "Depending on where you live, you may have rights to access, correct, delete, or obtain a copy of your information, object to processing, restrict processing, withdraw consent, or complain to your local privacy authority. Contact us to make a request; we may need to verify control of the relevant account. Where applicable, we process information to provide a requested service, with your authorization, for legitimate interests in security and operations, or to meet legal obligations.",
      ],
      [
        "Security and international processing",
        "Treat API keys and OAuth credentials as passwords. We cannot guarantee absolute security. Information may be processed where our hosting providers, X, or your selected AI client operate, including outside your country. Self-hosters choose their own storage location and must protect token files, logs, backups, and network access.",
      ],
      [
        "Children and changes",
        "The service is not intended for children under 13 or anyone below the minimum age required by X and local law. Contact us if you believe a child has provided personal information. We may update this policy when the service changes; the effective date below identifies the latest revision. Material changes will be described on this page.",
      ],
    ],
  },
  tos: {
    eyebrow: "THE RULEBOOK / 02",
    title: "Terms of service.",
    intro:
      "A fair game starts with clear rules. Here’s what using tweet.stream means.",
    sections: [
      [
        "Agreement and scope",
        "These terms apply to the tweet.stream website and hosted services operated by Vartabase AI. By using the service, you agree to these terms and acknowledge the privacy policy. If you do not agree, do not use the service. You must have authority to act for any account or organization you connect and meet applicable age requirements.",
      ],
      [
        "What the service does",
        "tweet.stream provides an interface between authorized clients and the X API, including MCP tools for posting, replying, retrieving posts, reading a timeline, searching, and inspecting an account profile. The interactive rink is a local demonstration: its shots, scores, and example responses do not perform X actions. Hosted access requires a configured service and valid authorization.",
      ],
      [
        "Your account and agent actions",
        "You are responsible for protecting your keys, choosing trustworthy clients, and reviewing the instructions and permissions you give an AI agent. Tool calls can publish content to your real X account. The server does not guarantee that an AI client will ask for confirmation before every action. You are responsible for actions you authorize and for promptly revoking compromised credentials.",
      ],
      [
        "Acceptable use",
        "Use the service lawfully and follow the X Terms of Service, Developer Agreement, Developer Policy, and automation rules applicable to your use. Do not use it for spam, deceptive impersonation, abusive automation, privacy violations, harassment, unauthorized surveillance, credential theft, or attempts to evade platform restrictions. Do not interfere with the service or access another person’s account without permission.",
      ],
      [
        "Content and permissions",
        "You retain rights you hold in the content you submit. You authorize us to process and transmit that content only as needed to provide your requested service. You must have the rights and permissions required for your content and use of third-party information. AI-generated content may be inaccurate; you are responsible for checking it before publication. X content remains subject to X’s rules and the rights of its owners.",
      ],
      [
        "Third-party access and costs",
        "X controls API availability, permissions, usage charges, and rate limits. Particular tools may require additional X access. Open-source software does not make X API access free or guarantee eligibility. Your AI client, hosting provider, and other third-party services may have their own fees and terms. This website does not currently accept payments or sell subscriptions. Any future paid offering will state its price and payment terms before purchase.",
      ],
      [
        "Open-source license and branding",
        "The core tweet.stream API and MCP server is designated Apache-2.0. Use, modification, and distribution of that code are governed by the license distributed with the core repository. These website terms do not replace or restrict rights granted by that license. The landing-page design, bird identity, and other branding are separate from the core software license unless expressly stated otherwise. tweet.stream is independent and is not affiliated with or endorsed by X Corp.",
      ],
      [
        "Availability and changes",
        "The service may change, be unavailable, or be discontinued. We do not promise uninterrupted access, specific performance, permanent storage, or continued compatibility with third-party APIs. We may suspend access when necessary to address misuse, security incidents, legal requirements, or third-party restrictions. You may stop using the service and revoke access at any time.",
      ],
      [
        "Disclaimers and liability",
        "To the extent permitted by applicable law, the service is provided “as is” and “as available,” without warranties of merchantability, fitness for a particular purpose, or non-infringement. To the extent permitted by law, we are not liable for indirect or consequential loss, lost profits, lost data, or damage arising from third-party services, agent actions, or service interruptions. Nothing in these terms excludes liability or consumer rights that cannot lawfully be excluded.",
      ],
      [
        "Updates and contact",
        "We may revise these terms and will update the effective date. Material changes will be described on this page. Continued use after revised terms take effect constitutes acceptance where permitted by law. Contact the maintainer using the contact page for questions about these terms or the service. Applicable mandatory consumer protections continue to apply.",
      ],
    ],
  },
};

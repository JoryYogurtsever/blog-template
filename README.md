This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
(npm run start will run on 3001 because I have several projects on my server)

You will need to create a file named ".env.local" it should contain the following parameters

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
# NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_SIGNING_SECRET=
MONGODB_URI=
FIREBASE_API=
URL=
# URL can be set to localhost in the development environment and the live url in production
# NEXT_PUBLIC_BASE_URL should be the production url. It is used for sitemap generation
NEXT_PUBLIC_BASE_URL=
UMAMI_CODE_SOURCE=
UMAMI_WEBSITE_ID=
MAILERLITE_API=

You will need to create accounts in:
1) Clerk: For admin user management, so your team can create posts
2) mongodb: The database used for this project
3) Firebase: For image storage and serving
4) Umami: For site analytics
5) Mailerlite: Autoresponder used for collecting adresses and sending emails.

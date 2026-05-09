# Awaaz
<<<<<<< HEAD

A modern full-stack anonymous emotional sharing platform designed as a calm, non-judgmental safe space.

## Core Experience

- No login, signup, or profiles.
- Anonymous posting up to 500 characters.
- Public feed with real-time updates.
- Support reactions and supportive comments.
- Comment moderation against abusive and toxic language.
- Emergency support prompt with Indian helpline for high-risk expressions.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Framer Motion + Socket.IO client
- Backend: Node.js + Express + MongoDB + Mongoose + Socket.IO
- Deployment ready: `render.yaml`

## Project Structure

```text
Awaaz/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── .env.example
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── .env.example
├── package.json
└── render.yaml
```

## Environment Setup

1. Copy env templates:
   - `server/.env.example` -> `server/.env`
   - `client/.env.example` -> `client/.env`
2. Set `MONGODB_URI` to your MongoDB connection string.

## Install & Run

From project root:

```bash
npm install
npm install --workspace client
npm install --workspace server
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## API Routes

Base URL: `/api/posts`

- `GET /` - list anonymous posts with comments
- `POST /` - create anonymous post
- `PATCH /:id/like` - add support reaction
- `POST /:id/comments` - add supportive comment (moderated)

## MongoDB Models

### Post

- `id`
- `content`
- `createdAt`
- `likes`

### Comment

- `id`
- `postId`
- `content`
- `createdAt`

## Moderation

`server/src/utils/moderation.js` blocks common abusive/bullying phrases and rejects toxic comments.

## Emergency Support

When users write distress terms (suicide/self-harm/depression patterns), frontend shows:

> You matter. Please talk to someone. Help is available.  
> Kiran Helpline: 1800-599-0019
=======
Awaaz is an anonymous emotional sharing platform where people can freely express their thoughts, stress, and feelings without revealing their identity. It provides a safe and supportive space for users to connect through positive interactions and emotional support in a calm, non-judgmental environment.
>>>>>>> f6a5a5c023105a2594eb3c356f028e4d1b8bb8ed

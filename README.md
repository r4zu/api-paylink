# API Pay Link

## Development

1. Clone the repository

```
git clone https://github.com/r4zu/api-paylink.git
```

2. Install dependencies

```
pnpm install
```

3. Create a `.env` file based on the `.env.template`

4. Start the database

```
pnpm compose:up
```

5. Run Prisma migration

```
npx prisma migrate dev
```

6. Run the application

```
pnpm dev

open http://localhost:3000
```

Stop the database

```
pnpm compose:down
```

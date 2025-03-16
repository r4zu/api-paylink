# API Pay Link

## Development Setup

Follow these steps to set up the development environment:

1. **Clone the repository:**

```sh
git clone https://github.com/r4zu/api-paylink.git
```

2. **Navigate to the project directory:**

```sh
cd api-paylink
```

3. **Install dependencies:**

```sh
pnpm install
```

4. **Create a `.env` file based on the `.env.template`:**

```sh
cp .env.template .env
```

5. **Start the database:**

```sh
pnpm compose:up
```

6. **Run Prisma migration:**

```sh
npx prisma migrate dev
```

7. **Run the application:**

```sh
pnpm dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

8. **Stop the database:**

```sh
pnpm compose:down
```

## Additional Information

- Ensure you have `pnpm` installed globally. If not, you can install it using:

  ```sh
  npm install -g pnpm
  ```

- For any issues or contributions, please refer to the [GitHub repository](https://github.com/r4zu/api-paylink).

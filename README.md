# Next.js Project with Template Prompt - README

This is a [Next.js](https://nextjs.org/) project that has been initialized with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To get started with the project, you need to run the development server by executing the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open with your browser to see the result.
After running the development server, you can open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

## How to Use the Project

The project has a page named `/prompt` that contains the settings of the template. In this page, you can set up the following:

- **Template Prompt**: In this field, you can specify the text that you want to include in all of your prompt requests. The field should include the following placeholders:
  - `{{input}}`: This will be replaced by the `prompt input` from the home `/` page.
  - `{{pattern}}`: This will be replaced by the `Pattern Prompt` field.
  - `{{context}}`: This will be replaced by the `Context Prompt` field.

By setting up the text that will not change, you can focus solely on the `prompt input` in the home `/` page and save time.

**Context Prompt**: In this field, you can put your context text.

**Pattern Prompt**: This is the pattern that ChatGPT should learn from to generate the response.

**The website uses local storage to save the chat list and the template settings.**

We hope that you find this project useful and enjoy using it!

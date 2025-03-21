# PNCEL's Group Website

## For Group Members

If you wish to add personalized contents to your own page, contact Ang for your member ID. Once you have the member ID, create an [MDX](https://mdxjs.com/) (Markdown w/ embedded JSX) file under [`src/app/team/\[memberId\]`](https://github.com/pncel/pncel.github.io/tree/main/src/app/team/%5BmemberId%5D) with your member ID (i.e., `[memberId].mdx`). Edit the file as you wish, then create a PR/branch and ask Ang to merge it into the main branch.

The website also supports links to your other personal pages, including: your own website, Google Scholar, OrcID, GitHub, LinkedIn, X (formerly Twitter), Facebook, Instagram, Youtube. In addition, a short statement can be shown at the team page.

Once we have more publications (or you're welcome to add your pre-UW publications, too!), there is also support to add publications to your own page. Project cards, blogs, news are also planned and will be added some time in the future.

## Tech Stack

- [Next.js](https://nextjs.org)
- [Prisma ORM](https://www.prisma.io/) with [SQLite](https://www.sqlite.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

# For developers

## Installation

```bash
# install nvm
#   from scratch & locally:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
# follow prompt to restart terminal or source NVM into your path

# install dependencies
nvm install stable
nvm use stable
npm install -D .   # in this repo's root directory
```

## Development

#### Enter dev environment

```bash
# w/ NVM (NodeJS Version Management)
nvm use stable
```

#### **BEFORE COMMIT**

```bash
npm run lint
# fix any reported errors

npm run format
```

#### Edit database using web GUI (no changes made to [`/prisma/schema.prisma`](/prisma/schema.prisma))

```bash
npx prisma studio
# then visit http://localhost:5555 (or another port according to the command line output)
```

#### Live server

```bash
npm run dev
# then visit http://localhost:3000 (or another port according to the command line output)
```

#### New blog

```bash
npm run blog "Your title here"
# creates /src/app/blogs/[blogId]/your-title-here-YYYY-MM-DD.mdx if the file does not already exists
```

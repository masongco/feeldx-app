# FEEL DX Room Designer

**Author:** Mark Allen Songco — [markallensongco@gmail.com](mailto:markallensongco@gmail.com)

## Project overview

A lightweight room design prototype. Select a room type, choose materials and furniture from curated options, and generate a rule-based AI summary covering cost implications, design compatibility, and recommendations.

No backend or external APIs — the AI summary is rule-based logic that runs entirely in the browser.

## Technologies used

- [Next.js 16](https://nextjs.org) — React framework (App Router)
- [React 19](https://react.dev) — UI library
- [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- TypeScript — type safety throughout

## Setup instructions

Requires Node.js 20.9 or later.

```bash
git clone https://github.com/masongco/feeldx-app
cd feeldx-app
npm install
```

## How to run the application locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Assumptions

- One item is selectable per category (e.g. one flooring choice, one lighting choice)
- Switching rooms clears all current selections
- The AI summary clears whenever a selection changes — click Generate again to refresh it
- No persistence — selections reset on page refresh
- Cost levels (budget / mid / premium) are qualitative, not dollar figures

## Testing instructions

No automated test suite is included. To verify the application manually:

**Room selection**
- Click each of the 5 room types and confirm the material categories update accordingly
- Confirm all selections clear when switching rooms

**Material selection**
- Select an item in any category — confirm it highlights with a checkmark
- Click the same item again — confirm it deselects
- Use the Clear button next to a category label — confirm it deselects without affecting other categories

**Selections summary**
- Confirm each selected item appears correctly in the summary panel
- Confirm the progress bar fills as more categories are completed
- Confirm "Complete" appears when all categories are filled

**AI summary**
- Confirm the Generate button is disabled with no selections
- Select only dark flooring and dark wall finish — confirm the dark room warning appears
- Select any marble item — confirm the maintenance cost note appears
- Leave lighting unselected — confirm the lighting recommendation appears
- Select all premium items — confirm the high budget recommendation appears
- Change any selection after generating — confirm the summary clears

## Limitations and improvements

- AI summary is rule-based, not a real language model
- No cost calculator — budget level is qualitative only
- No image previews for materials or finishes
- No save, export, or share functionality
- Mobile layout stacks summary below the picker — a slide-up drawer would improve the mobile experience
- Room and material options are hardcoded — a CMS or database would allow non-technical editing

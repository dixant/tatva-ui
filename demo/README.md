# Tatva UI — Demo

A live demo of Tatva UI showing a User Management Dashboard built with only Tatva components.

## Run

From this `demo/` folder:

```bash
# First build the main library so the `file:..` dependency resolves:
cd ..
npm install
npm run build

# Then run the demo:
cd demo
npm install
npm run dev
```

Then open http://localhost:5173.

## What it demonstrates

- `ThemeProvider` with a working light/dark `Toggle`
- `Avatar` + `Typography` + `Breadcrumb` in the header
- `SearchInput` with debounced filter
- `Tabs` for Active / Archived users
- `DataTable` (flagship) with sorting, selection, pagination, custom cell renderers, and empty state
- `Modal` with a form (`Input`, `Select`, `Checkbox`) and validation via `Toast`
- `Alert` reacting to selection changes
- `Badge` role chips inside table cells

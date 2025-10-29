# Q4 AI Design Kanban

A clean, modern Kanban board for tracking design workflow and cataloging design jobs. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📋 **6 Workflow Columns**: Backlog → In Progress → Dev and UX Input → Iterating → User Testing Needed → Ready For Handoff
- 🎯 **Problem-Solution Cards**: Each card captures a design problem and proposed solution
- 🔗 **External Links**: Link directly to Figma designs and live prototypes
- 🖱️ **Drag & Drop**: Move cards between columns with intuitive drag-and-drop
- 📱 **Responsive**: Clean white design matching the Copado AI prototype style
- 🔍 **Detail View**: Click any card to see full details, edit, or delete
- 🤝 **Shareable**: Share board with team members (UI ready, backend TBD)

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage

### Adding a Card
1. Click "+ Add Card" in any column
2. Enter the "Problem to Solve" (title)
3. Enter the "Proposed Solution" (description)
4. Click "Add Card"

### Moving Cards
- Drag any card and drop it into a different column
- Cards automatically update their status

### Viewing Details
- Click on any card to see full details
- Add Figma and prototype links
- Edit all card information
- Delete cards when no longer needed

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for blazing-fast development
- **Tailwind CSS** for styling
- **Drag & Drop API** for native browser interactions

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx    # Main board container
│   ├── KanbanColumn.tsx   # Individual column
│   ├── KanbanCard.tsx     # Card component with detail modal
│   └── TopNav.tsx         # Navigation bar
├── types.ts               # TypeScript interfaces
├── App.tsx                # Root component
└── main.tsx              # Entry point
```

## Related Projects

- [Copado AI Prototype](https://github.com/Megan-SituationBear/Mego-Proto-Experiments) - The main AI-powered prototype that this Kanban board helps track and organize.

## Development

This board is designed to work alongside the Copado AI prototype, providing a centralized place to:
- Track design iterations
- Coordinate with developers
- Manage user testing cycles
- Prepare designs for handoff

## License

MIT

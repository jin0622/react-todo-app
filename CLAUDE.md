# CLAUDE.md - React Todo App

## Project Overview

This is a React-based Todo application. This document serves as a guide for AI assistants (like Claude) working on this codebase, providing context about the project structure, development workflows, and key conventions.

## Repository Status

**Current State**: This is a new/empty repository ready for initial development.

**Project Type**: React Todo Application

## Expected Tech Stack

Based on the project name and modern React development practices, this project will likely use:

- **React**: Core UI library (likely React 18+)
- **JavaScript/TypeScript**: Primary language (TS preferred for type safety)
- **Build Tool**: Vite, Create React App, or Next.js
- **Styling**: CSS Modules, Styled Components, Tailwind CSS, or plain CSS
- **State Management**: React Context API, useState/useReducer, or Redux/Zustand
- **Testing**: Jest, React Testing Library, Vitest
- **Linting**: ESLint with React plugins
- **Formatting**: Prettier

## Anticipated Project Structure

```
react-todo-app/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── favicon.ico        # App icon
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── TodoList.jsx   # Main todo list component
│   │   ├── TodoItem.jsx   # Individual todo item
│   │   ├── AddTodo.jsx    # Form to add new todos
│   │   └── Filter.jsx     # Filter controls (all/active/completed)
│   ├── hooks/             # Custom React hooks
│   │   └── useTodos.js    # Todo state management logic
│   ├── utils/             # Utility functions
│   │   └── storage.js     # LocalStorage operations
│   ├── styles/            # Styling files
│   │   └── App.css        # Global styles
│   ├── App.jsx            # Main app component
│   └── index.jsx          # Entry point
├── tests/                 # Test files (if not co-located)
├── package.json           # Dependencies and scripts
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── CLAUDE.md             # This file
```

## Development Workflows

### Initial Setup

When setting up the project for the first time:

1. **Initialize the React app** using a build tool:
   ```bash
   npm create vite@latest . -- --template react
   # or
   npx create-react-app .
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   npm start
   ```

### Daily Development Workflow

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Create feature branch** (if not already on one):
   ```bash
   git checkout -b feature/feature-name
   ```

3. **Make changes** and test locally

4. **Run tests** before committing:
   ```bash
   npm test
   ```

5. **Lint code**:
   ```bash
   npm run lint
   ```

6. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

7. **Push to remote**:
   ```bash
   git push -u origin branch-name
   ```

### Building for Production

```bash
npm run build
```

## Key Conventions for AI Assistants

### Code Style

1. **Component Structure**:
   - Use functional components with hooks
   - Keep components small and focused (Single Responsibility Principle)
   - Co-locate related files (component + styles + tests)

2. **Naming Conventions**:
   - **Components**: PascalCase (e.g., `TodoList.jsx`, `AddTodo.jsx`)
   - **Files**: Match component name
   - **Functions**: camelCase (e.g., `addTodo`, `removeTodo`)
   - **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TODO_LENGTH`)
   - **CSS classes**: kebab-case or follow project's CSS methodology

3. **File Organization**:
   - Group by feature, not by type (when project grows)
   - Keep related logic together
   - Use index files for cleaner imports when appropriate

### React Best Practices

1. **State Management**:
   - Start with local state (useState)
   - Lift state up when needed
   - Use Context for deeply nested prop drilling
   - Consider useReducer for complex state logic

2. **Props**:
   - Destructure props for clarity
   - Use PropTypes or TypeScript for type checking
   - Keep prop drilling to maximum 2-3 levels

3. **Side Effects**:
   - Use useEffect for side effects
   - Always specify dependencies array
   - Clean up effects when necessary (return cleanup function)

4. **Performance**:
   - Use React.memo() sparingly, only when needed
   - Memoize expensive calculations with useMemo
   - Memoize callbacks with useCallback when passing to memoized children

### Todo App Specific Conventions

1. **Todo Data Structure**:
   ```javascript
   {
     id: string | number,        // Unique identifier (UUID or timestamp)
     text: string,                // Todo description
     completed: boolean,          // Completion status
     createdAt: Date | string,   // Creation timestamp
     updatedAt?: Date | string   // Last update timestamp (optional)
   }
   ```

2. **Core Features to Implement**:
   - Add new todos
   - Mark todos as complete/incomplete
   - Delete todos
   - Edit existing todos
   - Filter todos (all/active/completed)
   - Clear completed todos
   - Persist to localStorage
   - Display todo count

3. **Data Persistence**:
   - Use localStorage for persistence
   - Save on every change
   - Load on app initialization
   - Handle JSON parsing errors gracefully

### Git Conventions

1. **Branch Naming**:
   - Feature: `feature/description` or `feat/description`
   - Bug fix: `fix/description` or `bugfix/description`
   - Claude AI branches: `claude/session-id` (auto-generated)

2. **Commit Messages** (Conventional Commits):
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, no logic change)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

   Example: `feat: add filter functionality for todos`

3. **Pull Requests**:
   - Provide clear description of changes
   - Reference any related issues
   - Ensure tests pass before requesting review

### Testing Guidelines

1. **What to Test**:
   - Component rendering
   - User interactions (clicking, typing)
   - State changes
   - Edge cases and error handling
   - Accessibility

2. **Testing Structure**:
   ```javascript
   describe('TodoItem', () => {
     it('should render todo text', () => {
       // Test implementation
     });

     it('should call onToggle when checkbox is clicked', () => {
       // Test implementation
     });
   });
   ```

3. **Test File Naming**:
   - Co-locate with component: `TodoItem.test.jsx`
   - Or in separate test directory: `tests/TodoItem.test.jsx`

### Accessibility (a11y)

1. **Semantic HTML**:
   - Use proper HTML elements (`<button>`, `<input>`, `<label>`)
   - Avoid `<div>` for interactive elements

2. **ARIA Attributes**:
   - Add aria-label for icon buttons
   - Use aria-checked for custom checkboxes
   - Include aria-live regions for dynamic updates

3. **Keyboard Navigation**:
   - Ensure all interactive elements are keyboard accessible
   - Logical tab order
   - Enter/Space to activate buttons

### Error Handling

1. **User Input Validation**:
   - Don't allow empty todos
   - Trim whitespace
   - Consider max length limits

2. **localStorage Errors**:
   - Wrap in try-catch blocks
   - Provide fallback if localStorage is unavailable
   - Handle quota exceeded errors

3. **Graceful Degradation**:
   - App should work even if localStorage fails
   - Show user-friendly error messages

## Working with AI Assistants

### When Making Changes

1. **Always read files before modifying them**
2. **Understand the existing patterns** before adding new code
3. **Maintain consistency** with the existing code style
4. **Don't over-engineer** - keep solutions simple
5. **Write tests** for new functionality
6. **Update documentation** when adding features

### Before Committing

1. **Verify the app runs**: `npm run dev` or `npm start`
2. **Run tests**: `npm test`
3. **Check for linting errors**: `npm run lint`
4. **Test in browser** - actually use the app
5. **Review changes**: `git diff`

### When Stuck

1. Check package.json for available scripts
2. Look for existing similar components or patterns
3. Check console for errors
4. Review React DevTools for component hierarchy and state
5. Check browser DevTools for network/storage issues

## Common Tasks

### Adding a New Feature

1. Create new component file in `src/components/`
2. Write component logic and JSX
3. Add styling
4. Import and use in parent component
5. Write tests
6. Update this documentation if needed

### Fixing a Bug

1. Reproduce the bug
2. Locate the problematic code
3. Write a test that exposes the bug (TDD approach)
4. Fix the bug
5. Verify test passes
6. Verify app works correctly

### Refactoring

1. Ensure tests exist and pass
2. Make refactoring changes
3. Verify all tests still pass
4. Verify app behavior unchanged
5. Update any affected documentation

## Performance Considerations

1. **Optimize re-renders**:
   - Don't create functions/objects in render
   - Memoize when passing to optimized children
   - Use key prop correctly in lists

2. **List Virtualization**:
   - Consider for 100+ todos
   - Use libraries like react-window

3. **Bundle Size**:
   - Monitor with build analyzer
   - Lazy load components if needed
   - Tree-shake unused dependencies

## Security Considerations

1. **XSS Prevention**:
   - React escapes by default - don't use dangerouslySetInnerHTML
   - Sanitize any user input if needed

2. **Dependencies**:
   - Keep dependencies updated
   - Run `npm audit` regularly
   - Review security advisories

## Future Enhancements

Potential features to consider:

- Due dates and reminders
- Categories/tags for todos
- Priority levels
- Search functionality
- Drag and drop reordering
- Recurring todos
- Export/import functionality
- Cloud sync (requires backend)
- Collaboration features (requires backend)
- Dark mode
- Mobile responsiveness
- PWA support for offline usage

## Additional Resources

- [React Documentation](https://react.dev)
- [React Testing Library](https://testing-library.com/react)
- [JavaScript Best Practices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Questions or Issues?

When working on this project:
- Check existing issues in the repository
- Review this document for conventions
- Look at existing code for patterns
- Ask for clarification when assumptions are unclear

---

**Last Updated**: 2026-01-19
**Status**: Initial documentation for new repository

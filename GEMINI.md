# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use Google code style (e.g., spaces instead of tabs)
- Destructure imports when possible (eg. import { foo } from 'bar')
- Do not use stylized quotes, use standard single or double quotes, even in comments

# Workflow
- Be sure to typecheck when your're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
- All changes require unit tests:
  - Write the unit test first.
  - We will review the unit test and run it to confirm it fails.
  - Then we will make the code changes to adhere to the unit test.
  - Do not change the unit tests to make tests pass without prior review.

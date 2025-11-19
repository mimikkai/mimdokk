# Tasks: Modernize Project Structure

- [ ] **Update Dependencies** <!-- id: 0 -->
    - Remove `tsx` from `devDependencies`.
    - Ensure `typescript` remains for IDE support (LSP).

- [ ] **Remove Configuration** <!-- id: 1 -->
    - Delete `tsconfig.json`.

- [ ] **Update Scripts** <!-- id: 2 -->
    - Update `package.json` scripts (`start`) to use `node bin/mimdokk.ts`.
    - Update `bin` entry in `package.json` if necessary (though `bin` usually points to a file, the shebang might need checking).

- [ ] **Verify Execution** <!-- id: 3 -->
    - Run `npm start` (or equivalent) to verify the application starts correctly with Node.js 25.

# PharmaTech API's SDK

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 20 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/PharmaTechVe/pharmatech-sdk.git
   cd pharmatech-sdk
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Running the project

- To build the project, run:

  ```sh
  npm run build
  ```

  This will compile the TypeScript files and generate the output in the dist directory.

- To prepare husky, run:

  ```sh
  npm run prepare
  ```

  This will prepare huksy as git hooks for commits and push

- To format the project, run:

  ```sh
  npm run format
  ```

- To test the project, run:

  ```sh
  npm run test
  ```

### Continuous Integration

The project uses GitHub Actions for continuous integration. The workflows are defined in the workflows directory.

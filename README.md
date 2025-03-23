# PharmaTech API's SDK

The PharmaTech SDK provides a set of services to interact with the PharmaTech API. It includes support for authentication, managing entities like countries, states, cities, branches, categories, manufacturers, and more.

---

## Using the SDK

### Installation

```sh
   npm install @pharmatech/sdk
```

### `PharmaTech` Class

The `PharmaTech` class is the main entry point for interacting with the SDK. It provides access to various services for managing entities.

#### Singleton Pattern

The `PharmaTech` class uses the Singleton pattern. Use the `getInstance` method to get the single instance of the class.

```typescript
import { PharmaTech } from '@pharmatech/sdk'

const pharmaTech = PharmaTech.getInstance(true) // Pass `true` for development mode
```

#### Services

The `PharmaTech` class provides the following services:

1. **`auth` (AuthService)**:

   - Methods:
     - `login(email: string, password: string): Promise<LoginResponse>`
     - `signUp(signUpData: SignUpRequest): Promise<SignUpResponse>`
     - `updatePassword(currentPassword: string, newPassword: string): Promise<void>`

2. **`country` (CountryService)**:

   - Methods:
     - `getById(id: string): Promise<CountryResponse>`
     - `findAll(page: number, limit: number): Promise<Pagination<CountryResponse>>`
     - `create(country: Country): Promise<CountryResponse>`
     - `update(id: string, partialCountry: Partial<Country>): Promise<CountryResponse>`
     - `delete(id: string): Promise<void>`

3. **`state` (StateService)**:

   - Methods:
     - `getById(id: string): Promise<StateResponse>`
     - `findAll(page: number, limit: number, countryId?: string): Promise<Pagination<StateResponse>>`
     - `create(state: State): Promise<StateResponse>`
     - `update(id: string, partialState: Partial<State>): Promise<StateResponse>`
     - `delete(id: string): Promise<void>`

4. **`city` (CityService)**:

   - Methods:
     - `getById(id: string): Promise<CityResponse>`
     - `findAll(page: number, limit: number, stateId?: string): Promise<Pagination<CityResponse>>`
     - `create(city: City): Promise<CityResponse>`
     - `update(id: string, partialCity: Partial<City>): Promise<CityResponse>`
     - `delete(id: string): Promise<void>`

5. **`branch` (BranchService)**:

   - Methods:
     - `getById(id: string): Promise<BranchResponse>`
     - `findAll(page: number, limit: number): Promise<Pagination<BranchResponse>>`
     - `create(branch: CreateBranchRequest): Promise<BranchResponse>`
     - `update(id: string, partialBranch: Partial<Branch>): Promise<BranchResponse>`
     - `delete(id: string): Promise<void>`

6. **`category` (CategoryService)**:

   - Methods:
     - `getById(id: string): Promise<CategoryResponse>`
     - `findAll(page: number, limit: number): Promise<Pagination<CategoryResponse>>`
     - `create(category: Category): Promise<CategoryResponse>`
     - `update(id: string, partialCategory: Partial<Category>): Promise<CategoryResponse>`
     - `delete(id: string): Promise<void>`

7. **`manufacturer` (ManufacturerService)**:

   - Methods:
     - `getById(id: string): Promise<ManufacturerResponse>`
     - `findAll(page: number, limit: number): Promise<Pagination<ManufacturerResponse>>`
     - `create(manufacturer: CreateManufacturerRequest): Promise<ManufacturerResponse>`
     - `update(id: string, partialManufacturer: Partial<Manufacturer>): Promise<ManufacturerResponse>`
     - `delete(id: string): Promise<void>`

8. **`product` (ProductService)**:
   - Methods:
     - `getById(id: string): Promise<ProductResponse>`
     - `findAll(page: number, limit: number): Promise<Pagination<ProductResponse>>`
     - `create(product: Product): Promise<ProductResponse>`
     - `update(id: string, partialProduct: Partial<Product>): Promise<ProductResponse>`
     - `delete(id: string): Promise<void>`

---

## Custom Errors

The SDK provides custom error handling for API requests. Errors are thrown with meaningful messages to help identify issues.

### Example Error Handling

```typescript
try {
  const pharmaTech = PharmaTech.getInstance(true)
  const country = await pharmaTech.country.getById('invalid-id')
} catch (error) {
  console.error(error.message) // Outputs a meaningful error message
}
```

---

### Contribute

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

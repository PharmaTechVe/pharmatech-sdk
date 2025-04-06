# PharmaTech API's SDK

The PharmaTech SDK provides a set of services to interact with the PharmaTech API. It includes support for authentication, managing entities like countries, states, cities, branches, categories, manufacturers, generic products, presentations, and more.

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

---

## Services

The `PharmaTech` class provides the following services:

---

### 1. **`auth` (AuthService)**

Handles user authentication.

#### Methods:

- **`login(email: string, password: string): Promise<LoginResponse>`**

  - Logs in a user and returns an access token.
  - **Example**:
    ```typescript
    const loginResponse = await pharmaTech.auth.login(
      'user@example.com',
      'password123',
    )
    console.log(loginResponse.accessToken)
    ```
  - **Parameters**:
    - `email`: User's email.
    - `password`: User's password.
  - **Returns**: `Promise<LoginResponse>` containing the access token.

- **`signUp(signUpData: SignUpRequest): Promise<SignUpResponse>`**

  - Registers a new user.
  - **Example**:
    ```typescript
    const signUpResponse = await pharmaTech.auth.signUp({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'securePassword123',
      documentId: '123456789',
      birthDate: '1990-01-01',
    })
    console.log(signUpResponse.id)
    ```
  - **Parameters**:
    - `signUpData`: Object containing user details.
  - **Returns**: `Promise<SignUpResponse>` containing the created user details.

- **`updateCurrentPassword(currentPassword: string, newPassword: string, jwt: string): Promise<void>`**
  - Updates the user's password.
  - **Example**:
    ```typescript
    await pharmaTech.auth.updateCurrentPassword(
      'oldPassword123',
      'newPassword456',
      'jwt',
    )
    console.log('Password updated successfully')
    ```
  - **Parameters**:
    - `currentPassword`: Current password.
    - `newPassword`: New password.
  - **Returns**: `Promise<void>`.

---

### 2. **`country` (CountryService)**

Manages countries.

#### Methods:

- **`getById(id: string): Promise<CountryResponse>`**

  - Fetches a country by its ID.
  - **Example**:
    ```typescript
    const country = await pharmaTech.country.getById('country-id')
    console.log(country.name)
    ```
  - **Parameters**:
    - `id`: Country ID.
  - **Returns**: `Promise<CountryResponse>` containing country details.

- **`findAll(page: number, limit: number): Promise<Pagination<CountryResponse>>`**

  - Retrieves a paginated list of countries.
  - **Example**:
    ```typescript
    const countries = await pharmaTech.country.findAll(1, 10)
    console.log(countries.results)
    ```
  - **Parameters**:
    - `page`: Page number.
    - `limit`: Number of items per page.
  - **Returns**: `Promise<Pagination<CountryResponse>>`.

- **`create(country: Country): Promise<CountryResponse>`**

  - Creates a new country.
  - **Example**:
    ```typescript
    const newCountry = await pharmaTech.country.create({
      name: 'New Country',
      code: 'NC',
    })
    console.log(newCountry.id)
    ```
  - **Parameters**:
    - `country`: Object containing country details.
  - **Returns**: `Promise<CountryResponse>`.

- **`update(id: string, partialCountry: Partial<Country>): Promise<CountryResponse>`**

  - Updates a country partially by its ID.
  - **Example**:
    ```typescript
    const updatedCountry = await pharmaTech.country.update('country-id', {
      name: 'Updated Country',
    })
    console.log(updatedCountry.name)
    ```
  - **Parameters**:
    - `id`: Country ID.
    - `partialCountry`: Partial object containing updated fields.
  - **Returns**: `Promise<CountryResponse>`.

- **`delete(id: string): Promise<void>`**
  - Deletes a country by its ID.
  - **Example**:
    ```typescript
    await pharmaTech.country.delete('country-id')
    console.log('Country deleted')
    ```
  - **Parameters**:
    - `id`: Country ID.
  - **Returns**: `Promise<void>`.

---

### 3. **`state` (StateService)**

Manages states.

#### Methods:

- **`getById(id: string): Promise<StateResponse>`**

  - Fetches a state by its ID.
  - **Example**:
    ```typescript
    const state = await pharmaTech.state.getById('state-id')
    console.log(state.name)
    ```
  - **Parameters**:
    - `id`: State ID.
  - **Returns**: `Promise<StateResponse>`.

- **`findAll(page: number, limit: number, countryId?: string): Promise<Pagination<StateResponse>>`**
  - Retrieves a paginated list of states, optionally filtered by country ID.
  - **Example**:
    ```typescript
    const states = await pharmaTech.state.findAll(1, 10, 'country-id')
    console.log(states.results)
    ```
  - **Parameters**:
    - `page`: Page number.
    - `limit`: Number of items per page.
    - `countryId`: (Optional) Country ID to filter states.
  - **Returns**: `Promise<Pagination<StateResponse>>`.

---

### 4. **`genericProduct` (GenericProductService)**

Manages generic products.

#### Methods:

- **`getById(id: string): Promise<ResponseGenericProduct>`**

  - Fetches a generic product by its ID.
  - **Example**:
    ```typescript
    const product = await pharmaTech.genericProduct.getById('product-id')
    console.log(product.name)
    ```
  - **Parameters**:
    - `id`: Generic product ID.
  - **Returns**: `Promise<ResponseGenericProduct>`.

- **`findAll(page: number, limit: number): Promise<Pagination<ResponseGenericProduct>>`**
  - Retrieves a paginated list of generic products.
  - **Example**:
    ```typescript
    const products = await pharmaTech.genericProduct.findAll(1, 10)
    console.log(products.results)
    ```
  - **Parameters**:
    - `page`: Page number.
    - `limit`: Number of items per page.
  - **Returns**: `Promise<Pagination<ResponseGenericProduct>>`.

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

# API Endpoints Used in Frontend

**Base URL:** `https://192.168.56.1:7035`

## Current Endpoints:

1. **Authentication:**
   - `POST /auth/login` - User login
   - `POST /auth/register` - User registration

2. **Test:**
   - `GET /test` - Test connection

3. **Dashboard:**
   - `GET /dashboard` - Get dashboard data

4. **Products:**
   - `GET /products` - Get all products
   - `POST /products` - Create product
   - `PUT /products/:id` - Update product
   - `DELETE /products/:id` - Delete product

5. **Suppliers:**
   - `GET /suppliers` - Get all suppliers
   - `POST /suppliers` - Create supplier
   - `PUT /suppliers/:id` - Update supplier
   - `DELETE /suppliers/:id` - Delete supplier

## Full URLs (if baseURL is `https://192.168.1.125:7035`):
- `https://192.168.1.125:7035/auth/login`
- `https://192.168.1.125:7035/auth/register`
- `https://192.168.1.125:7035/test`
- etc.

## If your backend uses `/api` prefix:
Change baseURL to: `https://192.168.1.125:7035/api`
Then endpoints become:
- `https://192.168.1.125:7035/api/auth/login`
- `https://192.168.1.125:7035/api/auth/register`
- etc.


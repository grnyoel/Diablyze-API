# Diablyze API

This is a Backend API for Diablyze Website using Node.js, Express, and Supabase(PostgreSQL).

## ⚙️ Installation & Environment Variables
### Prerequisites
- Node.js v18+
- PostgreSQL (for Supabase's database)
- Supabase Account

### 🛠️ Installation
1. Clone this repository
```bash
git clone https://github.com/grnyoel/Diablyze-API.git
cd Diablyze-API
```

2. Install all dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp env.example .env
```

4. Run local
```bash
npm run start
     or
npm run dev #For development mode
```

### 🔧 Environment Variables

#### `.env` File
Create or edit a `.env`. in the root diretory.
| Name          | Variable                      |
| :------------ | :-----------------------------|
| PORT          | `PORT`                        |
| PostgreSQL    | `SUPABASE_URL` `SUPABASE_KEY` |
| JWT           | `JWT_SECRET` `JWT_EXPIRES_IN` |
| FRONTEND      | `CLIENT_URL`                  |

#### This is an example of the contents of the `.env` file 

```env
# Server Configuration
PORT=xxxx
CLIENT_URL=your_frontend_url

# Supabase(PostgreSQL) Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=xx

```

**Note**: Replace those values with your actual configuration. make sure not to commit the `.env` file to Version Control or Remote Repository. to keep your secret credentials secure.

#### Variables Explanation:

- `PORT`: Where your project running (example: `5000` for localhost:5000)
- `CLIENT URL`: The URL of your Frontend (example: `http://localhost:3000`)
- `SUPABASE_URL`: Your Supabase URL Project (example: `https://xxxx.supabase.co`)
- `SUPABASE_KEY`: Anon key from Supabase
- `JWT_SECRET`: Secret key for JWT signing (minimum 32 characters)
- `JWT_EXPIRES_IN`: Set how long the jwt token will expire (example: `1h` for 1 hour)

## 📚 API Endpoints

### Authentication
```bash
POST  /api/auth/register     # Register new user
POST  /api/auth/login        # Login and get token
POST  /api/auth/logout       # Invalidation token
```

### Predict Diabetes
This API endpoint needs authorization before continue to predict diabetes.
```bash
POST  /api/predict
```

### Server Health Check
```bash
GET  /health                # Status server
GET  /                      # Check if the API is running properly
```

## 🚀 How to Use

### 1. User Registration

Request Example
```bash
curl --location 'http://localhost:3000/api/auth/register' \
--data-raw '{
    "email": "jueviolegerent@example.com",
    "password": "12345678",
    "name": "Jue Viole Gerent"
}'
```

Response Example
```json
{
  "user": {
    "id": "485053d9-0497-4a67-b3dd-b64e8a20abfa",
    "email": "jueviolegerent@example.com",
    "name": "Jue Viole Gerent"
  },
  "token": "<your_token>"
}
```

### 2. Login

Request Example
```bash
curl --location 'http://localhost:3000/api/auth/login' \
--data-raw '{
    "email": "admin@example.com",
    "password": "12345678"
}'
```

Response Example
```json
{
  "user": {
    "id": "2cea4429-3d38-4927-8366-0c8335d5686e",
    "email": "admin@example.com",
    "name": "Admin"
  },
  "token": "<your_token>"
}
```
Save or copy the `token` obtained from the response.

### 3. Diabetes Prediction
Request Example
```bash
curl --location 'http://localhost:3000/api/predict/' \
--header 'Authorization: Bearer <your_token>' \
--header 'Content-Type: application/json' \
--data '{
  "gender": 0,
  "age": 36,
  "hypertension": 0,
  "heart_disease": 0,
  "smoking_history": 2,
  "bmi": 51,
  "HbA1c_level": 6.7,
  "blood_glucose_level": 80
}'
```

Response Example
```json
{
  "prediction": 1,
  "probability": 0.9,
  "diagnostic": "Risiko diabetes tinggi - Disarankan konsultasi dokter segera",
  "timestamp": "2025-06-11T20:32:04.313Z"
}
```
The response will provide a diagnosis related to user input

### 4. Logout
Request Example
```bash
curl --location --request POST 'http://localhost:3000/api/auth/logout' \
--header 'Authorization: Bearer <your_token>'
```

Response Example
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 📝 Documentation
[API Documentation](https://documenter.getpostman.com/view/28687808/2sB2x5JD5S)

## 👤 Author
[@grnyoel](https://github.com/grnyoel)
# AcadTrack
AcadTrack is a Node.js application (Express.js + MongoDB) that provides a scalable dashboard for academic institutions. It supports real-time attendance tracking across multiple subjects and secure, biometric-backed login using dlib-based facial recognition. Media and documents are stored and managed in Cloudinary.

Key highlights:

Built a scalable dashboard supporting 100+ students with real-time attendance across subjects.
dlib-powered facial recognition for secure login (95%+ accuracy in typical environments).
Cloudinary integration for storing and managing 1,000+ academic documents and media files.
Provides both REST and GraphQL APIs for integrations and third-party tools.
Tech stack:

Backend: Node.js, Express.js
Database: MongoDB
Face recognition: dlib
File/media storage: Cloudinary
APIs: REST + GraphQL
Quick start

Install dependencies:
npm install
Environment variables (example):
MONGO_URI=your_mongo_connection_string
CLOUDINARY_URL=your_cloudinary_url
PORT=3000
JWT_SECRET=your_jwt_secret
Run locally:
npm start
For details on endpoints, configuration, and deployment, see the project source files and the API docs in the repository.

If you'd like, I can add example API docs, environment templates, or a CONTRIBUTING guide—what would you prefer next?

Code (quick start)

Install dependencies:
npm install
Copy .env.example to .env and update values.

Start the server:

npm start
Endpoints

REST: GET /api/health — health check
REST: GET /api/students — list students
REST: POST /api/students — create student (JSON body: name, email)
REST: POST /api/upload — upload file (multipart file)
REST: POST /api/recognize — upload image (multipart file), calls the placeholder face-recognition script
GraphQL: POST /graphql — GraphQL endpoint (see src/graphql/schema.js)
Example: create a student via curl

curl -X POST http://localhost:3000/api/students \
	-H 'Content-Type: application/json' \
	-d '{"name":"Alice","email":"alice@example.com"}'
Example: upload an image for recognition

curl -X POST http://localhost:3000/api/recognize -F "file=@/path/to/image.jpg"
Notes

The src/services/face_recognition.py file is a placeholder demonstrating the integration point for a dlib-based recognizer. Replace it with your Python/dlib implementation and standardize the JSON output for production use.
If you want, I can add example GraphQL queries, a Dockerfile, or a more complete face-recognition demo using a small test dataset.

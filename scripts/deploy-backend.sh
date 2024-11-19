#!/bin/sh

echo "Building the backend with production configuration..."
nx build backend --configuration=production

echo "Moving the .env files to the dist folder..."
cp packages/backend/.*.env dist/packages/backend/

echo "Building the Docker image for the backend..."
docker build -f packages/backend/Dockerfile -t backend .

echo "Tagging the Docker image for the backend..."
docker tag backend asia-south1-docker.pkg.dev/pennify/gcr/backend

echo "Pushing the Docker image for the backend to Google Container Registry..."
docker push asia-south1-docker.pkg.dev/pennify/gcr/backend

echo "Deploying the backend Docker image to Google Cloud Run..."
gcloud run deploy backend \
    --image asia-south1-docker.pkg.dev/pennify/gcr/backend \
    --platform managed \
    --region asia-south1 \
    --allow-unauthenticated \
    --port 3000

echo "Deployment completed."
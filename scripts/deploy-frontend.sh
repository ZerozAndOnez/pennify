#!/bin/sh

echo "Building the frontend with production configuration..."
nx build frontend --configuration=production

echo "Building the Docker image for the frontend..."
docker build -f packages/frontend/Dockerfile -t frontend .

echo "Tagging the Docker image for the frontend..."
docker tag frontend asia-south1-docker.pkg.dev/pennify/gcr/frontend

echo "Pushing the Docker image for the frontend to Google Container Registry..."
docker push asia-south1-docker.pkg.dev/pennify/gcr/frontend

echo "Deploying the frontend Docker image to Google Cloud Run..."
gcloud run deploy frontend \
    --image asia-south1-docker.pkg.dev/pennify/gcr/frontend \
    --platform managed \
    --region asia-south1 \
    --allow-unauthenticated \
    --port 8080

echo "Deployment completed."
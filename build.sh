# Build the container 

GOOGLE_PROJECT_ID=push-up-tracker-backend

gcloud builds submit --tag gcr.io/$GOOGLE_PROJECT_ID/node-push-up-tracker \
  --project=$GOOGLE_PROJECT_ID
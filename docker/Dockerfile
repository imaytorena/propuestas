FROM node:22-alpine AS build

RUN apk --no-cache upgrade && \
 apk add --no-cache bash npm && \
 apk add --no-cache --update make && \
    rm -rf /var/cache/apk/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "exposed"]
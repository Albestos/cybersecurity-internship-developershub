FROM node:19.4.0-bullseye-slim

LABEL maintainer="Daniel García (cr0hn) cr0hn@cr0hn.com"

ENV STAGE="DOCKER"

# Create a non-root user to run the app
RUN groupadd -r appuser && useradd -r -g appuser appuser

RUN mkdir /app
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json /app/
RUN npm install --omit=dev

# Bundle app source
COPY . /app

# Ensure the non-root user owns the app directory
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 3443

CMD [ "npm", "start" ]
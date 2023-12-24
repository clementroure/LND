FROM oven/bun

WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy your source code and protobuf files
COPY src src
COPY protos protos 
COPY tsconfig.json .

# Set environment to production
ENV NODE_ENV production

# Command to run your application
CMD ["bun", "src/index.ts"]

# Expose port 8080
EXPOSE 8080

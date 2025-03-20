FROM python:3.10-slim

# Install OpenCV
RUN pip install opencv-python

# Install Node.js dependencies
RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Copy the Python game script and images into the container
COPY python_game.py .
COPY Game_Backgrounds/brazil_1.jpeg .
COPY Game_Backgrounds/brazil_flag.png .

EXPOSE 3000
EXPOSE 3001

CMD [ "node", "server.js" ]

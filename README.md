# Rumi-IOS

Task sharing service for IOS mobile devices, made with React Native.

Preview:

Features:
- uses React Native
- add tasks, mark as urgent when needed
- tap on task to mark as completed


Setup:

- clone the Rumi repo for server-side
  - git clone https://github.com/TeamChill/Rumi.git

- from the root directory of cloned Rumi install dependencies
  - npm install

- create environment variables
  - Create env.sh file:
    export FB_ID=YOUR FB APP ID
    export FB_SECRET=YOUR FB APP SECRET
    export SESSION_SECRET=YOUR CUSTOM SECRET
  - source ./env.sh

- create the docker image for postgresSQL:
  - docker build -t rumi .
- run the image with port 5432(default port for postgres):
  - docker run -d -p 5432:5432 rumi
- make sure the image is running:
  - docker ps
- start the server
  - npm start

- clone the Rumi-IOS repo for server-side
  - git clone https://github.com/TeamChill/Rumi-IOS.git
- from the root directory of cloned Rumi-IOS install dependencies
  - npm install
- run IOS simulator
  - react-native run-ios

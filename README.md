# Airbank Challenege
![Screen Shot 2022-10-04 at 2 06 18 AM](https://user-images.githubusercontent.com/52538845/193677525-6b4e4f3b-8799-4b64-ae91-207c76cb72f5.png)

![Screen Shot 2022-10-04 at 2 06 48 AM](https://user-images.githubusercontent.com/52538845/193677618-f793b83f-c854-4da4-94cd-4e88f74ff498.png)


## Tech Stack

Vue 

Nuxt

Tailwind

Javascript

Apollo

GraphQL
 
Node
 
TypeScript
 
Prisma
 
PostgreSQL


## Deployment

To deploy this project make sure you have POSTGRES installed and an instance running. Also have two terminals open. One for backend and one for frontend.

### Backend


```bash
  cd backend
  npm install
```
Create the .env needed for the connection with database with the following info

``DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/airbank_challenge?schema=public"``

where USER and PASSWORD are your respective login credentials for the PSQL database

After this run 

```bash
  npx prisma generate
  npx prisma migrate dev
```

This will setup the database and seed the data into the database. Once complete, run

```bash
  npm run dev
```

This will run the server. Keep this running!


### Frontend

In a seperate bash terminal

```bash
  cd frontend
  npm install
  npm run dev
```
This will run the client. Keep this running!

Then go to the localhost specified by in the client to run the app.



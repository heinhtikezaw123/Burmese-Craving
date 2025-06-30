# Burmese Craving Back End

## Requirements
- Node ^18
- Postgres 17.4

## Installation

Clone the repo locally:
```
git clone 
```

`cd` into cloned directory and install dependencies. run below command one by one.
```bash
npm install
cp .env.example .env
```

### Configuration in `.env` file

Database **eg.**
```
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=burmese_craving_db
DB_USERNAME=
DB_PASSWORD=
```

Port **eg.**
```
PORT=3000
```

Secret Key **eg.**
```
ACCESS_TOKEN_SECRET=burmesecraving
ACCESS_TOKEN_LIFE=30d
```

Mail Setup **eg.**
```
MAIL_HOST=smtp.gmail.com
MAIL_USER=
MAIL_PASS=
```

## Database Migration
`cd` into src

Run database migrations:
```
npx sequelize-cli db:migrate
```

Run database seeder:
```
npx sequelize-cli db:seed:all
```

## Server Run

Run the dev server:
```
npm run dev
```

Visit below url:
```
http://localhost:3001
```
# calculator-frontend

## Project setup/Installing necessary packages
```
npm install
This needs to be done in the main directory, and also in the calculator-frontend

## How to change directory?
```
cd calculator-frontend

### Starting the server(port 5000)
```
npm start

### Compiles and hot-reloads for development
```
npm run serve(running in 8080)
```

### Compiles and minifies for production
```
npm run build
```
### How to run this?
```
Open two terminals, one for the node.js and one for the vue.js
```
In browser, search for "http://localhost:8080/main". This will open a mini home page for the visitors and 
will give you the options to sign in, or sign up.

###### A small description of the application
``````
In the sign up form, there is an option of a role. There are two roles in this system. A simple user, which is assigned 
with the "User" role, and an Administrator of the system, assigned with the role "Admin". In this page also, the simple
visitor can see a table with all the currencies of the whole world.

###### User
The simple "User", can be anyone, that will sign up(and automatically be authenticated) in the application, and will just 
calculate the currencies that he/she wants which will appear in a dropdown list form(reading the currencies). Inserting the desired currencies and
the amount  he/she wants, he/she can easily see the convertion of the currencies. He/She has also his/her own tab by clicking
the button "My Profile", where he/she can see his/her personal information and update it if he/she wishes. Also there is
a feature for the "User" to see his conversion history, with the exact date and time of the conversion. Lastly, 
when the "User" is ready, he/she can logout by clicking the button "Logout".

###### Admin
The "Admin" of the system, when signed up in the application, needs to provide a unique code form the system, so that
can have access to multiple funnctions(protected endpoints). Once he becomes an authenticated user of the system, he has 
the same properties as the "User", but he can also do some extra things(GRUD). These are the following: 
1. Currency Operations: The "Admin" can add, update (rename), and delete currencies. Each currency has a code (e.g., USD, EUR).
2. Exchange Rate Operations: The "Admin" can add, update, delete, and read the exchange rates between currencies. 
Each exchange rate includes:
*From currency
*To currency
*Rate (conversion rate between the two currencies)

Lastly, as a database, I used MongoDB, and with some libraries, I tried to protect her from some security attacks:
1. CORS: Restricts requests to the backend from localhost:8080 and allows credentials (cookies).
2. MongoDB Injection Protection: mongoSanitize prevents NoSQL injection by removing dangerous characters from user input.
3. Helmet: Adds security headers to protect against MIME type issues, XSS attacks, and forces HTTPS (Strict-Transport-Security).

# Expense Manager Application

### Features
1. Login, SignUp and logout for the users with JWT token.
2. Users can add a budget and categories they want to make expense in.
3. After this setting, user can add expenses in the added categories till their budget is enough.
4. The expenses can edited or deleted (which can be undo also) such that their budget is enough for these else they will not be allowed.
5. The summary of today's expenses in different categories will be shown through a pie chart in summary page.
6. The summary of expenses over past one year can also be seen in summary page.

### Backend
1. The code for backend is available in backend folder.
2. To run it, in the backend folder, run "npm i", then "npm run dev".
<br> Dependencies: bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose

### Frontend
1. The code for frontend is available in frontend folder.
2. To run it, in the frontend folder, run "npm i", then "npm start".
<br> Dependencies (other than those added by create-react-app): axios, react-boostrap, boostrap, react-router-dom, react-google-charts 

### Model
The database used is mongodb. Though it is a nosql database, yet working with a schema provides a way to control things for which mongoose is used.
There are two models used - User and Expense.

User model has username, password, budget, amountLeft, categories and reference to today expenses. <br>
Expense model has reference to its user, amount, category, deleted and its date.

This model were chosen so as to optimize the operations required for implementing above listed features.

### ScreenShots
Screenshots of different pages in frontend are available in screenshots folder.

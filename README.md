# Expense Manager Application

### Features
1. Login, SignUp and logout for the users with JWT token.
2. Users can add a budget and categories they want to make expense in.
3. After this setting, user can add expenses in the added categories till their budget is enough.
4. The expenses can edited or deleted (which can be undo also) such that their budget is enough for these else they will not be allowed. After edit, the expense can be reset to original value also.
5. The summary of today's expenses in different categories will be shown through a pie chart in summary page.
6. The summary of expenses over past one year can also be seen in summary page.

### Demo Video
The demo of features are in this [video](https://drive.google.com/file/d/1ITX7ESNL-y1iZ-vtGSvEqbtUfCB9yjSX/view?usp=sharing). The past year summary is not shown in the video as the user created was new in demo.

### Backend
1. The code for backend is available in backend folder.
2. To run it, in the backend folder, run "npm i", then "npm run dev".
3. A .env file also needs to be created with PORT -> the port for app, DB_URI -> mongo db database url, JWT_SECRET -> jwt secret string keys.
4. The api collection of backend is also included as thunder-collection_backend.json file in repo. This can be imported in Postman or Thunderclient of vscode to get specifications of different APIs.
<br> Dependencies: bcryptjs, cors, dotenv, express, jsonwebtoken, mongoose

### Frontend
1. The code for frontend is available in frontend folder.
2. To run it, in the frontend folder, run "npm i", then "npm start".
3. A .env file also needs to be created with REACT_APP_BACKEND_URL which corresponds to url of backend.
<br> Dependencies (other than those added by create-react-app): axios, react-boostrap, boostrap, react-router-dom, react-google-charts 

### Model
The database used is mongodb. Though it is a nosql database, yet working with a schema provides a way to control things for which mongoose is used.
There are two models used - User and Expense.

User model has username, password, budget, amountLeft, categories and reference to today's expenses. <br>
Expense model has reference to its user, amount, category, deleted and its date.

This model were chosen so as to optimize the operations required for implementing above listed features.

### Database
The database used was a cloud database of mongodb atlas.

### Implementation
1. Login/SignUp -> Login and SignUp generates jwt token after being successfull. This jwt token is then saved in localstorage of the browser.
2. Authentication -> User needs to be authenticated to access setting, expense or summary pages. For this a parent element is made common to all of them where jwt token is first checked and then element is rendered. The default header in axios is set to send jwt token in every request. A global user state is fetched with this jwt token once. If unauthenticated, redirected to login using useNavigate hook.
3. Setting -> In the backend, the budget or category are updated in the respective user model. The id of user is extracted from the jwt token sent to backend. After each update, in the backend the today's expense are emptied as this will be setup from where user will begin adding their expenses. 
The amount left will be reintialized to budget as well.
4. Expenses -> The categories available in user can be used to add expenses. Filter is used to get categories not used yet in expenses. The expenses already added can modified, reset to original value or deleted, if the amount left is enough which is confirmed from backend. 
5. Daily summary / Summary Over Past Year -> React Google Chart library is used to display pie chart of daily expenses in different categories and line graph of total expenses over past one year.
The today expense is directly fetched from user collection which has references to today's expenses and the data for total expenses is fetched from expense collection.
6. Logout -> The jwt token is deleted and redirect to login using useNavigate hook.
7. Optimizations -> The user state is directly updated in frontend on successful request instead of fetching from backend again.

### ScreenShots
Screenshots of different pages in frontend are available in screenshots folder.

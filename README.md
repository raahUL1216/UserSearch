# Full User Search API
API to autocomplete the user search given the list of users.

App is developed using MERN stack. API flow is given below,
1) **React.js frontend** - it has input to search users and show searched user suggestions. It also shows specific user page and search reasult page to view detailed information
2) **Express.js backend** - connects to mongo db and retrives user data with detailed search information
3) **MongoDB database** - db have user collection and search index on all fields of user collection, it will do fuzzy search on whole user collection.

## To run this project in development,

Frontend: 
> *cd UserSearch/search-users && npm i && npm start*

Backend: 
> *cd UserSearch/search-users-api && npm i && node app.js*

Test App:
> *cd UserSearch && npm test*

You will need to change the following things,
- mongodb connection string in backend
- portNumber to host front end or backend

Once you start the development servers, you would see app running on http://localhost:3000


Sample screenshots of the App,

1) Search Input <br />
![0](https://user-images.githubusercontent.com/34180124/149747351-29d21af6-e9a4-42d7-bf20-a26928deb4ae.png)

2) Full text search (found word is highlighted in user items array) <br />
![1](https://user-images.githubusercontent.com/34180124/149747263-b2d0779e-7658-4648-9677-5dfd3263a5e1.png)

3) User not found message <br />
![2](https://user-images.githubusercontent.com/34180124/148698542-cf0629e4-163d-432e-8ffa-36edc71cf516.png)

4) User search result page <br />
![4](https://user-images.githubusercontent.com/34180124/149747925-35c2a386-ac93-4ec1-bf21-22e77a37f7fd.png)

5) User search suggestions page <br />
![5](https://user-images.githubusercontent.com/34180124/148698552-680293dc-e150-4e24-99bf-e3bf6d50bc78.png)


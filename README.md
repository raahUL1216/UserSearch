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

You will need to change the following things,
- mongodb connection string in backend
- portNumber to host front end or backend

Once you start the development servers, you would see app running on http://localhost:3000


Sample screenshots of the App,

1) Search Input <br />
![0](https://user-images.githubusercontent.com/34180124/148698368-569f9c56-14e9-46f8-92f8-d806e4725911.png)

2) Full text search (found word highlighted in user name field) <br />
![1](https://user-images.githubusercontent.com/34180124/148698512-dcc8159b-5f24-4f0e-a8cd-0dd24259ec34.png)

3) User not found message <br />
![2](https://user-images.githubusercontent.com/34180124/148698542-cf0629e4-163d-432e-8ffa-36edc71cf516.png)

4) User search result page <br />
![4](https://user-images.githubusercontent.com/34180124/148698550-17856630-aef7-43c4-872a-85a02874823a.png)

5) User search suggestions page <br />
![5](https://user-images.githubusercontent.com/34180124/148698552-680293dc-e150-4e24-99bf-e3bf6d50bc78.png)


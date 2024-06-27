# Fast CarPark!

# Step 0

Install a node version, LTS should be good
[https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

# Starting

First, node modules needs to be installed, for this run **npm i** in the backend and front folders

To run the backend and frontend together you need to type **npm start** in the root folder

To populate the db run **npm run start:populate**

# Frontend
Frontend url is http://localhost:3020
# Backend

## Endpoints
Backend base URL http://localhost:3019

### /car

 - **GET**
 Gets a list of cars
 - **POST**
 Adds a car
 - **PUT**
The endpoint takes the id as a param car/:id
Edit a car
 - **DELETE**
 Then endpoint takes the id as a param car/:id
 Delete a car

### /images/upload
Body must be of form-data with the field called files, here you add the image
POST request

### /img
Images can be accessed via this endpoint 
for example http://localhost:3019/img/dacia-spring.png

# HOMEWORK
You must continue the Fast CarPark application. 
Please be creative and develop a unique layout.

1. Add filter functionality for the list of cars. Examples: manufacturer, model, construction year, price, fuel type. (Only frontend)

2. Add a search bar to search cars by manufacturer / model. (Only frontend)

3. Implement the possibility of saving cars to favorites to local storage.

4. Define the navigation menu for the application.

5. Implement add to basket functionality and create a basket page that must contain the list of vehicles with details and images and the totals.

6. Add the possibility of sorting the list of cars.

## Recommendations
1. Use at least one checkbox.
2. Use Accordion / dropdown for filters.
3. Use Typescript.

### OPTIONAL
1. Define a theme for the aplication.
2. Save the basket items and the list of orders to local storage. 
3. Use the API for post, put, delete mentioned at the line 23.
4. Integrate the image upload functionality in the process of saving a new car.
5. Add banners, promotions in the application.
6. Add endpoint for filtering, search and sorting. Use the homework points 1, 2, 6.
7. Implement quick view with more details for cars (modal / dialog).
8. Use a library of UI components.

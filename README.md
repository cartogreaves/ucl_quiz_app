# Quiz 'Quizlet' Mobile Application

All code within this repository acts as components for producing a fully functioning mobile application. The creation of a server using node.js is required for the functionality of question uploading and downloading within the application. Further information can be found **[here](https://github.com/RJHCarto/Server)**.

## How does the web application work?

The application works by presenting an interace with central leaflet map, two buttons at the bottom followed by a title at the header of the application. The left button is used to load the quiz questions, while the right button is used to find questions in a specified range (currently set to 40 metres). The application is constantly tracking you location, once a question is found in range its question popup will be available to answer. Submission of answers is made via the httpServer.js to the PostgreSQL database.

## User Interface Diagram
![alt text](https://github.com/RJHCarto/Quiz/blob/master/ucesrh1/www/img/AppShot.jpeg)

The interface above is designed for a quiz user. The 'question load' button is bottom left while the 'proximity to' is bottom right. In the centre of the screen is a question in proximity to the user (Blue Marker). The popup displays question and answers, on press of submit button, user answer will be sent to the database and the application refreshed.

### Workflow:
1. Load questions using bottom left button.
2. Wait for blue user location marker to appear.
3. Find questions within set proximity of you, using bottom right button.
4. Open and answer a question within proximity.
5. Read alert to find out if you were correct.
6. Wait for application to refresh.
7. Reload Questions and continue your quiz.

## Repositories of interest
Links to the following tools used for this application:
- **[Node.js](https://github.com/nodejs)**
- **[PhoneGap](https://github.com/phonegap)**
- **[Material Design Lite](https://github.com/google/material-design-lite)**
- **[Leaflet](https://github.com/Leaflet/Leaflet)**

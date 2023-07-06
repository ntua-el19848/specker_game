# myCharts frontend
This frontend was bootstrapped with Create React App.

Via myCharts Software a user can create the charts he/she wants by uploading a csv file based on our templates. More information about pricing, administrators or registration process you can find it on "about" page.

## Technologies
* JavaScript (JS): The primary programming language used for developing the frontend of the application
* React: popular JavaScript library used for UI
* CSS (Cascading Style Sheets):  styling language used to enhance the appearance of our UI

## frontend URL
http://davinci.softlab.ece.ntua.gr:4007/

## Page structure
Frontend is consisted of different pages, each of which is composed of some components.
A user can navigate in our app via Sidebar compoment:
* Landing: this page is our home page. In landing page a user can login, logout, or register in our App.
* About: this page includes information about priving model, administrators and registration process
* Account page: in this page a user can find information about user's identity and his/her remaining Credits
* Credits: in this page a user can purchase some amount of Quotas
* errorCreate: in this page a user can only be navigated when an error during the chart generation has occured
* succesfulCreate: in this page a user is navigated in successfull generation of the chart
* myCharts: this page displays all charts of the user in a "clickable" Table. Specifically, he/she can click a row and see a preview of corresponding graph that can even download.
* newChart: in this page a user navigated when he/she wants to create a new diagram. In newChart page a user can also download the templates of all supported charts by clicking the green button ,down from the corresponding chart image.
* notFound: in this page a user can only be navigated when some unsupported URL is pressed

![Alt text](https://i.imgur.com/64SZpy2.png "Home page of our App")
This project aims to offering the Domestic Services like Plumbing , Electrical , Carpentary , Applications Repair through web application.

This project is fully developed using MERN-STACK.


I’ve made significant modifications across both the backend and frontend of my "Domestic Services" project. On the backend, I added new controllers for services and routes, introduced several new service-related images for various service categories like application, home improvement, pet care, and more. I also worked with file uploads for both technicians and users. On the frontend, I reorganized the structure by renaming several components and moved them into a new directory (/component). I also introduced several new UI components like alert dialogs, buttons, input fields, and tabs, while also working on custom CSS for various components. There was a significant amount of cleanup as well, with files like BookingDetailsModal.jsx, BookingDialogBox.jsx, and others being deleted or moved. Additionally, configuration files such as tailwind.config.js and tsconfig.json were added.

These updates were then committed with a message describing the front-end changes and successfully pushed to the thanga2 branch on GitHub

if booking is not working - feel free to remove all the codes in  C:\Users\HP\Desktop\Domestic-Services\Front-end\src\pages\user\component :: BookingDetailsModal,BookingDialogBox,MyBooking file.

Main changes are made in Welcome.jsx and Dashboard.jsx and UserDashboard.jsx

in MongoDb i have added icon section,

C:\Users\HP\Desktop\Domestic-Services\Back-end\uploads\service
mongoDB :
service:
_id
680de00ae70685c87a8ad4b5
service_name
"Carpentry"
description
"Installation, repair, and maintenance of woodwork, cabinets, and furni…"
baseRate
60
category
"Home Repair & Maintenance"
icon
"home-repair.png"
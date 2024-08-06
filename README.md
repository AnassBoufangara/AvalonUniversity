# Avalon University
![LOGO!](Avalon-University-Logo-PNG-Size-Small-modified.png)

## Table of Content
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Description
This project encapsulates the development and evaluation of an Academic Support System
designed to improve accessibility for students, particularly those with disabilities and
international students. The system leverages advanced technologies, including Artificial
Intelligence (AI) and Natural Language Processing (NLP), centred around a robust
Automatic Speech Recognition (ASR) model developed using the Kaldi toolkit. This model is
integral to the system's capability to offer real-time lecture transcription, which enables all
students to access and engage with lecture content more effectively. The necessity for this
system stems from the challenges that traditional learning materials present to students who
face barriers due to physical disabilities or language differences. By transforming spoken
lectures into text in real-time, the system not only aids in comprehension during lectures but
also enhances students' ability to review and interact with educational content at their own
pace. Significant efforts were put into ensuring that the system is user-friendly and
integrative, employing the MERN stack to create a seamless digital platform for users. This
platform supports the ASR tool and simplifies access to educational materials,
demonstrating a potentially significant impact on educational outcomes across a diverse
student.

This repository contains two main components developed on the Ubuntu operating system:
1. 'Project' Folder: This folder includes the code for a web application developed using the MERN stack (MongoDB, Express.js, React, and Node.js).
2. 'ModelEvaluation.ipynb' Notebook: A Jupyter Notebook that focuses on the evaluation and testing of an Automatic Speech Recognition (ASR) model using the KALDI toolkit and the TIMIT dataset.


## Installation
To install and run the MERN stack application, follow these steps:
1. Clone the repository:
```
$ git clone https://github.com/AnassBoufangara/AvalonUniversity.git
$ cd AvalonUniversity
```

2. Install the server dependencies:
```
$ cd BackEnd
$ npm install
```

3. Install the client dependencies:
```
$ cd ../FrontEnd 
$ npm install
```


## Usage:
To start the application, run the following commands:
1. Start the backend server:
```
$ cd BackEnd
$ npm start
```

2. Start the frontend server:
```
$ cd ../FrontEnd
$ npm start
```

The application should now be running at `http://localhost:3000`.


## Result:
Use case digarm:
![usecase!](./Images/UseCaseDiagram.jpg)

Here are some screenshots of the website:
* Login page:
![Login!](./Images/Login.jpg)

* Home page:
![Login!](./Images/Login.jpg)






# Acknowledgements
I extend my heartfelt gratitude to my supervisors, Dr. Wei Li and Dr. Kimia Aksir, whose expertise and insightful guidance were instrumental in the conception and execution of this project. Their unwavering support and constructive feedback throughout this journey have been invaluable.
I am also immensely grateful to Dr. Charles Clarke, the responsible for the Final Year Project module, whose diligent coordination and dedication to the academic and professional development of students have greatly enhanced my research experience.
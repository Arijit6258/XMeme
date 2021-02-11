# Meme Stream App - XMeme
## Intro
This is a meme stream app where anyone can post memes.
<br><br>
## To post memes users have to provide three things - 
<br>
1. Name of the user who is posting the meme
<br><br>
2. Caption for the meme
<br><br>
3. URL of the meme

<br><br>
### In the main page there is a form which user have to fill to post a meme.

<br>

### Just below the form a list of latest 100 memes posted by various users is shown.

<br>

### When an user posts a new meme the timeiline below the form is automatically updated.

<br> <br>

## Front Page :   
       
<br>

![alt text](./ImagesForReadme/FrontPage.png)


<br>

### Along with these there is another feature to edit a meme caption of meme-url or both.

<br>

There is a button added below each meme to edit the meme. when user will press the button a pop up window will appear. Where user have to provide atleast new caption or new meme-url.

<br> 

![alt text](./ImagesForReadme/EditMeme.png)

<br>

## This app is built using the following tech-stack : 

<br>

### Front-End : HTML, CSS, Javascript

<br>

### Back-End : Express.js

<br>

### Database : MongoDB

<br>

## I have also added a swagger API doc so that anyone can interact with the backend of this app. The API consists of 4 methods - 

<br>

1. Get method to fetch list of latest 100 memes. <b>(End Point - /memes)</b>

<br>

2. Post method to post new meme. <b>(End Point - /memes)</b>

<br>

3. Get method to get a meme if ID is specified. <b>(End Point - /memes/:id)</b>

<br>


4. Patch method to update a meme <b>(End Point - /memes/:id)</b>
<br><br><br>
## Swagger API-DOC : 
<br>

![alt text](./ImagesForReadme/Swagger.png)

<br>

### The backend is running on port 8081 and the swagger is running on port 8080. 
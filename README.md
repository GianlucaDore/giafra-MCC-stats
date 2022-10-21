This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# About

Hi everyone! Welcome to my very first React project. It's been quite a way, but rather fast.
Before starting this project, I knew absolutely nothing of front-end and web development in general! Even my React skills were very limited, and my knowledge of this library was merely theoretical.
That's why I chose to commit on Git only the "final" 0.9 version, so I could keep for me all the very dumb code I wrote in the early revisions -- not that the code I'm publishing here is that sophisticated, but at least I'm using Hooks and I'm not breaking so many React patterns as before :P

Please be aware of this in case you decide to make a pull request. I'm learning fast, but still, experience comes with time!

NOTE FOR DEVELOPERS: If you're into React / coding, please keep in mind that I've learned most of what I know about React while working on this application. I tried to master different concepts, such as Hooks, lifecycle and many others while coding this app. That's why you may encounter different ways of coding when going through the different source files. Actually I first wrote the app using only class components, only to edit most of them when I learned Hooks (but not ALL of them). Of course, the final version is going to be homogeneous in the coding style and structure, but for early revisions I'm going to preserve some of the older lines of code, just to remember how things could be done differently (such as Class components instead of Functions).

# What is this?

This React application was designed as my very first exercise with the library. Basically, it provides a view for the stats of MCC players.
MCC is the acronym that stands for "Halo: the Master Chief Collection", and it refers to 343 Industries' famous first-person-shooter game.
These stats are kindly provided by 343i themselves, but more specifically, they are fetched by a 3rd party API, created by some community enthusiasts, named HaloDotAPI.
So, the app makes use of such API to retrieve the stats of any player who played the game. 
For now though, it's only able to retrieve the last 75 matches of the requested player, but it can display various infos, such as what gametypes were played, and things like how many kills and deaths were attributed to the player for each match.

# How does it work ?

After running the project, made with create-react-app, the application should open on the landing page, the home page.
Here you have the core feature of the webapp: the search for a player's stats. 
The search starts by tiping the player's username in the form, and then submitting it. 
Please note that the player's username is the player's Xbox Live Gamertag. Although it's NOT case-sensitive, the exact alphanumeric sequence is still needed in order to get a successful response from the API. 


Some examples of VALID Gamertags:


giafra

FairuzaVostok

Pillow IQ


It's also possible that the Gamertag inserted does exist in Microsoft database, but the linked user never played Halo: The Master Chief Collection, OR the user could have set his statistics to "private" in his privacy settings, thus preventing his stats to be fetched by 3rd-party APIs. The webapp is programmed to throw an alert in the browser if this is the case, and then to redirect the user to the landing page.

Some examples of valid but RESTRICTED Gamertags are:


Savieer

SirAstriel


The last case regards the invalid Gamertags. In case you typed a non-existent Xbox Live Gamertag, the webapp will load the general error 404 component.
Some examples of INVALID Gamertags are:


aaasssvvv

pppqqqaaa


Obviously, the result is determined by the HaloDotAPI's response to the request: a !response.ok will trigger the third case, while a response.ok with an empty res.count will trigger the second case.


*UPDATE*: It's strongly recommended, after a successful search, to go back to the landing page to start a new search, since the form rendered in the Profile.js component does not clear the counters and the table correctly in some cases, resulting in a glitch.

# About page

The about page is an example of how I handle non-dynamic components.
It tells about the history of previous MCC stat trackers and how this application will imitate them in later updates. 
At the bottom of the page, two social media buttons will take you to my Twitch and Youtube accounts.

# Contacts page

The contacts page lets you send a email to the administrators of the site -- just me for now :)  .
It's based around another very useful 3rd party API: EmailJS. 
The webpage presents a form, which inputs are, in order:


- "Your name", aka your identity in this message.

- "to name", aka to which admin staff member your message is directed. You can write basically whatever you want in this field, since the message will always be sent to the same email address.

- "Your message", the request / comment you want to make.

- "Your email", aka the email that we'll use to contact you in case we have to reply to the request.


After submitting the form (by clicking the "Send" button), a confirmation message will be rendered instead of the form, after the loading icon.

# URL manipulation

It's now possible to navigate the app through URL manipulation, thanks to React Router.
For example, typing in the URL bar "localhost:3000/profile/giafra" will bring you directly to the stats of giafra. 
You can basically search any player skipping the landing page, typing the desired Gamertag after "localhost:3000/profile/". 

If the Gamertag has any space in it, naturally you would need to insert a %20 instead of the space: "localhost:3000/profile/pillow%20iq".


In a similar fashion, "localhost:3000/about" and "localhost:3000/contacts" will bring you, respectively, to the About and Contacts sections of the app.


Everything else should trigger the 404 not found page/component.


-------------------------------------------------------------------------------------------------------------------------------------------------------


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.



# Purpose of the application

The Google Book search application will take a search term entered by the user and will call the Google Books API to retrieve all books whose author, title and description best matches the search term.  

The user will then have the opportunity to save each book individually, or to visit the Google website to get more information about the book and/or potentially purchase it.  There will be two buttons at the right-hand side of the book picture and description so the user will select the action desired.

In fetching books, the application limits the number of books fetched to fourty, which is the limit  set by Google API to keep traffic down.  

The information for the books saved will be stored in a MongoDD collection so that the user can revisit the books saved, look at their details and the date it was saved.  In addition, the user will have the opportunity to go to Google website to get more information about the book and/or purchase it.  Finally the user will have the opportunity to delete the book from the saved list

## Search Books

The user will have the opportunity to enter a search string that will be used to get the closest matches based on title, author and description.  The results will be presented in tabular format with five different columns as follows:

* Image of the book, if available.  If not available from the API, a placeholder will be included on its place.
* Book name, as per the publisher.  This field is very reliable with most every record populated.
* Author, if available.  This field is also very reliable.
* Synopsis, which explains what the book is about.  Whenever there is no data, particularly for older books, a "Sorry, no information from Google" message will be shown instead.
* Actions.  For each book, two buttons will be provided so that the user can either save the book, or go to the Google website and see more information.

Whenever the user decides to go to the Google website, a new tab will be opened.

Whenever the user decides to click on the teal "Save" button, it will change to yellow and will display "Saved", so that the user knows that book has been saved to the collection.

##  Browse Saved Books

Whenever the user picks the navigational bar to see saved books, the system will inmediately display a list of all books sorting them by the most recently saved first.  The information for each book will be displayed similarly to the seach results.  There will be six columns, one extra column than from the search book that will contain when that book was saved. 

*  Image of the book
*  Book name
*  Author
*  Synopsis
*  Date it was saved
*  Actions, which could be either delete the book from the saved list, or go to the google store.

Whenever the user decides to go to the Google store, a new tab will be opened.

Whenever the user decides to delete the red button to delete the book from the collection, the system will eliminate that book, and will reload the remaining saved books.

##  Call to Google Books API

The call to Google Books API could have been done from the browser without using an API key.  That would have limited the results to ten results, rather than the fourty results we now get.  Since we need to use an API key, the dilema is whether to make that key public.

Three designs were considered.  First, expose the API in the browser and limit its usefulness, which would have complied with our objectives but wouldn't be acceptable in a normal application deployment.  As a result, we decided to use nodenv package so that we would set an environmental variable to the API key.  We could then serve the API key to the browse which in turn would call the Google books API.  While this model would have been acceptable, we are still left with a security vulnerability since anyone using the application would be able to get the API key.

The final design is a two-stage API call.  The browser makes an API call to the server, which in turns makes an API call to the Google Books API.  This two-step API system ensures that we keep the API secure while simulateneously achieving our objective.

##  Deployment to Heroku

This application has been deployed to Heroku at https://google-books-001.herokuapp.com/

##  Overall application demonstration

![GIF of input](./google-books.gif)

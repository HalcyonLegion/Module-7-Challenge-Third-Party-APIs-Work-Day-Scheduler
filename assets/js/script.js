//NOTES
// The app should:

// Display the current day at the top of the calender when a user opens the planner. - moment.js

// Present timeblocks for standard business hours when the user scrolls down. - moment.js/jquery html insertion magic.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed. Some sort of conditional time-based css/moment.js mashup. There are classes in the CSS files for .past .present .future. so this is going to be wild.

// Allow a user to enter an event when they click a timeblock. Textarea? Yes I can see this in the CSS - great!

// Save the event in local storage when the save button is clicked in that timeblock. Using localstorage means I need to json stringify somewhere and then remember to parse it.

// Persist events between refreshes of a page - prevent default.

//Opening the page to start with looks like this entire thing is going to have to be driven by jQuery dynamically creating and appending various elements. The Demo Gif in the Readme seems to only have work hours - so Days are not a factor? Hours are 9-5pm.

$(document).ready(function() {
    // Variables - I guess the work hours will need to be arrayed so they can be added to the page like in previous lessons.
    var workHours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var container = $(".container");
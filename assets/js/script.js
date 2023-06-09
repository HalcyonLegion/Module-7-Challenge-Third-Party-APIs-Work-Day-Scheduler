//NOTES
// The app should:

// Display the current day at the top of the calender when a user opens the planner. - moment.js

// Present timeblocks for standard business hours when the user scrolls down. - moment.js/jquery html insertion.

// Color-code each timeblock based on past, present, and future when the timeblock is viewed. Some sort of conditional time-based css/moment.js mashup. There are classes in the CSS files for .past .present .future.

// Allow a user to enter an event when they click a timeblock. Textarea? Yes I can see this in the CSS.

// Save the event in local storage when the save button is clicked in that timeblock. Using localstorage I thought meant I needed to json stringify somewhere and then remember to parse it later, turns out I didn't.

// Persist events between refreshes of a page - prevent default? No, turns out I can just do it like the below.

// Opening the page to start with looks like this entire structure is going to have to be driven by jQuery dynamically creating and appending various elements. The Demo Gif in the Readme seems to only have work hours - so Days are not a factor? Hours are 9-5pm.

$(document).ready(function() {
    // Variables - The work hours will need to be arrayed so they can be added to the page like in previous lessons.
    var workHours = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    var container = $(".container");

    // I need to get the current day bit out the way - thankfully the html has a handy ID called currentDay.
    $("#currentDay").text(moment().format("dddd, MMMM Do"));

    // Creating the timeblocks for each work hour. The value for each hour will need to be passed as a variable at some point.
    workHours.forEach(function(hour) {
    // Create a row for each timeblock
    var row = $("<div>").addClass("row time-block");

    // Creating an hour column
    var hourCol = $("<div>").addClass("col-md-1 hour").text(moment(hour, "h").format("h A"));

    // Creating a textarea column to enter the items for the scheduler
    var textArea = $("<textarea>").addClass("col-md-10");
    textArea.attr("id", "hour-" + hour);

    // This is checking whether the local storage has anything saved and then populates that specific textarea with the appropriate value.
    var savedEvent = localStorage.getItem("hour-" + hour);
    if (savedEvent){
        textArea.val(savedEvent);
    }

    // Creating a save button column with the Icon from fontawesome.
    var saveBtn = $("<div>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
    saveBtn.attr("data-hour", hour);

    // Appending everything together -  columns to the row, added new saveBtn
    row.append(hourCol, textArea, saveBtn);

    // Append the row to the container
    container.append(row);

    // Adding the Color-coding the Textarea based on past, present, and future classes as per the CSS.
    var currentHour = moment().hour();
    if (parseInt(hour) < currentHour) {
      textArea.addClass("past");
    } else if (parseInt(hour) === currentHour) {
      textArea.addClass("present");
    } else {
      textArea.addClass("future");
    }

    });

    // Save event to local storage when save button is clicked
    $(".saveBtn").on("click", function () {
    var hour = $(this).data("hour");
    var plannerText = $("#hour-" + hour).val();
    localStorage.setItem("hour-" + hour, plannerText);
    });
});
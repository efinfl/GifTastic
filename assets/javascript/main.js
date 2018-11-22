$(document).ready(function () {


    /* This function dynamically adds a new button by passing 
    inputSubject variable from, addNewButton(inputSubject), 
    generated from the clicking the and does the following:*/
    function addNewButton(input) {
        // creats variable that adds button element
        var newButton = $("<button>");
        // adds classes to created above <button>
        newButton.addClass("clickable m-1 btn btn-dark")
        // assigns the value of that button to input
        newButton.attr("value", input)
        // displays that value in into the button as text
        newButton.text(input);
        // and finaly, displays the button on the DOM, before the last placed (AKA prepend)
        $("#buttonDisplay").prepend(newButton);
    }

    function searchGifs(subject) {

        $("#gifDisplay").empty();

        // API to GiPHY 
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=a00MXncvbcuOCFWA6igsGFqN9ptIyixu&limit=5"

        console.log(queryUrl);

        // AJAX request gets information based the inputSubject passed into searchGifs
        $.ajax({
            url: queryUrl,
            method: "GET",
            // When info is recieved it does the folloiwng
        }).then(function (response) {
            console.log(response)

            /* Variable of the portion of the array being accessed,
            in this case, the data property of the response*/
            var results = response.data;

            /* Loops thrugh each index and does the following*/
            for (i = 0; i < results.length; i++) {

                // Creates the gifImage variable and assigns it a tag of <img>
                var gifImage = $("<img>");

                /* then assigns it the src attribute and gives it the value of
                of fixed_height url in the images index of the each response index */
                gifImage.attr("src", results[i].images.fixed_height.url)
                gifImage.addClass("m-3")

                /* Takes gif stored in gifImage variable, displays it 
                in the gifDispay div adding each to the before the last */
                $("#gifDisplay").prepend(gifImage)
            }
        })
    };
    
    // This is the submitt button in the DOM. When clicked, it triggers the follwoing
    $("#findGif").on("click", function (event) {
        // Prevents trying to push out any data which is the defualt. We're getting not pushging
        event.preventDefault();

        /*/ Var which holds data(.val()) input into the search field 
        then deletes (.trim()) extra spaced from each end */
        var inputSubject = $("#inputSubject").val().trim();
        console.log("This is inputSubject: " + inputSubject);

        // Then takes the inputSubject variable and passes into the addNewButtonq function
        addNewButton(inputSubject);
    });
    
    //This function triggers the on click defined above by pressign Enter key 
    $("#inputSubject").keypress(function(event) {
        if(event.which === 13) {
        $("#findGif").click();
        }
    });

    /* When button (diynamically generated in addNewButton function) 
    a set of gifs containing the subject matter on 
    the button is displayed by doing the following*/
    $(document).on("click", ".clickable", function () {
        console.log("button clicked")
        // Creates variable that takes the value (AKA text) of the button.
        var thisval = $(this).val();
        console.log("this value text; " + thisval);
        // Takes that value and passes into the serchGits function
        searchGifs(thisval);
   
    })
    // This facilitates search for the buttons that are initially loaded
    $(document).on("click", ".existing", function () {
        var exist = $(this).text().trim();
        console.log("existing button: " + exist);
        searchGifs(exist);
    });



})
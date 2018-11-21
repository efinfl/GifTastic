$(document).ready(function () {

    /* This function takes the val taken when submit button is clicked
     This method is defined below this function */
    function serchGifs(subject) {
        
        // API to GiPHY 
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=a00MXncvbcuOCFWA6igsGFqN9ptIyixu&limit=10"

        // AJAX request gets information based the inputSubject passed into searchGifs
        $.ajax({
            url: queryUrl,
            method: "GET",
        // When info is recieved it does the folloiwng
        }).then(function (response) {
            console.log(response)
            
            /* Variable of the portion of the array being accessed,
            int this case, the data property of the response*/
            var results = response.data;
            
            /* This loops thrugh each index and does the following*/
            for (i = 0; i < results.length; i++) {
                
                // Assignes it the var gifImage and tells it to give a tag of <img>
                var gifImage = $("<img>");
                
                /* then assigns it the src attribute and gives it the value of
                of fixed_height url in the images index of the each response index */
                gifImage.attr("src", results[i].images.fixed_height.url)
                
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

        // Then takes the inputSubect var the passes into the searchGifs function
        serchGifs(inputSubject);
    })




})
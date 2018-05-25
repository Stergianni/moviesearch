/* OMDb API
The Open Movie Database
http://www.omdbapi.com/ */


/* ---------- Global Variables ---------- */
// Variables
let title = "";
let year = "";
let id = "";
let page = 1;

// Lists

let lResults = [];

// Objects
let movie = {};


/* ------------------------------- */

/* ---------- Functions ---------- */
// searchByTitle
//http://www.omdbapi.com/?apikey=3ee6c07&s=scary
function searchByTitle(title) {
    console.log("\n#searchByTitle(", title, ")");
    openModal();

    get($.ajax('http://www.omdbapi.com/?apikey=3ee6c07&s=' + title + '&page=' + page)
        .then(
            function (response) {
                lResults = response.Search;
                generateTable(lResults)
                closeModal();
                console.log("Success!", response, '\nlResults', lResults);

            },
            function (error) {
                closeModal();
                alert('Something went wrong:\n', error)
                console.error("Failed!", error);
            }
        )

    )
}

// searchByTitleAndYear
//http://www.omdbapi.com/?apikey=3ee6c07&t=harry&y=1998
function searchByTitleAndYear(title, year) {
    console.log("\n#searchByTitleAndYear(", title, ",", year, ")");
    openModal();
    get($.ajax('http://www.omdbapi.com/?apikey=3ee6c07&t=' + title + '&y=' + year)
        .then(
            function (response) {
                movie = response;
                generateCard(movie);
                closeModal();
                console.log("Success!", response, '\nMovie', movie);
            },
            function (error) {
                closeModal();
                alert('Something went wrong:\n', error)
                console.error("Failed!", error);
            }
        )
    )
}

// searchByID
//http://www.omdbapi.com/?i=tt0257106&apikey=3ee6c07
function searchByID(id) {
    console.log("\n#searchByID(", id, ")");
    openModal();
    get($.ajax('http://www.omdbapi.com/?i=' + id + '&apikey=3ee6c07')
        .then(
            function (response) {
                movie = response;
                generateCard(movie);
                closeModal();
                console.log("Success!", response, '\nMovie', movie);
            },
            function (error) {
                closeModal();
                alert('Something went wrong:\n', error)
                console.error("Failed!", error);
            }
        )
    )
}

async function search() {
    console.log("\n#search");
    lResults = [];
    movie = {};
    $('Table').remove();
    $('#myCard').remove();

    t = document.getElementById("inputTitle").value;
    y = document.getElementById("inputYear").value;
    i = document.getElementById("inputId").value;
    console.log('\nTitle:', t, '\nYear: ', y, '\nID: ', i);

    if (t == '' && y != '') {
        alert('Insert Title and Year');
    } else {
        if (t == '' && y == '' && i == '') {
            alert('Insert Title, Title and Year, or a Movie Id');
        } else {
            if (t != '' && y === '') {
                searchByTitle(t);
            } else {
                if (t != '' && y != '') {
                    searchByTitleAndYear(t, y);
                } else {
                    searchByID(i);
                }
            }
        }
    }
    clearInputs();
}

/*----------------------------------------------------------*/
function get(url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function () {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}




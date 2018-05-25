// Enable & Disable inputs
function mutuallyExclusive(e) {

    //disable the opposite input field
    var Id = $('#inputId').val();
    var Title = $('#inputTitle').val();
    var Year = $('#inputYear').val();


    // $('#btnSearch').prop('disabled', true);
    // $(':button[type="text"]').prop('disabled', true);
    // $('#btnSearch').attr("disabled", true);
    // $('#btnSearch').prop("disabled", true);


    if (Id.length > 0) {
        $('#inputTitle').prop("disabled", true);
        $('#inputYear').prop("disabled", true);
    } else {
        $('#inputTitle').removeAttr("disabled");
        $('#inputYear').removeAttr("disabled");
    }

    if (Title.length > 0 || Year.length > 0) {
        $('#inputId').prop("disabled", true);
    } else {
        $('#inputId').removeAttr("disabled");
    }

}

$('#inputTitle').on('change keyup', mutuallyExclusive);
$('#inputYear').on('change keyup', mutuallyExclusive);
$('#inputId').on('change keyup', mutuallyExclusive);


// ClearInputs
function clearInputs() {
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputYear").value = '';
    document.getElementById("inputId").value = '';
    $('#inputTitle').removeAttr("disabled");
    $('#inputYear').removeAttr("disabled");
    $('#inputId').removeAttr("disabled");
}

// Generate Table Movies
function generateTable(list) {
    console.log("\n#generateTable(", list, ")");

    $('Table').remove();

    if (list != undefined) {

        var divContainerFluid = document.getElementById('Table');

        var divTable = document.createElement("TABLE");
        divTable.setAttribute("class", "mx-auto");
        divTable.setAttribute("style", "height: auto;");
        divContainerFluid.appendChild(divTable);

        var thHead = document.createElement("thHead");
        divTable.appendChild(thHead);

        var trHead = document.createElement("TR");
        thHead.appendChild(trHead);

        var tBody = document.createElement("TBODY");
        divTable.appendChild(tBody);

        list.forEach(element => {
            console.log("ELEMENT:", element);

            var trBody = document.createElement("TR");
            tBody.appendChild(trBody);

            var thBody = document.createElement("TH");
            thBody.innerHTML = element.Title;
            trBody.appendChild(thBody);

        });

        onSelect();
    }
    else { alert("No movie founded."); }
}

// Generate Card Movie
function generateCard(movie) {
    console.log("\n#generateCard(", movie, ")");
    $('#myCard').remove();

    var divContainerFluid = document.getElementById('Card');

    var movie_card = document.createElement("DIV");
    movie_card.setAttribute("class", "movie-card");
    movie_card.setAttribute("style", "background-image:url(" + movie.Poster + ")");
    movie_card.setAttribute("id", "myCard");
    divContainerFluid.appendChild(movie_card);

    var color_overlay = document.createElement("DIV");
    color_overlay.setAttribute("class", "color-overlay");
    movie_card.appendChild(color_overlay);

    var movie_share = document.createElement("DIV");
    movie_share.setAttribute("class", "movie-share");
    color_overlay.appendChild(movie_share);

    var movie_share_icon = document.createElement("A");
    movie_share_icon.setAttribute("class", "movie-share__icon");
    movie_share.appendChild(movie_share_icon);

    var movie_content = document.createElement("DIV");
    movie_content.setAttribute("class", "movie-content");
    color_overlay.appendChild(movie_content);

    var movie_header = document.createElement("DIV");
    movie_header.setAttribute("class", "movie-header");
    movie_content.appendChild(movie_header);

    var movie_title = document.createElement("H1");
    movie_title.setAttribute("class", "movie-title");
    movie_title.innerHTML = movie.Title;
    movie_header.appendChild(movie_title);

    var movie_info = document.createElement("H4");
    movie_info.setAttribute("class", "movie-info");
    movie_info.innerHTML = movie.Plot;
    movie_header.appendChild(movie_info);

    var movie_desc = document.createElement("P");
    movie_desc.setAttribute("class", "movie-desc");
    movie_desc.innerHTML = '(' + movie.Year + ')  ' + movie.Genre;
    movie_content.appendChild(movie_desc);

    var icon = document.createElement("I");
    icon.setAttribute("class", "fas fa-heart");

}


// Spinner
function openModal() { document.getElementById('modal').style.display = 'block'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }


function onSelect() {
    console.log("\n#onSelect");
    let index = 0;
    let row = {};
    let id = '';
    $("table tbody tr").click(function () {
        index = $(this).index();
        row = lResults[index];

        searchByID(row.imdbID);
    });
    return row;
}
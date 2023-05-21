function select_copy() {
    $("#birzha-name-1-row .select2-container .select2-selection .select2-selection__rendered").closest("#birzha-name-1-row .select2-container .select2-selection .select2-selection__rendered").remove();
    $('#birzha-name-1-row .select2-container .select2-selection .select2-selection__rendered').clone().appendTo("#birzha-name-2-row .select2-container .select2-selection");
}



$(document).ready(function () {
    //change selectboxes to selectize mode to be searchable
        $("select").select2();
    });
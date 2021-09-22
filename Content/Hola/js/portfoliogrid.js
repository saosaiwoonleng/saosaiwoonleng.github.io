$(document).ready(function(){
    $('#defaultfilterbuttoncolor').css('background', '#2e5cff').css('border-color', '#2e5cff');                    //add default filter button color on page loads

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');

        removeProperty();

        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

function removeProperty() {                                                                          //remove default filter button color
    element = document.getElementById('defaultfilterbuttoncolor').style;
    element.removeProperty('background');
    element.removeProperty('border-color');
}
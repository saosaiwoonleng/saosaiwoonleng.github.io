$(document).ready(function(){
    $('#defaultfilterbutton').css('background', '#2e5cff').css('border-color', '#2e5cff');                    //add default filter button color on page loads

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');

        var element = document.getElementById('defaultfilterbutton');                    //remove default filter button color on page loads
        element.style.background = null;
        element.style.borderColor = null;

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
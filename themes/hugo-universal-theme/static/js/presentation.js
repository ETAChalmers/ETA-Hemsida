jQuery(document).ready(function(){

  $('#presentation-search-input').on('keypress', function (e) {
    $('#presentation-search-input').removeAttr('style');

   if(e.which === 13){
     if($('#presentation-search-input').val() == "") {
       $('#presentation-item').hide();
       $('#presentation-welcome').show();
       $('#presentation-search-input').removeAttr('style');
     } else {
       $('#presentation-welcome').hide();

       $.getJSON("/auction/presentation/index.json", function(data) {

         var item = data.items.find(item => item.id === $('#presentation-search-input').val());

         if(typeof item == 'undefined') {
           $('#presentation-search-input').css("color","red");
         } else {
           $('#presentation-item-description').text(item.description);
           $('#presentation-item-img').attr("src",item.image);
           $('#presentation-item-status').text(item.status);
           $('#presentation-item').show();
         }
       });
     }
   }
 });

});

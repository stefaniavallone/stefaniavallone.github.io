$('#modalProject').on('show.bs.modal', function(e) {

    /* Product Info */
    $(e.currentTarget).find('#projectInfo').text($(e.relatedTarget).data('project-info'));
    
    /* Product Details */
    $(e.currentTarget).find('#areaProject').text($(e.relatedTarget).data('area-project'));
    $(e.currentTarget).find('#tecnologiesProject').text($(e.relatedTarget).data('tecnologies-project'));
    $(e.currentTarget).find('#groupProject').text($(e.relatedTarget).data('group-project'));
    $(e.currentTarget).find('#dateProject').text($(e.relatedTarget).data('date-project'));

    /* Carousel */
    for (i = 0; i < $(e.relatedTarget).data('carousel-indicators'); ++i) {
        $( "#carouselIndicators"+i ).remove();
        if(i==0){
            $( "#carouselndicatorsOL" ).append( "<li id=carouselIndicators"+i+" data-target='#carouselIndicators' data-slide-to='"+i+"' class='active'></li>" );
        } else{
            $( "#carouselndicatorsOL" ).append( " <li id=carouselIndicators"+i+" data-target='#carouselIndicators' data-slide-to='1'></li>" );
        }
    }

    $imgs = $(e.relatedTarget).data('img-carousel').split(',')
    for (i = 0; i < $imgs.length; ++i) {
        $( "#carouselItem"+i ).remove();
        if(i==0){
            $( "#carouselItem" ).append( "<div id=carouselItem"+i+" class='carousel-item active'><img class='img-size' src='"+$imgs[i]+"'/></div>" );
        } else{
            $( "#carouselItem" ).append( " <div id=carouselItem"+i+" class='carousel-item'><img class='img-size' src='"+$imgs[i]+"'/></div>" );
        }
    }
});


$('.carousel-control-prev').click(function() {
    $('#carouselIndicators').carousel('prev');
  });
  
  $('.carousel-control-next').click(function() {
    $('#carouselIndicators').carousel('next');
  });

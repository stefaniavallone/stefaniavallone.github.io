$('#modalProject').on('show.bs.modal', function(e) {

    /* Product Info */
    $(e.currentTarget).find('#projectInfo').text($(e.relatedTarget).data('project-info'));
    
    /* Remove carousel item */
     $("[id^='carouselItem_']").remove();

    /* Product Details */
    $(e.currentTarget).find('#areaProject').text($(e.relatedTarget).data('area-project'));
    $(e.currentTarget).find('#tecnologiesProject').text($(e.relatedTarget).data('tecnologies-project'));
    $(e.currentTarget).find('#groupProject').text($(e.relatedTarget).data('group-project'));
    $(e.currentTarget).find('#dateProject').text($(e.relatedTarget).data('date-project'));
    // $dataInterval = $(e.currentTarget).find('#carouselIndicators');
    // $(e.currentTarget).find('#carouselIndicators').carousel('cycle')

    /* IFrame you tube */
    $src_frame = $(e.relatedTarget).data('frame-carousel')
    if ($src_frame != undefined) {
        $src_frame = $src_frame.split(',')
        for (i = 0; i < $src_frame.length; i++) {
            $( "#carouselItem" ).append( " <div id=carouselItem_"+i+" class='carousel-item active'><iframe height="+ 345 +" class='iframe-size'  frameborder='"+0+"' allowfullscreen src='"+$src_frame[i]+"' /></div>" );
            // $(e.currentTarget).find('#carouselIndicators').carousel('pause');
        }
    }

    /* Img carousel */
    $imgs = $(e.relatedTarget).data('img-carousel')
    if ($imgs != undefined) {
        $imgs = $imgs.split(',')
        for (i = 0; i < $imgs.length; i++) {
            if (i==0 && $src_frame == undefined) {
                    $( "#carouselItem" ).append( "<div id=carouselItem_"+i+" class='carousel-item active'><img class='img-size' src='"+$imgs[i]+"'/></div>" );
            } else {
                $( "#carouselItem" ).append( " <div id=carouselItem_"+i+" class='carousel-item'><img class='img-size' src='"+$imgs[i]+"'/></div>" );
            }        
        }
    }
});


$('.carousel-control-prev').click(function() {
    $('#carouselIndicators').carousel('prev');
  });
  
  $('.carousel-control-next').click(function() {
    $('#carouselIndicators').carousel('next');
  });

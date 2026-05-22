// Helper: Converts YouTube watch URL to embed URL with safe parameters
function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    
    // Extract video ID from various YouTube URL formats
    let videoId = null;
    
    // Already embed URL? Extract ID and rebuild with safe params
    if (url.includes('youtube.com/embed/')) {
        let match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) videoId = match[1];
    }
    // watch URL format
    else if (url.includes('youtube.com/watch')) {
        let match = url.match(/v=([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) videoId = match[1];
    }
    // youtu.be short format
    else if (url.includes('youtu.be/')) {
        let match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) videoId = match[1];
    }
    
    // Rebuild with safe embed parameters only (no autoplay on page load)
    if (videoId) {
        return 'https://www.youtube.com/embed/' + videoId + '?controls=1&rel=0';
    }
    
    return url;
}

$('#modalProject').on('show.bs.modal', function(e) {

    /* Project Info */
    $(e.currentTarget).find('#projectInfo').text($(e.relatedTarget).data('project-info'));
    
    /* Remove old carousel items and indicators */
    $("[id^='carouselItem_']").remove();
    $('#carouselndicatorsOL').empty();

    /* Project Details */
    $(e.currentTarget).find('#areaProject').text($(e.relatedTarget).data('area-project'));
    $(e.currentTarget).find('#tecnologiesProject').text($(e.relatedTarget).data('tecnologies-project'));
    $(e.currentTarget).find('#groupProject').text($(e.relatedTarget).data('group-project'));
    $(e.currentTarget).find('#dateProject').text($(e.relatedTarget).data('date-project'));

    var allMedia = []; // Array to hold all media (videos first, then images)
    var itemIndex = 0;
    var isFirstItem = true;

    /* Process video frames (YouTube iframes) */
    var frameCarousel = $(e.relatedTarget).data('frame-carousel');
    if (frameCarousel) {
        var frames = frameCarousel.split(',').map(s => s.trim());
        frames.forEach(function(frameUrl, idx) {
            if (frameUrl) {
                var embedUrl = getYouTubeEmbedUrl(frameUrl);
                allMedia.push({
                    type: 'video',
                    src: embedUrl,
                    index: itemIndex
                });
                itemIndex++;
            }
        });
    }

    /* Process image carousel */
    var imgCarousel = $(e.relatedTarget).data('img-carousel');
    if (imgCarousel) {
        var imgs = imgCarousel.split(',').map(s => s.trim());
        imgs.forEach(function(imgUrl, idx) {
            if (imgUrl) {
                allMedia.push({
                    type: 'image',
                    src: imgUrl,
                    index: itemIndex
                });
                itemIndex++;
            }
        });
    }

    /* Build carousel items and indicators */
    allMedia.forEach(function(media, idx) {
        var activeClass = idx === 0 ? 'active' : '';
        
        if (media.type === 'video') {
            // Video iframe with responsive wrapper
            var videoHtml = '<div id="carouselItem_' + idx + '" class="carousel-item ' + activeClass + '">' +
                '<div class="video-responsive-wrapper">' +
                '<iframe class="iframe-size d-block w-100" frameborder="0" allowfullscreen="true" src="' + media.src + '"></iframe>' +
                '</div></div>';
            $("#carouselItem").append(videoHtml);
        } else {
            // Image
            var imgHtml = '<div id="carouselItem_' + idx + '" class="carousel-item ' + activeClass + '">' +
                '<img class="img-size d-block w-100" src="' + media.src + '" alt="Project media" />' +
                '</div>';
            $("#carouselItem").append(imgHtml);
        }
        
        // Add indicator
        var indicatorClass = idx === 0 ? 'active' : '';
        $('#carouselndicatorsOL').append('<li data-target="#carouselIndicators" data-slide-to="' + idx + '" class="' + indicatorClass + '"></li>');
    });

    /* Modal title */
    var title = $(e.relatedTarget).data('project-title');
    $("#modalProject .modal-title").html(title);
});


$('.carousel-control-prev').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#carouselIndicators').carousel('prev');
});
  
$('.carousel-control-next').click(function(event) {
    event.preventDefault();
    event.stopPropagation();
    $('#carouselIndicators').carousel('next');
});

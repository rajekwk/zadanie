(function() {
    $(document).ready(function() {
	    $('.show-hide').click(function () {
	        $(".sidebar").toggle("slide");
	        $(".bg").toggleClass("d-block");
	        $(".sidebar").toggleClass("open");
	    });

	    $(".single-product").on({
		    mouseenter: function () {
		        $(".close-btn",this).css("display", "block");
		    },
		    mouseleave: function () {
		        $(".close-btn",this).css("display", "none");
		    }
		});
		$(window).resize(function() {
		  	if ($(window).width() > 767) {
		  		if($(".sidebar").hasClass("open")) {
		  			// $(".sidebar").css("display", "block");
		  			// $(".bg").removeClass("d-block");
		  			$(".show-hide").click();
		  		}
		  	}
		});
    });
})();



















$(function(){

	var cookiesTotal = 0;
	var cookiesPPS = 0;

	setInterval(always, 10);
		function always(){

			cookiesTotal = cookiesTotal + (cookiesPPS/100);
			$('#counter > span').text(Math.round(cookiesTotal)); 
			$('#speed > span').text(cookiesPPS);

			$('.producer').each(function(index) {
				var price = $(this).data('price')
				if(cookiesTotal >= price) {
					$(this).addClass('available');
				}
				else {
					$(this).removeClass('available');
				}
			});
		};
	
	$('#cookie').click(function(){
		cookiesTotal = cookiesTotal + 1;
		$('#counter > span').text(Math.round(cookiesTotal));
	});

	$('.producer').click(function(){
		if ($(this).hasClass('available')) {
			var element = $(this);
			var price = element.data('price'); //pobranie wartości atrybutu
			cookiesTotal = cookiesTotal - price;
			price = Math.round(price * 1.15);
			element.data('price', price); //zmiana wartości atrybutu
			element.children(':odd').text(price); //zmiana wyświetlonej wartości
			var amount = element.data('amount'); //pobranie wartości atrybutu
			amount = amount + 1;
			element.data('amount', amount); //zmiana wartości atrybutu
			element.children(':last').text(amount); //zmiana wyświetlanej wartości
			var pps = element.data('pps'); //pobranie wartości atrybutu
			cookiesPPS = Math.round((cookiesPPS + pps)*100)/100;	
		};
	});
});
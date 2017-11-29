function showWelcome() {
	panel = '<div id="welcome" class="peripheral"></div>',
	header = '<h1>Welcome to SpaceTrade</h1>',

	description = "<p>It's the year 3021 and planets are now boring, but space is still the " +
					 "coolest. That's why you sold everything you own and love, including " +
					 "your family, to buy this awesome new starship. It goes super fast, " +
					 "comes with a crew already inside it, trained and everything, plus " +
					 "a sweet sound system.</p>" +
					"<p>You're still docked at Earth but you're ready to blast off. Feel free to peruse " +
					"the marketplace on Earth, or click the map to pick your next destination.</p>" +
					"<p>The objective is to buy low, sell high, and never stop flying. If you run " +
					"out of cash, gas, or both, we're cooked. Also, if we hit a star, we're cooked. " +
					"Or if someone hits us with a microwave gun... you get the idea. " +
					"It's dangerous out here.</p>";
	button = "<button id='closeWelcome'>Let's Do This!</button>";

   $('#app').prepend(panel);
   $('#welcome').append(header)
				.append(description)
				.append(button);

   $('#closeWelcome').bind('click', function() {
	$('#welcome').slideUp();
   });
}
// once page loads
$(document).ready(function() {
	// event handler for devour button, on click
	$(".devour-button").on("click", function(event) {
		// store the id in a variable
		var id = $(this).data("id");
		// create object to pass into ajax with new devoured value as true
		var updatedBurger = {
			devoured: true
		};
		// ajax call with a put method to /burgers/id
		$.ajax("/burgers/" + id, {
			type: "PUT",
			data: updatedBurger
		}).done(function(data){
			// once done, log the id of updated burger, reload location
			console.log("burger updated to devoured, id = " + id);
			location.reload();
		});
	});

	// event handler for new burger form, on submit
	$(".create-form").on("submit", function(event) {
		// prevent default
		event.preventDefault();
		// save new burger name in var. not saving devoured as false due to database
		// being set up as default false
		var newBurger = {
			burger_name: $("#new-burger-input").val().trim()
		};
		// ajax call with post method with new burger data above
		$.ajax("/burgers/new", {
			type: "POST",
			data: newBurger
		}).done(function(data) {
			// once done, log new burger added and reload the location
			console.log("new burger added");
			location.reload();
		});
	});
});
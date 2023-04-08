// Set the deadline date (in this example, March 31, 2023 at 11:59 PM)
const deadline = new Date("2023-06-31T23:59:00");

// Get the current date
const now = new Date();

// If the deadline has passed, show the button
if (now < deadline) {
  document.getElementById("postButton").style.display = "block";
}

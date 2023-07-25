const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/mongo-excercises")
	.then(() => console.log("Connected to DB.."))
	.catch((err) => console.error("Error connecting to DB", err));

const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
	// get all published courses
	// sort them by name
	// select name, author props from them
	const result = await Course.find({ isPublished: true })
		.sort({ name: 1 })
		.select({ name: 1, author: 1 });
	console.log(result);
}

getCourses();

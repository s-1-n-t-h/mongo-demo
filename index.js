const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB...."))
	.catch((err) => console.error("Error connecting to MongoDB..", err));

const courseSchema = mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
	const course = new Course({
		name: "React Course",
		author: "Yaswanth",
		tags: ["frontend", "javascript"],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	const pageNumber = 2;
	const pageSize = 10;
	const courses = await Course.find({ author: /^yaswanth/i, isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize) // limits no of records from search results
		.sort({ tags: 1 }) // sorts the results by specified attribute
		.select({ name: 1, tags: 1 }) // selects the given attributes from each record
		.count();
	console.log(courses);
}

getCourses();

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
    // operators
    // eq - equal to
    // ne - not equal to
    // gt - greater than
    // gte - greater than or equal to
    // lt - less than
    // lte - less than or equal to
    // in 
    // nin (not in)
	const courses = await Course
        // .find({ isPublished: true }) // to find records that hav a soecific attribute's value
        //.find({price: { $gt : 10, $lt: 20}}) // less than 20 and greater than 10 using operators
        .find({price: { $in : [10,15,20]}}) // prices equal to 10 / 15/ 20
		.limit(2) // limits no of records from search results
		.sort({ tags: 1 }) // sorts the results by specified attribute
		.select({ name: 1, tags: 1 }); // selects the given attributes from each record
	console.log(courses);
}

getCourses();

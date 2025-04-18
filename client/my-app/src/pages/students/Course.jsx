import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./course.css"
import { Link } from "react-router-dom";

const Course = ({course}) => {
  console.log(course.courseThumbnail)
  return (
    <div>
      <Link to={`course-detail/${course._id}`} style={{textDecoration:"none"}}>
      <Card className="card" sx={{ maxWidth: 325, boxShadow: 3, borderRadius: 2,maxHeight: 370 }}>
      <CardMedia style={{height:"150px"}}
        component="img"
        alt="Next.js Course"
        height="180"
        src={course?.courseThumbnail}
      />
      <CardContent className="typography">
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          {course.description}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
        Instructor : {course.creator ? course.creator.name : "Unknown"}
        </Typography>
        <Typography variant="body2" sx={{ color: "green", fontWeight: "bold" }}>
          Course Price : {course.coursePrice} | Duration: 6 Weeks
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" size="small">
          Enroll Now
        </Button>
        <Button variant="outlined" color="secondary" size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
    </Link>
    </div>
  )
}

export default Course

import React, { useState } from 'react'
import Filter from './Filter.jsx'
import SearchResult from './SearchResult.jsx';
import { Button, Typography, Box, Skeleton } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link, useSearchParams } from "react-router-dom";
import { useGetSearchCourseQuery } from '../../features/api/courseApi.js';
const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory,setSelectedCategory] = useState([])
  const [sortByPrice,setSortByPrice] = useState("");
  const handleFilterChange=(categories,price)=>{
       setSelectedCategory(categories)
       setSortByPrice(price)
  }
  const query = searchParams.get("query")
  console.log(query)
  const {data,isLoading} = useGetSearchCourseQuery({
    searchQuery:query,
    categories:selectedCategory,
    sortByPrice
  })
  const isEmpty = !isLoading && data?.courses.length === 0;
  return (
    <div>
      <div>
        <h2>Result for "{query}"</h2>
        <p>
            showing result for {""}
            <span style={{color:"blue"}}><i>{query}</i></span>
        </p>
      </div>
      <div style={{display:"flex", gap:"30px",marginLeft:"100px"}}>
        <div>
          <Filter handleFilterChange={handleFilterChange}/>
        </div>
        <div>
          {
            isLoading ? (
            Array.from({length:3}).map((_,idx)=>(
               <CourseSkeleton key={idx}/>
            ))
           ) : isEmpty ? <CourseNotFound/> : (
            data?.courses?.map((course)=>(
              <SearchResult key={course._id} course={course}/>
            ))
           )
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage

const CourseSkeleton=()=>{
  return(
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="space-between" borderBottom={1} borderColor="divider" py={2}>
      <Box width={{ xs: "100%", md: 256 }} height={128}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
      <Box flex={1} px={2} display="flex" flexDirection="column" gap={1}>
        <Skeleton variant="text" width="75%" height={24} />
        <Skeleton variant="text" width="50%" height={20} />
        <Box display="flex" alignItems="center" gap={1}>
          <Skeleton variant="text" width="33%" height={20} />
        </Box>
        <Skeleton variant="rectangular" width={80} height={24} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between" mt={{ xs: 2, md: 0 }}>
        <Skeleton variant="text" width={48} height={24} />
      </Box>
    </Box>
  )
}
const CourseNotFound=()=>{
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={128}
      bgcolor="background.default"
      p={3}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 64, marginBottom: 2 }} />
      <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
        Course Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Sorry, we couldn't find the course you're looking for.
      </Typography>
      <Button component={Link} to="/" variant="text" color="primary">
        Browse All Courses
      </Button>
    </Box>
  )
}
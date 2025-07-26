import Banner from "@/components/banner";
import CourseDetails from "@/components/courseDetails";
import SimilarCourse from "@/components/similarCourse";

export default function Home() {
  return (
    <div className="">
       <Banner></Banner>
       <CourseDetails></CourseDetails>
        <SimilarCourse></SimilarCourse>
    </div>
  );
}

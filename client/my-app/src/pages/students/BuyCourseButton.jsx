import React,{useEffect} from 'react'
import { useCreateCheckoutSessionMutation } from '../../features/api/purchaseApi'
import { toast } from 'react-toastify';

const BuyCourseButton = ({courseId}) => {
    const [createCheckoutSession,{data,isLoading,isSuccess,isError,error}] = useCreateCheckoutSessionMutation();
    const purchaseCourseHandler=async()=>{
       await createCheckoutSession(courseId)
    }
    useEffect(()=>{
      console.log("API Response:", { data, isSuccess, isError, error });
        if(isSuccess){
          console.log("Redirecting to:", data.url);
           if(data?.url){
            window.location.href = data.url; // Redirect to stripe checkout url
           }else{
            toast.error("Invalid response from server.")
           }
        }
        if(isError){
          console.error("API Error:", error);
          toast.error(error?.data?.message || "Failed to create checkout session")
        }
      },[data, isSuccess, isError, error])
  return (
    <div>
      <button disabled={isLoading} onClick={purchaseCourseHandler}>{isLoading ? "Please wait..." : "Buy course now"}</button>
    </div>
  )
}

export default BuyCourseButton

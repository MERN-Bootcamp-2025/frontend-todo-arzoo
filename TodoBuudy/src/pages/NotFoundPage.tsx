import type React from "react"
import pageNotFound from "../assets/404-removebg-preview.png"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"


const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/dashboard');
    }
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col items-center justify-between mt-0 mb-0 ml-auto mr-auto">
                <img src={pageNotFound} alt="" className='h-[500px] w-[750px]' />
                <h1 className="text-3xl mb-5">Page Not Found</h1>
                <Button onClick={handleClick} variant="secondary">
                      Go to Dashboard
                </Button>
            </div>
        </div>

    )
}

export default NotFoundPage
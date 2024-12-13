import { useRouter } from "next/router";

const FurtherPage =()=>{
    const r = useRouter();
    const arr = r.query.slug;
    console.log(arr);

    const handleArr =()=>{
        if (!arr || arr.length === 0) {
            return <h1 className="heading">Loading...</h1>; 
        }
        if (arr[0] === "faqs"){
            return <h1 className="heading">This is FAQ's Page</h1>
        }
        if (arr[0] === "support"){
            return <h1 className="heading">This is Support Page</h1>
        }

        else {
            return <h1 className="heading">This is {arr[0]} Page</h1>
        }
    }

    return(
        <>
            {handleArr()}
        </>
        
    )
    
}

export default FurtherPage;
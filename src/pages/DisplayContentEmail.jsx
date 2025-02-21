
function DisplayContentEmail({email}){
    return(
        <div className="">
                <h1 className="text-2xl font-bold mb-2">{email.subject}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="w-16 h-8  text-black  flex items-center justify-center">
                    {email.name}
                  </div>
                  <div>
                    <p className="font-semibold">{email.mailID}</p>
                    <p className="text-sm">{email.time}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-gray-800">{email.body}</p>
                  {email.image && (
                    <img
                      src={email.image}
                      alt="Email Attachment"
                      className="mt-4 rounded shadow w-[150px] h-[150px]"
                    />
                  )}
                </div>
                
              </div>
              
    )
}

export default DisplayContentEmail
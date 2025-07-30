interface MessageProps{
    message:string
}

function Message({message}:MessageProps){
    return <div className="w-fit h-fit px-3.5 py-1.5 my-1 bg-gray-300 dark:bg-gray-700 rounded-xl">
        <h3>{message}</h3>

    </div>
}

export default Message;
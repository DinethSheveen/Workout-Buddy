export const formatUsername = (username)=>{
    const firsLetter = username.charAt(0)
    const formattedName = firsLetter.toUpperCase() + username.slice(1)
    return formattedName 
}
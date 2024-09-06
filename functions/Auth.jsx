export const SaveUser = (user ) => {
    return new Promise((resolve, reject) => {
        sessionStorage.setItem("me" , JSON.stringify(user))
        resolve()
    })
}

export const GetUser = () => {
    return new Promise((resolve, reject) => {
        if(sessionStorage.getItem("me")){
            const user = JSON.parse(sessionStorage.getItem("me"))
            resolve(
                {
                    user: user 
                }
            )
        }else{
            window.location.assign("/")
        }
    })
}



export const SignOut = () => {
    new Promise((resolve, reject) => {
        GetUser()
        .then(() => {
            sessionStorage.removeItem("me")
            resolve()
        })
    })
    .then(() => window.location.assign("/"))
}

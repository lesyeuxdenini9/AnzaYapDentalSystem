
const  checklogin = (to,from,next)=>{
    let islogin = localStorage.getItem('islogin') || false
    if(islogin){
        let userinfo = JSON.parse(localStorage.getItem('userinfo'))
        if(userinfo.usertype == 0) next({path: "/admin"})
        if(userinfo.usertype == 1) next({path: "/staff"})
        if(userinfo.usertype == 2) next({path: "/patient"})
    }else{
        //  window.location.href = "/"
        next({path: "/"})
    }
}

const backendmiddleware = (to,from,next)=>{
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if(userinfo.usertype == 2 ){
        next({path: "/patient"})
    }else{
        next()
        // if(userinfo.usertype == 1) next({path: "/staff"})
        // if(userinfo.usertype == 2) next({path: "/patient"})
    }
}

const frontendmiddleware = (to,from,next)=>{
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if(userinfo.usertype == 2){
        next()
    }else{
        next({path: "/backend"})
        // if(userinfo.usertype == 1) next({path: "/staff"})
        // if(userinfo.usertype == 2) next({path: "/patient"})
    }
}


const adminmiddleware = (to,from,next)=>{
    let userinfo = JSON.parse(localStorage.getItem('userinfo'))
    if(userinfo.usertype == 0 ){
        next()
    }else{
        if(userinfo.usertype == 1) next({path: "/staff"})
        if(userinfo.usertype == 2) next({path: "/patient"})
    }
}


export {checklogin,adminmiddleware,backendmiddleware,frontendmiddleware}
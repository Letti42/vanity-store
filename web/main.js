//Front end javascript!!
let btn = document.querySelector("#signup");
let user = document.querySelector("#user");
let pass = document.querySelector("#pass");
let email = document.querySelector("#email");

btn.onclick = async()=>{
    let userData = {user:user.value, pass:pass.value, email:email.value};

    let response = await fetch("/signup", {
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(userData),
        method:"POST"
    });

    let json = await response.json();

    document.querySelector("#message").innerText = json.W;
}


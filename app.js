const signUpForm = document.getElementById("signUpForm")
const logInUpForm = document.getElementById("logInForm")

if(localStorage.token){
    const button =document.createElement('button')
    button.innerText='LOGOUT'
    document.body.prepend(button)
    button.addEventListener('click', () => {

        localStorage.removeItem('token')
    })

    fetch('http://localhost:3000/profile', {
        method:"GET", 
        headers: {
            'Authorization': `Bearer ${localStorage.token}`
        }
    })
    .then(response => response.json())
    .then(user => {
        let h1 = document.createElement('h1')
        h1.innerText = user.email
        console.log(user)

        document.body.append(h1)
    })
}

signUpForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    
    const formData = new FormData(event.target)

    const name = formData.get('name')
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')


    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
            "Content-Type": 'application/json'
        }, 
        body: JSON.stringify( 
            {
            user: {
                name,
                username,
                email,
                password} })
    })
})

logInUpForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    const formData = new FormData(event.target)

    const username =formData.get('username')
    const password =formData.get('password')


    fetch('http://localhost:3000/login', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then((result) => {
        return result.error 
        ? alert(result.error)
        : localStorage.setItem('token', result.token)
        


    })




})

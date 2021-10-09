

function cierraAlert() {
    const alert = document.getElementById('alert');
    alert.style = 'display:none';
}


const renderLogin = () => {
    const loginView = document.getElementById('login-view');
    const login = document.getElementById('login');
    const spinner = document.getElementById('spinner');

    const loginForm = document.getElementById('form-signin');
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        //renderapp();
        login.style = "display:none";
        spinner.style = "display:flex";
        const ussername = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`${location.origin}/api/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: ussername,
                user: ussername,
                password: password
            })
        }).then(x => {
            console.log(x);
            return x.json();
        }).then(_res => {
            if (!_res.error) {
                console.log(_res.institution);
                localStorage.setItem('user',JSON.stringify( _res.user))
                localStorage.setItem('institution', JSON.stringify(_res.institution) )
                /* localStorage.setItem('ses', _res.headers.ses_id) */
                 location.replace(location.origin)
            } else {
                const alert = document.getElementById('alert');
                alert.style = 'display:flex';
            }
            login.style = "display:block"
            spinner.style = "display:none"
        }).catch(e => {
            console.log(e);
        })
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    renderLogin();
})
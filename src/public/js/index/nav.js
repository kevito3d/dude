const d =document;
export function funcionArrow(arrow,panel,logout,oscuro){
    d.addEventListener('click',(e)=>{
        const $panel = d.querySelector(panel);
        const $oscuro = d.querySelector(oscuro)
        if (e.target.matches(arrow) || e.target.matches(`${arrow} *`)){
            
            $panel.classList.toggle('isActive')
        }else if($panel.classList.contains('isActive') && 
        !e.target.matches(logout)){
            
            $panel.classList.toggle('isActive')
            document.querySelector(logout).lastElementChild.style.display="none"
        }
        
        if(e.target.matches(oscuro)|| e.target.matches(`${oscuro} *`)){
            // const $html= d.documentElement
            // console.log(aux)
            // let varDarkColor = getComputedStyle($html).getPropertyValue('--base-color')
            // console.log(varDarkColor);
            
            if($oscuro.classList.contains('light')){
                $oscuro.firstElementChild.textContent= "modo oscuro"
                
            }else{
                
                $oscuro.firstElementChild.textContent= "modo lus"
            }
            Array.from(document.querySelector(arrow).previousElementSibling.children).forEach((e)=>{
                e.classList.toggle('dark')
            })
            
            
            
            $oscuro.classList.toggle('light')
            const $nav =d.querySelector('nav');
            const $body =d.querySelector('body');
            $nav.classList.toggle('light')
            $body.classList.toggle('dark')

        }
        if(e.target.matches(logout)){
           document.querySelector(logout).lastElementChild.style.display="flex"
        }
        if(e.target.matches('.yes')){
            fetch(`${location.origin}/api/user/logout`,{
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
            }).then(x => {
                localStorage.clear()
                location.reload();
            })
        }
    })

}

export function loadDates(institucion, name){

    const inst = d.querySelector(institucion);
    const user = d.querySelector(name);
    user.textContent = JSON.parse(localStorage.getItem('user')).user
    inst.textContent = JSON.parse(localStorage.getItem('institution')).name

}
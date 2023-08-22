let indexCarousell = -1
let interval;

const linksActiveHeader = () => {
    const elements = document.querySelectorAll('.ancla');
    const links = document.querySelectorAll('.sections-list a');

    window.addEventListener('scroll', (e) => {
        // desactiva todas las opciones del menú
        // console.log($(".section-list a"))
        // $(".sections-list a").removeClass("active");
        for (let link of links) {
            link.className = link.className.replaceAll('active', '')
        }
        // obtén el valor del scroll
        var scrollBar = window.scrollY + 85;
        // selecciona como seccion activa la última
        var activa = elements[elements.length - 1].id;
        // para todas las secciones
        for (let value of elements) {
            // obtén su posición y altura
            var posTop = value.offsetTop;
            var altura = value.clientHeight;

            // si está en el viewport, selecciona y para el bucle each
            if (scrollBar < posTop + altura) {
                activa = value.getAttribute('id');
                break
            }
        };
        // activa la sección visible (la última por defecto)
        document.querySelector(".sections-list a[href='#" + activa + "']").className += ' active';
    });
};

// const moveCarousell = () => {
//     const elements = document.querySelectorAll('.proyect');
//     for (let element of elements) {
//         // element.style.display = "none";
//     }
//     indexCarousell = (indexCarousell >= elements.length - 1) ? 0 : indexCarousell + 1;
//     // elements[indexCarousell].style.display = 'flex';
// };

// const next = () => {
//     const btn = document.querySelector('.proyects-next');
//     btn.addEventListener('click', () => {
//         moveCarousell();
//     });
// };

// const prev = () => {

//     const btn = document.querySelector('.proyects-prev');
//     btn.addEventListener('click', () => {
//         const elements = document.querySelectorAll('.proyect');
//         let currentIndex = -1;
//         for (let i = 0; i < elements.length; i++) {
//             if (elements[i].style.display !== 'none') currentIndex = i;
//             elements[i].style.display = "none";
//         }

//         indexCarousell = (currentIndex <= 0) ? elements.length - 1 : currentIndex - 1;
//         elements[indexCarousell].style.display = 'flex';
//     });
// };

// const mouseOver = () => {
//     const container = document.querySelector('.proyects');
//     container.addEventListener('mouseover', () => {
//         clearInterval(interval)
//     });
// };

// const mouseOut = () => {
//     const container = document.querySelector('.proyects');
//     container.addEventListener('mouseout', () => {
//         interval = setInterval(moveCarousell, 4000);
//     });
// };

const toogleMenu = () => {
    const menuIcon = document.querySelector('.sections-menu-icon');
    menuIcon.addEventListener('click', () => {
        const menu = document.querySelector('.header-menu');
        menu.classList.toggle('header-menu-show');
    });
};

const closeMenu = () => {
    const links = document.querySelectorAll('.sections-list a');
    for (let link of links) {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.header-menu');
            menu.classList.toggle('header-menu-show');
        })
    }
};

const sendMail = () => {
    const btn = document.querySelector('#enviar');
    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const form = document.querySelector('#form');
        const loader = document.querySelector('#loader');

        if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(form[2].value.trim())) return Swal.fire({
            icon: 'error',
            text: 'El email es invalido'
        });


        if (
            form[0].value.trim() === '' ||
            form[1].value.trim() === '' ||
            form[2].value.trim() === '' ||
            form[3].value.trim() === '' ||
            form[4].value.trim() === ''
        ) return Swal.fire({
            icon: 'error',
            text: 'Todos los campos son obligatorios'
        });

        loader.classList.remove('hidden');
        form[0].classList.add('invisible');
        form[1].classList.add('invisible');
        form[2].classList.add('invisible');
        form[3].classList.add('invisible');
        form[4].classList.add('invisible');

        const isSend = await emailjs.sendForm('service_apqe69l', 'template_541lwes', form, 'yiovq8u8C6DBGB2UR');
        loader.classList.add('hidden');
        form[0].classList.remove('invisible');
        form[1].classList.remove('invisible');
        form[2].classList.remove('invisible');
        form[3].classList.remove('invisible');
        form[4].classList.remove('invisible');

        if (isSend.status === 200) {
            form[0].value = '';
            form[1].value = '';
            form[2].value = '';
            form[3].value = '';
            form[4].value = '';

            return Swal.fire({
                icon: 'success',
                text: 'Email enviado exitosamente'
            });
        }

        return Swal.fire({
            icon: 'error',
            text: 'Ocurrio un error al enviar el mensaje, intentalo de nuevo más tarde'
        });

    });
};

const addPdf = () => {
    const spanCv = document.querySelector('.span-cv');

    const linkOpen = document.createElement('a');
    const linkDownload = document.createElement('a'); 

    linkOpen.className = 'span-btn-open';
    linkOpen.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i>';
    
    linkOpen.href = './assets/pdf/af54f5gh1f5g4h5f.pdf';
    linkOpen.target = '_blank';

    linkDownload.className = 'span-btn-download';
    linkDownload.innerHTML = '<i class="fa-solid fa-download"></i>';

    linkDownload.href = './assets/pdf/af54f5gh1f5g4h5f.pdf';
    linkDownload.download = 'jorge-camargo-cv';

    spanCv.appendChild(linkOpen);
    spanCv.appendChild(linkDownload);
};


const dropDownClick = () => {
    const dropdownLangs = document.querySelectorAll('.dropdown-lang');
    dropdownLangs.forEach((dropdownLang) => {
        dropdownLang.addEventListener('click', (e) => {
            const divsCards = document.querySelectorAll('[data-div-cards]')
            const idDiv = `${e.target.getAttribute('data-lang')}-cards`
            const divCards = document.querySelector(`#${idDiv}`)
            divsCards.forEach((div) => {
                const maxHeight = div.scrollHeight;
                const height = div.offsetHeight;
                if(div.id === idDiv && height === 0){
                    div.style.maxHeight = (maxHeight + 1000) + 'px'
                } else {
                    div.style.maxHeight = 0
                }
            })
            
            setTimeout(() => {
                const scrollPosition = window.screenY + e.target.offsetTop - e.clientY - 20
                e.target.scrollIntoView({behavior: 'smooth', block: 'center'})
            }, 600);
        })
    })

}

const initialHeightProyect = () => {
    const div = document.querySelector('#javascript-cards')
    div.style.maxHeight = ( div.scrollHeight + 1000) + 'px'
}

// mouseOver();
// mouseOut();
linksActiveHeader();
toogleMenu();
closeMenu();
// dropDownClick();
// initialHeightProyect();
// next();
// prev();
// moveCarousell();
sendMail();
addPdf();
// interval = setInterval(moveCarousell, 4000);

'use strict';

const sexBlock = document.querySelector('.choose__sex'),
      inputBlock = document.querySelector('.choose__parametres'),
      ratioBlock = document.querySelector('.choose__active'),
      result = document.querySelector('.total__num span');

let sex, height, age, weight, ratio;


if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
} else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
}

if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
} else {
    sex = 'male';
    localStorage.setItem('sex', sex);
}

function getLocal(parent) {
    const elements = document.querySelectorAll(`${parent} div`);
    elements.forEach(item => item.classList.remove('active__class'));

    elements.forEach(elem => {
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add('active__class');
        }

        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add('active__class');
        }
    });
}
getLocal('.choose__sex');
getLocal('.choose__active');



function calcVse() {
    if (!sex || !height || !age || !weight || !ratio) {
        return result.textContent = '¯\\_(ツ)_/¯';
    }

    if (sex == 'male') {
        result.textContent = Math.round((66.5 + (13.75 * weight) + (5.003 * height) - (6.775 * age)) * ratio);
    } else {
        result.textContent = Math.round((655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)) * ratio);
    }
}
calcVse();

function getBlockInfo(parentBlock) {
    const elements = document.querySelectorAll(`${parentBlock} div`);

    elements.forEach(elem => {
        elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem('sex', e.target.getAttribute('id'));
            }

            elements.forEach(item => item.classList.remove('active__class'));
            e.target.classList.add('active__class');
            calcVse();
        });
    });
}
getBlockInfo('.choose__sex');
getBlockInfo('.choose__active');



function onInput(parent) {
    const input = document.querySelector(parent);

    input.addEventListener('input', (e) => {

        input.value.match(/\D/g) ? input.style.border = '4px solid red' : input.style.border = 'none';

        switch (e.target.getAttribute('id')) {
            case 'height':
                height = +e.target.value;
                break;
            case 'age':
                age = +e.target.value;
                break;
            case 'weight':
                weight = +e.target.value;
                break;
        }
        calcVse();
    });
}
onInput('#height');
onInput('#age');
onInput('#weight');




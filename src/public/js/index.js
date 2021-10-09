import {funcionArrow, loadDates} from'./index/nav.js';

const d =document;
d.addEventListener('DOMContentLoaded', ()=>{
    funcionArrow('.user',".otp",".logout",".oscuro")
    loadDates(".institution", ".nameuser")
})
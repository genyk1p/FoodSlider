// slideSource: 'url' - if you want get url list from remote server, for test you can use json-server db.json
//              'array' - if you want get url list from local array slideUrl

import {getResourse} from '../modules/services/services';
function slider(slideSource){
    // Slder
    // slideSource
    const slideUrl = [
        "img/slider/food-12.jpg",
        "img/slider/olive-oil.jpg",
        "img/slider/paprika.jpg",
        "img/slider/pepper.jpg"
      ];
    class Slider {
        constructor(img, curent) {
            this.img = img;
            this.current = curent;
            this.ofset = 0;
            this.width = 0;
        }
        prevSlider() {
            this.current = this.current-1;
            if (this.current < 0) {
                this.current = this.img.length-1;
            }
            this.changeCurrent();
            if (this.ofset<=0) {
                this.ofset = this.width*(this.img.length-1);
            } else {
                this.ofset = this.ofset - this.width;
            }
            return this.ofset;
        }
        nextSlider() {
            this.current = this.current+1;
            if (this.current > this.img.length-1) {
                this.current = 0;
            }
            this.changeCurrent();
            if (this.ofset < this.width*(this.img.length-1)){
                this.ofset = this.ofset + this.width;
            } else {
                this.ofset = 0;
            }
            
            return this.ofset;
        }
        changeCurrent() {
            var currentSpan = document.querySelector("#current");
            var currentHTML = this.current + 1;
            if (currentHTML < 10) {
                currentHTML = '0' + currentHTML;
            } 
            currentSpan.innerHTML = currentHTML;
            currentHTML='';
        }
        getOfsetById(id){
            this.current = +id;
            this.ofset = id*this.width;
            this.changeCurrent();
            return this.ofset;
        }
        changeActivDot (){
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                if (this.current == index){
                    dot.style.opacity = 1;
                } else {
                    dot.style.opacity = 0.5;
                }
            });
        }
        render() {
            const sliderWraper = document.querySelector(".offer__slider-wrapper"),
                  sliderInner = sliderWraper.querySelector(".slide__inner"),
                  width = window.getComputedStyle(sliderInner).width,
                  offerSlider = document.querySelector('.offer__slider'),
                  carouselIndicators = document.querySelector('.carousel__indicators');
                  
            offerSlider.style.position = 'relative';
            sliderInner.innerHTML = '';      
            sliderInner.style.display = 'Flex';
            sliderInner.style.transition = '0.5s all';

            var ex = /\D\D/;
            var intWidth = +width.replace(ex,'');
            this.width = intWidth;

            sliderInner.style.width = intWidth*this.img.length +'px';
            sliderWraper.style.overflow = 'hidden';
            this.changeCurrent();

            this.img.forEach(img => {
                const element = document.createElement('div');
                element.innerHTML = `
                <div class="offer__slide">
                <img src=${img}>
                </div>
                `;
                element.style.width = width;
                sliderInner.append(element);
            });
            let newSpan = '';
            this.img.forEach((img, counter) =>{
                newSpan += `<span class="dot" id="sliderDot${counter}"></span>`;
            });
            carouselIndicators.innerHTML = newSpan;
            document.getElementById("sliderDot0").style.opacity = 1;
            carouselIndicators.addEventListener('click', e =>{
                var ex = /\D*/;
                const id = e.target.id.replace(ex, '');
                this.getOfsetById(id);
                sliderInner.style.transform = `translateX(${-this.ofset}px)`;
                this.changeActivDot();
            });
        }
    }
    const renderSlider = ()=> {
        const totalSpan = document.querySelector("#total"),
              sliderInner = document.querySelector(".slide__inner"),
              pervSlider = document.querySelector('.offer__slider-prev'),
              nextSlider = document.querySelector('.offer__slider-next');

        if (slideSource === 'url') {
            const res = getResourse('http://localhost:3000/sider ').then((data) =>{
                var total = 0;
                if (data.length< 10) {
                    total = '0' + data.length;
                } else {
                    total = data.length;
                }
                totalSpan.innerHTML = total;
    
                const slider = new Slider(data, 0);
                slider.render();
                pervSlider.addEventListener('click', ()=>{
                    sliderInner.style.transform = `translateX(${-slider.prevSlider()}px)`;
                    slider.changeActivDot();
                });
                nextSlider.addEventListener('click', ()=>{
                    sliderInner.style.transform = `translateX(${-slider.nextSlider()}px)`;
                    slider.changeActivDot();
                });
            });
        } else if (slideSource === 'array'){
            var total = 0;
                if (slideUrl.length< 10) {
                    total = '0' + slideUrl.length;
                } else {
                    total = slideUrl.length;
                }
                totalSpan.innerHTML = total;
    
                const slider = new Slider(slideUrl, 0);
                slider.render();
                pervSlider.addEventListener('click', ()=>{
                    sliderInner.style.transform = `translateX(${-slider.prevSlider()}px)`;
                    slider.changeActivDot();
                });
                nextSlider.addEventListener('click', ()=>{
                    sliderInner.style.transform = `translateX(${-slider.nextSlider()}px)`;
                    slider.changeActivDot();
                });
        }
    };
    renderSlider();
// Slder
}
export default slider;
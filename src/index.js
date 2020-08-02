// Картинки
const IMAGES = {
// ПВХ
PVC: {
    // Скоба-ремень
    bracket: 'https://cdn-ru.bitrix24.ru/b13208222/landing/5ca/5ca57ae3e21a5d437891d5f00954d117/skobapvh_2x_1x.jpg',
    // Поворотный
    turning: 'https://cdn-ru.bitrix24.ru/b13208222/landing/caf/caf27d8c4a391f259811a267515b2b77/skobapvh1_2x_1x.jpg',
    // Французский
    french: 'https://cdn-ru.bitrix24.ru/b13208222/landing/43f/43f189ddbc25d28e739abb4247a2f855/fzpvh_2x_1x.jpg',
    // Глухие
    deaf: 'https://cdn-ru.bitrix24.ru/b13208222/landing/ff1/ff1c5f727cfd164e2c963dafb4896b29/luv122_2x_1x.jpg'
},
// Оксфорд
Oxford: {
    // Скоба-ремень
    bracket: 'https://cdn-ru.bitrix24.ru/b13208222/landing/04b/04b929d2a855750f8a898831c11953d3/skoba120_2x_1x.jpg',
    // Поворотный
    turning: 'https://cdn-ru.bitrix24.ru/b13208222/landing/ccc/cccd99a16d2690f81c3ff10be7781db9/povorotka_2x_1x.jpg',
    // Французский
    french: 'https://cdn-ru.bitrix24.ru/b13208222/landing/a43/a43a4ac504fca10dba261c5bd412500f/fz1_2x_1x.jpg',
    // Глухие
    deaf: 'https://cdn-ru.bitrix24.ru/b13208222/landing/b22/b22a151c56d426563e45965c2b5ec933/luv_2x_1x.jpg'

},
};
// Цены
const PRICES = {
PVC: {
    bracket: 1300,
    turning: 1400,
    french: 1600,
    deaf: 1100
    
},
Oxford: {
    bracket: 1400,
    turning: 1500,
    french: 1800,
    deaf: 1200
    
},
misc: {
    zipper: 900,
    door: {
    default: 1100,
    polyurethane: 2100
    },
},

toning: 100,
weighting: 100
}; 
function priceCalc() {
// Elements

// range Общая площадь
this.TOTAL_AREA_EL = document.getElementById('total__area');
// radio Полиуретан
this.POLYURETHANE_RADIO_ELS = document.getElementsByName('polyurethane');
// range Площадь двери
this.DOOR_AREA = document.getElementById('door__area');
// radio Молния
this.ZIPPER_RADIO_ELS = document.getElementsByName('zipper');
// range Длина молнии
this.ZIPPER_LENGTH_EL = document.getElementById('zipper__length');
// select Комплектация
this.COMPLETE_SELECT_EL = document.getElementById('complete__set');
// select Фурнитура
this.FITTINGS_SELECT_EL = document.getElementById('fittings');
// select Цвет
this.COLORS_SELECT_EL = document.getElementById('colors');
// radio Тонирование
this.TONING_RADIO_ELS = document.getElementsByName('toning');
// range Утяжилитель
this.WEIGHTING_EL = document.getElementById('weighting');

this.FITTINGS_ICON = document.getElementById('fittings__icon');
this.TOTAL_PRICE = document.getElementById('totalPrice');

this.TOTAL_AREA_TEXT = document.querySelector('.total__area-span');
this.DOOR_AREA_TEXT = document.querySelector('.door__area-span');
this.ZIPPER_LENGTH_TEXT = document.querySelector('.zipper__length-span');
this.WEIGHTING_TEXT = document.querySelector('.weighting-span');
this._calcTotalPrice = function () {
    // Расчет цены
    let totalAreaAdditionalPrice = 0;
    let zipperPrice = 0;
    let doorPrice = PRICES.misc.door.default;
    if (this.toning === 'true') {
        totalAreaAdditionalPrice += 100;
    };
    if (this.zipper === 'true') {
    zipperPrice = PRICES.misc.zipper;
    };
    if (this.polyurethane === 'true') {
    doorPrice = PRICES.misc.door.polyurethane;
    };
    let weighting = this.weighting * 100;

    const totalPrice = this.totalArea * (PRICES[this.complete][this.fitting] + totalAreaAdditionalPrice) + weighting + this.doorArea * doorPrice + this.zipperLength * zipperPrice;

    this.TOTAL_PRICE.innerText = totalPrice;
};
// Берем значения с инпутов и устанавливаем в переменные
this._setValues = function () {
    // Общая площадь
    this.totalArea = this.TOTAL_AREA_EL.value;

    // Комплект
    this.complete = this.COMPLETE_SELECT_EL.options[this.COMPLETE_SELECT_EL.selectedIndex].getAttribute('complete');
    this.POLYURETHANE_RADIO_ELS.forEach((el) => {
    if (el.checked) {
        this.polyurethane = el.getAttribute('polyurethane');
    };
    });

    this.doorArea = this.DOOR_AREA.value;
    this.ZIPPER_RADIO_ELS.forEach((el) =>{
    if (el.checked) {
        this.zipper = el.getAttribute('zipper');
    };
    });

    this.zipperLength = this.ZIPPER_LENGTH_EL.value;

    this.fitting = this.FITTINGS_SELECT_EL.options[this.FITTINGS_SELECT_EL.selectedIndex].getAttribute('fitting');

    this.TONING_RADIO_ELS.forEach((el) => {
    if (el.checked) {
        this.toning = el.getAttribute('toning');
    };
    });

    this.weighting = this.WEIGHTING_EL.value;

    this.TOTAL_AREA_EL.addEventListener('input', (e) => {
        this.totalArea = e.target.value
    });
};

// Расчитываем цену при загрузке страницы и добавляем ивент листенеры
this.init = function () {
    this._setValues();
    this._calcTotalPrice();
    

    // Не самое оптимальное решение, но особого влияния на производительность быть не должно
    const rangeInputs = [this.TOTAL_AREA_EL, this.DOOR_AREA, this.ZIPPER_LENGTH_EL, this.WEIGHTING_EL];
    const radioInputs = [this.TONING_RADIO_ELS, this.ZIPPER_RADIO_ELS, this.POLYURETHANE_RADIO_ELS];
    const selectInputs = [this.COMPLETE_SELECT_EL, this.FITTINGS_SELECT_EL];


    selectInputs.forEach((el) => {
    el.addEventListener('change', (e) => {
        this._setValues()
        this._calcTotalPrice()
        if (e.target === this.FITTINGS_SELECT_EL || e.target === this.COMPLETE_SELECT_EL) {
        this.FITTINGS_ICON.src = IMAGES[this.complete][this.fitting]
        };
    });
    });

    radioInputs.forEach((el) => {
    el.forEach((target) => {
        target.addEventListener('change', () => {
        this._setValues()
        this._calcTotalPrice()
        });
    });
    });
    rangeInputs.forEach((el) => {
    el.addEventListener('input', () => {
        this._setValues()
        this._calcTotalPrice()
        // 
        this.TOTAL_AREA_TEXT.innerText = this.totalArea; 
        this.DOOR_AREA_TEXT.innerText = this.doorArea; 
        this.ZIPPER_LENGTH_TEXT.innerText = this.zipperLength; 
        this.WEIGHTING_TEXT.innerText = this.weighting; 
    })
    })
};



};
function popup() {
    // Ссылка на форму, если нужно будет поменять
    this.LINK_TO_FORM = 'https://myagkie-pvh.ru/forma/'
    this.POPUP_EL = document.getElementById('popup__form');
    this.POPUP_CLOSE_EL = document.getElementById('popup__close')
    this.POPUP_OUTER_EL = document.getElementById('popup__outer-area')
    this.IFRAME_EL = document.getElementById('popup__form__iframe')
    this.ORDER_BUTTON = document.getElementById('form__order');
    this.init = function() {
        // Отложенная загрузка iframe для более быстрой загрузки страницы
        setTimeout(()=> {
            this.IFRAME_EL.src = this.LINK_TO_FORM
            }, 500)
        
        this.ORDER_BUTTON.addEventListener('click', (e) => {
            e.preventDefault();
            this.POPUP_EL.classList.remove('popup-form_hidden')
            this.POPUP_EL.classList.add('popup-form_visible')
        });
        [this.POPUP_CLOSE_EL, this.POPUP_OUTER_EL].forEach((el) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.POPUP_EL.classList.remove('popup-form_visible')
                this.POPUP_EL.classList.add('popup-form_hidden')
            })
        });
    };
};
window.addEventListener('load', ()=> {              
            new popup().init()
            new priceCalc().init();
        })


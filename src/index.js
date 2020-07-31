
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
}


function priceCalc() {
  // Elements

  // range Общая площадь
  this.TOTAL_AREA_EL = document.getElementById('total__area')
  // radio Полиуретан
  this.POLYURETHANE_RADIO_ELS = document.getElementsByName('polyurethane')
  // range Площадь двери
  this.DOOR_AREA = document.getElementById('door__area')
  // radio Молния
  this.ZIPPER_RADIO_ELS = document.getElementsByName('zipper')
  // range Длина молнии
  this.ZIPPER_LENGTH_EL = document.getElementById('zipper__length')
  // select Комплектация
  this.COMPLETE_SELECT_EL = document.getElementById('complete__set')
  // select Фурнитура
  this.FITTINGS_SELECT_EL = document.getElementById('fittings')
  // select Цвет
  this.COLORS_SELECT_EL = document.getElementById('colors')
  // radio Тонирование
  this.TONING_RADIO_ELS = document.getElementsByName('toning')
  // range Утяжилитель
  this.WEIGHTING_EL = document.getElementById('weighting')

  this.TOTAL_PRICE = document.getElementById('totalPrice')

  this._calcTotalPrice = function () {
    // Расчет цены
    let totalAreaAdditionalPrice = 0
    let zipperPrice = 0
    let doorPrice = PRICES.misc.door.default
    if (this.toning === 'true') {
        totalAreaAdditionalPrice += 100
    }
    if (this.zipper === 'true') {
      zipperPrice = PRICES.misc.zipper
    }
    if (this.polyurethane === 'true') {
      doorPrice = PRICES.misc.door.polyurethane
    }
    totalAreaAdditionalPrice += this.weighting * 100
    const totalPrice = this.totalArea * (PRICES[this.complete][this.fitting] + totalAreaAdditionalPrice) + this.doorArea * doorPrice + this.zipperLength * zipperPrice
  
    this.TOTAL_PRICE.innerText = totalPrice
  }
  // Берем значения с инпутов и устанавливаем в переменные
  this._setValues = function () {
    this.totalArea = this.TOTAL_AREA_EL.value

    this.complete = this.COMPLETE_SELECT_EL.options[this.COMPLETE_SELECT_EL.selectedIndex].getAttribute('complete')
    this.POLYURETHANE_RADIO_ELS.forEach((el) => {
      if (el.checked) {
        this.polyurethane = el.getAttribute('polyurethane')
      }
    })

    this.doorArea = this.DOOR_AREA.value
    this.ZIPPER_RADIO_ELS.forEach((el) =>{
      if (el.checked) {
        this.zipper = el.getAttribute('zipper')
      }
    })

    this.zipperLength = this.ZIPPER_LENGTH_EL.value

    this.fitting = this.FITTINGS_SELECT_EL.options[this.FITTINGS_SELECT_EL.selectedIndex].getAttribute('fitting')

    this.TONING_RADIO_ELS.forEach((el) => {
      if (el.checked) {
        this.toning = el.getAttribute('toning')
      }
    })

    this.weighting = this.WEIGHTING_EL.value

    this.TOTAL_AREA_EL.addEventListener('input', (e) => {
        this.totalArea = e.target.value
    })
  }

  // Расчитываем цену при загрузке страницы и добавляем ивент листенеры
  this.init = function () {
    this._setValues()
    this._calcTotalPrice()
    

    // Не самое оптимальное решение, но особого влияния на производительность быть не должно
    const rangeInputs = [this.TOTAL_AREA_EL, this.DOOR_AREA, this.ZIPPER_LENGTH_EL, this.WEIGHTING_EL]
    const radioInputs = [this.TONING_RADIO_ELS, this.ZIPPER_RADIO_ELS, this.POLYURETHANE_RADIO_ELS]
    const selectInputs = [this.COMPLETE_SELECT_EL, this.FITTINGS_SELECT_EL]


    selectInputs.forEach((el) => {
      el.addEventListener('change', () => {
        this._setValues()
        this._calcTotalPrice()
      })
    })

    radioInputs.forEach((el) => {
      el.forEach((target) => {
        target.addEventListener('change', () => {
          this._setValues()
          this._calcTotalPrice()
        })
      })
    })

    rangeInputs.forEach((el) => {
      el.addEventListener('input', () => {
        this._setValues()
        this._calcTotalPrice()
      })
    })
  }



}


new priceCalc().init()


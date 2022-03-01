/**
 * --------------------------------------------------------------------------
 * CoreUI (v4.1.0): date-picker.js
 * Licensed under MIT (https://coreui.io/license)
 * --------------------------------------------------------------------------
 */

import { defineJQueryPlugin, typeCheckConfig } from './util/index'
import EventHandler from './dom/event-handler'
import Manipulator from './dom/manipulator'
import SelectorEngine from './dom/selector-engine'
import DateRangePicker from './date-range-picker'

/**
* ------------------------------------------------------------------------
* Constants
* ------------------------------------------------------------------------
*/

const NAME = 'date-picker'
const DATA_KEY = 'coreui.date-picker'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'

const EVENT_DATE_CHANGE = `dateChange${EVENT_KEY}`
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`

const SELECTOR_DATA_TOGGLE = '[data-coreui-toggle="date-picker"]'

const Default = {
  ...DateRangePicker.Default,
  calendars: 1,
  date: null,
  placeholder: ['Select date'],
  range: false
}

const DefaultType = {
  ...DateRangePicker.DefaultType,
  date: '(date|string|null)'
}

/**
* ------------------------------------------------------------------------
* Class Definition
* ------------------------------------------------------------------------
*/

class DatePicker extends DateRangePicker {
  constructor(element, config) {
    super(element, config)
    this._startDate = this._config.date
  }
  // Getters

  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  // Overrides

  _addCalendarEventListeners() {
    super._addCalendarEventListeners()
    SelectorEngine.find('.calendar', this._element).forEach(calendar => {
      EventHandler.on(calendar, 'startDateChange.coreui.calendar', event => {
        this._startDate = event.date
        this._selectEndDate = event.selectEndDate
        this._startInput.value = this._setInputValue(event.date)
        this._updateCalendars()

        EventHandler.trigger(this._element, EVENT_DATE_CHANGE, {
          date: event.date
        })
      })
    })
  }

  _getConfig(config) {
    config = {
      ...this.constructor.Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    }

    typeCheckConfig(NAME, config, DefaultType)
    return config
  }

  // Static

  static datePickerInterface(element, config) {
    const data = DatePicker.getOrCreateInstance(element, config)

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config]()
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      const data = DatePicker.getOrCreateInstance(this)

      if (typeof config !== 'string') {
        return
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`)
      }

      data[config](this)
    })
  }
}

/**
* ------------------------------------------------------------------------
* Data Api implementation
* ------------------------------------------------------------------------
*/

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  const datePickers = SelectorEngine.find(SELECTOR_DATA_TOGGLE)
  for (let i = 0, len = datePickers.length; i < len; i++) {
    DatePicker.datePickerInterface(datePickers[i])
  }
})

/**
* ------------------------------------------------------------------------
* jQuery
* ------------------------------------------------------------------------
* add .DatePicker to jQuery only if jQuery is present
*/

defineJQueryPlugin(DatePicker)

export default DatePicker

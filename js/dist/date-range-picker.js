/*!
  * CoreUI date-range-picker.js v4.6.0-alpha.2 (https://coreui.io)
  * Copyright 2023 The CoreUI Team (https://github.com/orgs/coreui/people)
  * Licensed under MIT (https://github.com/coreui/coreui/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@popperjs/core'), require('date-fns'), require('./base-component.js'), require('./calendar.js'), require('./time-picker.js'), require('./dom/event-handler.js'), require('./dom/manipulator.js'), require('./dom/selector-engine.js'), require('./util/index.js'), require('./util/calendar.js')) :
  typeof define === 'function' && define.amd ? define(['@popperjs/core', 'date-fns', './base-component', './calendar', './time-picker', './dom/event-handler', './dom/manipulator', './dom/selector-engine', './util/index', './util/calendar'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DateRangePicker = factory(global["@popperjs/core"], global["date-fns"], global.BaseComponent, global.Calendar, global.TimePicker, global.EventHandler, global.Manipulator, global.SelectorEngine, global.Index, global.Calendar));
})(this, (function (Popper, dateFns, BaseComponent, Calendar, TimePicker, EventHandler, Manipulator, SelectorEngine, index_js, calendar_js) { 'use strict';

  function _interopNamespaceDefault(e) {
    const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
    if (e) {
      for (const k in e) {
        if (k !== 'default') {
          const d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: () => e[k]
          });
        }
      }
    }
    n.default = e;
    return Object.freeze(n);
  }

  const Popper__namespace = /*#__PURE__*/_interopNamespaceDefault(Popper);

  /**
   * --------------------------------------------------------------------------
   * CoreUI PRO date-range-picker.js
   * License (https://coreui.io/pro/license-new/)
   * --------------------------------------------------------------------------
   */


  /**
   * Constants
   */

  const NAME = 'date-range-picker';
  const DATA_KEY = 'coreui.date-range-picker';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const TAB_KEY = 'Tab';
  const RIGHT_MOUSE_BUTTON = 2;
  const EVENT_CLICK = `click${EVENT_KEY}`;
  const EVENT_END_DATE_CHANGE = `endDateChange${EVENT_KEY}`;
  const EVENT_HIDE = `hide${EVENT_KEY}`;
  const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
  const EVENT_INPUT = 'input';
  const EVENT_RESIZE = 'resize';
  const EVENT_SHOW = `show${EVENT_KEY}`;
  const EVENT_SHOWN = `shown${EVENT_KEY}`;
  const EVENT_SUBMIT = 'submit';
  const EVENT_START_DATE_CHANGE = `startDateChange${EVENT_KEY}`;
  const EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;
  const CLASS_NAME_BODY = 'date-picker-body';
  const CLASS_NAME_CALENDAR = 'date-picker-calendar';
  const CLASS_NAME_CALENDARS = 'date-picker-calendars';
  const CLASS_NAME_CLEANER = 'date-picker-cleaner';
  const CLASS_NAME_DATE_PICKER = 'date-picker';
  const CLASS_NAME_DATE_RANGE_PICKER = 'date-range-picker';
  const CLASS_NAME_DISABLED = 'disabled';
  const CLASS_NAME_DROPDOWN = 'date-picker-dropdown';
  const CLASS_NAME_INDICATOR = 'date-picker-indicator';
  const CLASS_NAME_INPUT = 'date-picker-input';
  const CLASS_NAME_INPUT_GROUP = 'date-picker-input-group';
  const CLASS_NAME_IS_INVALID = 'is-invalid';
  const CLASS_NAME_IS_VALID = 'is-valid';
  const CLASS_NAME_FOOTER = 'date-picker-footer';
  const CLASS_NAME_RANGES = 'date-picker-ranges';
  const CLASS_NAME_SEPARATOR = 'date-picker-separator';
  const CLASS_NAME_SHOW = 'show';
  const CLASS_NAME_TIME_PICKER = 'time-picker';
  const CLASS_NAME_TIME_PICKERS = 'date-picker-timepickers';
  const CLASS_NAME_WAS_VALIDATED = 'was-validated';
  const SELECTOR_CALENDAR = '.calendar';
  const SELECTOR_DATA_TOGGLE = '[data-coreui-toggle="date-range-picker"]:not(.disabled):not(:disabled)';
  const SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`;
  const SELECTOR_INPUT = '.date-picker-input';
  const SELECTOR_WAS_VALIDATED = 'form.was-validated';
  const Default = {
    calendars: 2,
    cancelButton: 'Cancel',
    cancelButtonClasses: ['btn', 'btn-sm', 'btn-ghost-primary'],
    confirmButton: 'OK',
    confirmButtonClasses: ['btn', 'btn-sm', 'btn-primary'],
    cleaner: true,
    calendarDate: null,
    date: null,
    disabled: false,
    disabledDates: null,
    endDate: null,
    endName: null,
    firstDayOfWeek: 1,
    footer: false,
    format: null,
    invalid: false,
    indicator: true,
    locale: 'default',
    maxDate: null,
    minDate: null,
    name: null,
    placeholder: ['Start date', 'End date'],
    range: true,
    ranges: {},
    rangesButtonsClasses: ['btn', 'btn-ghost-secondary'],
    required: true,
    separator: true,
    size: null,
    startDate: null,
    startName: null,
    selectAdjacementDays: false,
    selectEndDate: false,
    showAdjacementDays: true,
    timepicker: false,
    todayButton: 'Today',
    todayButtonClasses: ['btn', 'btn-sm', 'btn-primary', 'me-auto'],
    valid: false
  };
  const DefaultType = {
    calendars: 'number',
    cancelButton: '(boolean|string)',
    cancelButtonClasses: '(array|string)',
    confirmButton: '(boolean|string)',
    confirmButtonClasses: '(array|string)',
    cleaner: 'boolean',
    calendarDate: '(date|string|null)',
    date: '(date|string|null)',
    disabledDates: '(array|null)',
    disabled: 'boolean',
    endDate: '(date|string|null)',
    endName: 'string',
    firstDayOfWeek: 'number',
    footer: 'boolean',
    format: '(string|null)',
    indicator: 'boolean',
    invalid: 'boolean',
    locale: 'string',
    maxDate: '(date|string|null)',
    minDate: '(date|string|null)',
    name: 'string',
    placeholder: '(array|string)',
    range: 'boolean',
    ranges: 'object',
    rangesButtonsClasses: '(array|string)',
    required: 'boolean',
    separator: 'boolean',
    size: '(string|null)',
    startDate: '(date|string|null)',
    startName: 'string',
    selectAdjacementDays: 'boolean',
    selectEndDate: 'boolean',
    showAdjacementDays: 'boolean',
    timepicker: 'boolean',
    todayButton: '(boolean|string)',
    todayButtonClasses: '(array|string)',
    valid: 'boolean'
  };

  /**
   * Class definition
   */

  class DateRangePicker extends BaseComponent {
    constructor(element, config) {
      super(element);
      this._config = this._getConfig(config);
      this._calendarDate = this._convertStringToDate(this._config.calendarDate || this._config.date || this._config.startDate || new Date());
      this._startDate = this._convertStringToDate(this._config.date || this._config.startDate);
      this._endDate = this._convertStringToDate(this._config.endDate);
      this._initialStartDate = null;
      this._initialEndDate = null;
      this._mobile = window.innerWidth < 768;
      this._popper = null;
      this._selectEndDate = this._config.selectEndDate;
      this._calendars = null;
      this._calendarStart = null;
      this._calendarEnd = null;
      this._dateRangePicker = null;
      this._endInput = null;
      this._menu = null;
      this._startInput = null;
      this._timepickers = null;
      this._timePickerEnd = null;
      this._timePickerStart = null;
      this._togglerElement = null;
      this._createDateRangePicker();
      this._createDateRangePickerCalendars();
      this._addEventListeners();
      this._addCalendarEventListeners();
    }

    // Getters
    static get Default() {
      return Default;
    }
    static get DefaultType() {
      return DefaultType;
    }
    static get NAME() {
      return NAME;
    }

    // Public
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._config.disabled || this._isShown()) {
        return;
      }
      EventHandler.trigger(this._element, EVENT_SHOW);
      this._element.classList.add(CLASS_NAME_SHOW);
      this._element.setAttribute('aria-expanded', true);
      EventHandler.trigger(this._element, EVENT_SHOWN);
      this._createPopper();
    }
    hide() {
      EventHandler.trigger(this._element, EVENT_HIDE);
      if (this._popper) {
        this._popper.destroy();
      }
      this._element.classList.remove(CLASS_NAME_SHOW);
      this._element.setAttribute('aria-expanded', 'false');
      EventHandler.trigger(this._element, EVENT_HIDDEN);
    }
    dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      super.dispose();
    }
    cancel() {
      this._endDate = this._initialEndDate;
      this._endInput.value = this._setInputValue(this._initialEndDate);
      this._endInput.dispatchEvent(new Event('change'));
      this._startDate = this._initialStartDate;
      this._startInput.value = this._setInputValue(this._initialStartDate);
      this._startInput.dispatchEvent(new Event('change'));
      this._calendars.innerHTML = '';
      if (this._config.timepicker) {
        this._timepickers.innerHTML = '';
      }
      this.hide();
      this._createDateRangePickerCalendars();
      this._addCalendarEventListeners();
    }
    clear() {
      this._endDate = null;
      this._endInput.value = '';
      this._endInput.dispatchEvent(new Event('change'));
      this._startDate = null;
      this._startInput.value = '';
      this._startInput.dispatchEvent(new Event('change'));
      this._calendars.innerHTML = '';
      if (this._config.timepicker) {
        this._timepickers.innerHTML = '';
      }
      this._createDateRangePickerCalendars();
      this._addCalendarEventListeners();
    }
    reset() {
      this._endDate = this._config.endDate;
      this._endInput.value = this._setInputValue(this._config.endDate);
      this._endInput.dispatchEvent(new Event('change'));
      this._startDate = this._config.startDate;
      this._startInput.value = this._setInputValue(this._config.startDate);
      this._startInput.dispatchEvent(new Event('change'));
      this._calendars.innerHTML = '';
      if (this._config.timepicker) {
        this._timepickers.innerHTML = '';
      }
      this._createDateRangePickerCalendars();
      this._addCalendarEventListeners();
    }
    update(config) {
      this._config = this._getConfig(config);
      this._calendarDate = this._convertStringToDate(this._config.calendarDate || this._config.date || this._config.startDate || new Date());
      this._startDate = this._convertStringToDate(this._config.date || this._config.startDate);
      this._endDate = this._convertStringToDate(this._config.endDate);
      this._selectEndDate = this._config.selectEndDate;
      this._dropdownToggleEl.innerHTML = '';
      this._dropdownMenuEl.innerHTML = '';
      this._createDateRangePicker();
      this._createDateRangePickerCalendars();
      this._addEventListeners();
      this._addCalendarEventListeners();
    }

    // Private
    _addEventListeners() {
      EventHandler.on(this._togglerElement, EVENT_CLICK, () => {
        if (!this._config.disabled) {
          this.show();
          this._initialStartDate = new Date(this._startDate);
          this._initialEndDate = new Date(this._endDate);
        }
      });
      EventHandler.on(this._startInput, EVENT_CLICK, () => {
        this._selectEndDate = false;
        this._updateDateRangePickerCalendars();
      });
      EventHandler.on(this._startInput, EVENT_INPUT, event => {
        const date = this._config.format ? dateFns.parseISO(event.target.value) : calendar_js.getLocalDateFromString(event.target.value, this._config.locale, this._config.timepicker);
        if (date instanceof Date && date.getTime()) {
          this._startDate = date;
          this._calendarDate = date;
          this._updateDateRangePickerCalendars();
        }
      });
      EventHandler.on(this._startInput.form, EVENT_SUBMIT, () => {
        if (this._startInput.form.classList.contains(CLASS_NAME_WAS_VALIDATED)) {
          if (this._config.range && (Number.isNaN(Date.parse(this._startInput.value)) || Number.isNaN(Date.parse(this._endInput.value)))) {
            return this._element.classList.add(CLASS_NAME_IS_INVALID);
          }
          if (this._config.range && this._startDate instanceof Date && this._endDate instanceof Date) {
            return this._element.classList.add(CLASS_NAME_IS_VALID);
          }
          if (!this._config.range && Number.isNaN(Date.parse(this._startInput.value))) {
            return this._element.classList.add(CLASS_NAME_IS_INVALID);
          }
          if (!this._config.range && this._startDate instanceof Date) {
            return this._element.classList.add(CLASS_NAME_IS_VALID);
          }
          this._element.classList.add(CLASS_NAME_IS_INVALID);
        }
      });
      EventHandler.on(this._endInput, EVENT_CLICK, () => {
        this._selectEndDate = true;
        this._updateDateRangePickerCalendars();
      });
      EventHandler.on(this._endInput, EVENT_INPUT, event => {
        const date = this._config.format ? dateFns.parseISO(event.target.value) : calendar_js.getLocalDateFromString(event.target.value, this._config.locale, this._config.timepicker);
        if (date instanceof Date && date.getTime()) {
          this._endDate = date;
          this._calendarDate = date;
          this._updateDateRangePickerCalendars();
        }
      });
      EventHandler.on(window, EVENT_RESIZE, () => {
        this._mobile = window.innerWidth < 768;
      });
    }
    _addCalendarEventListeners() {
      for (const calendar of SelectorEngine.find(SELECTOR_CALENDAR, this._element)) {
        EventHandler.on(calendar, 'startDateChange.coreui.calendar', event => {
          this._startDate = event.date;
          this._selectEndDate = event.selectEndDate;
          this._startInput.value = this._setInputValue(event.date);
          this._startInput.dispatchEvent(new Event('change'));
          this._updateDateRangePickerCalendars();
          if (!this._config.range && !this._config.footer && !this._config.timepicker) {
            this.hide();
          }
          EventHandler.trigger(this._element, EVENT_START_DATE_CHANGE, {
            date: event.date,
            formatedDate: event.date ? this._formatDate(event.date) : undefined
          });
        });
        EventHandler.on(calendar, 'endDateChange.coreui.calendar', event => {
          this._endDate = event.date;
          this._selectEndDate = event.selectEndDate;
          this._endInput.value = this._setInputValue(event.date);
          this._startInput.dispatchEvent(new Event('change'));
          this._updateDateRangePickerCalendars();
          if (this._startDate && !this._config.footer && !this._config.timepicker) {
            this.hide();
          }
          EventHandler.trigger(this._element, EVENT_END_DATE_CHANGE, {
            date: event.date,
            formatedDate: event.date ? this._formatDate(event.date) : undefined
          });
        });
        EventHandler.on(calendar, 'cellHover.coreui.calendar', event => {
          if (this._selectEndDate) {
            this._endInput.value = event.date ? this._formatDate(event.date) : '';
            return;
          }
          this._startInput.value = event.date ? this._formatDate(event.date) : '';
        });
      }
    }
    _createDateRangePicker() {
      this._element.classList.add(CLASS_NAME_DATE_PICKER);
      Manipulator.setDataAttribute(this._element, 'toggle', this._config.range ? CLASS_NAME_DATE_RANGE_PICKER : CLASS_NAME_DATE_PICKER);
      if (this._config.size) {
        this._element.classList.add(`date-picker-${this._config.size}`);
      }
      if (this._config.disabled) {
        this._element.classList.add(CLASS_NAME_DISABLED);
      }
      this._element.classList.toggle(CLASS_NAME_IS_INVALID, this._config.invalid);
      this._element.classList.toggle(CLASS_NAME_IS_VALID, this._config.valid);
      this._element.append(this._createDateRangePickerInputGroup());
      const dropdownEl = document.createElement('div');
      dropdownEl.classList.add(CLASS_NAME_DROPDOWN);
      dropdownEl.append(this._createDateRangePickerBody());
      if (this._config.footer || this._config.timepicker) {
        dropdownEl.append(this._createDateRangeFooter());
      }
      this._element.append(dropdownEl);
      this._menu = dropdownEl;
    }
    _createDateRangePickerInputGroup() {
      const inputGroupEl = document.createElement('div');
      inputGroupEl.classList.add(CLASS_NAME_INPUT_GROUP);
      let startInputName = null;
      if (this._config.name || this._config.startName || this._element.id) {
        startInputName = this._config.name || this._config.startName || (this._config.range ? `date-range-picker-start-date-${this._element.id}` : `date-picker-${this._element.id}`);
      }
      const startInputEl = this._createInput(startInputName, this._getPlaceholder()[0], this._setInputValue(this._startDate));
      let endInputName = null;
      if (this._config.endName || this._element.id) {
        endInputName = this._config.endName || `date-range-picker-end-date-${this._element.id}`;
      }
      const endInputEl = this._createInput(endInputName, this._getPlaceholder()[1], this._setInputValue(this._endDate));
      const inputGroupTextSeparatorEl = document.createElement('div');
      inputGroupTextSeparatorEl.classList.add(CLASS_NAME_SEPARATOR);
      this._startInput = startInputEl;
      this._endInput = endInputEl;
      inputGroupEl.append(startInputEl);
      if (this._config.separator) {
        inputGroupEl.append(inputGroupTextSeparatorEl);
      }
      if (this._config.range) {
        inputGroupEl.append(endInputEl);
      }
      if (this._config.indicator) {
        const inputGroupIndicatorEl = document.createElement('div');
        inputGroupIndicatorEl.classList.add(CLASS_NAME_INDICATOR);
        inputGroupEl.append(inputGroupIndicatorEl);
      }
      if (this._config.cleaner) {
        const inputGroupCleanerEl = document.createElement('div');
        inputGroupCleanerEl.classList.add(CLASS_NAME_CLEANER);
        inputGroupCleanerEl.addEventListener('click', event => {
          event.stopPropagation();
          this.clear();
        });
        inputGroupEl.append(inputGroupCleanerEl);
      }
      this._togglerElement = inputGroupEl;
      return inputGroupEl;
    }
    _createDateRangePickerBody() {
      const dateRangePickerBodyEl = document.createElement('div');
      dateRangePickerBodyEl.classList.add(CLASS_NAME_BODY);
      if (Object.keys(this._config.ranges).length) {
        const dateRangePickerRangesEl = document.createElement('div');
        dateRangePickerRangesEl.classList.add(CLASS_NAME_RANGES);
        for (const key of Object.keys(this._config.ranges)) {
          const buttonEl = document.createElement('button');
          buttonEl.classList.add(...this._getButtonClasses(this._config.rangesButtonsClasses));
          buttonEl.role = 'button';
          buttonEl.addEventListener('click', () => {
            this._startDate = this._config.ranges[key][0];
            this._endDate = this._config.ranges[key][1];
            this._startInput.value = this._setInputValue(this._startDate);
            this._startInput.dispatchEvent(new Event('change'));
            this._endInput.value = this._setInputValue(this._endDate);
            this._endInput.dispatchEvent(new Event('change'));
            this._updateDateRangePickerCalendars();
          });
          buttonEl.innerHTML = key;
          dateRangePickerRangesEl.append(buttonEl);
        }
        dateRangePickerBodyEl.append(dateRangePickerRangesEl);
      }
      const calendarsEl = document.createElement('div');
      calendarsEl.classList.add(CLASS_NAME_CALENDARS);
      this._calendars = calendarsEl;
      dateRangePickerBodyEl.append(calendarsEl);
      if (this._config.timepicker) {
        const timepickersEl = document.createElement('div');
        timepickersEl.classList.add(CLASS_NAME_TIME_PICKERS);
        this._timepickers = timepickersEl;
        dateRangePickerBodyEl.append(timepickersEl);
      }
      return dateRangePickerBodyEl;
    }
    _createDateRangePickerCalendars() {
      const calendarEl = document.createElement('div');
      calendarEl.classList.add(CLASS_NAME_CALENDAR);
      this._calendars.append(calendarEl);

      // eslint-disable-next-line no-new
      new Calendar(calendarEl, {
        calendarDate: new Date(this._calendarDate.getFullYear(), this._calendarDate.getMonth(), 1),
        calendars: this._config.calendars,
        disabledDates: this._config.disabledDates,
        endDate: this._endDate,
        firstDayOfWeek: this._config.firstDayOfWeek,
        locale: this._config.locale,
        maxDate: this._config.maxDate,
        minDate: this._config.minDate,
        range: this._config.range,
        selectAdjacementDays: this._config.selectAdjacementDays,
        selectEndDate: this._selectEndDate,
        showAdjacementDays: this._config.showAdjacementDays,
        startDate: this._startDate
      });
      EventHandler.one(calendarEl, 'calendarDateChange.coreui.calendar', event => {
        this._calendarDate = new Date(event.date.getFullYear(), event.date.getMonth(), 1);
        this._updateDateRangePickerCalendars();
      });
      if (this._config.timepicker) {
        if (this._mobile || this._range && this._config.calendars === 1) {
          const timePickerStartEl = document.createElement('div');
          timePickerStartEl.classList.add(CLASS_NAME_TIME_PICKER);

          // eslint-disable-next-line no-new
          new TimePicker(timePickerStartEl, {
            container: 'inline',
            disabled: !this._startDate,
            locale: this._config.locale,
            time: this._startDate,
            variant: 'select'
          });
          calendarEl.append(timePickerStartEl);
          EventHandler.one(timePickerStartEl, 'timeChange.coreui.time-picker', event => {
            this._startDate = event.date;
            this._startInput.value = this._setInputValue(this._startDate);
            this._updateDateRangePickerCalendars();
          });
          const timePickerEndEl = document.createElement('div');
          timePickerEndEl.classList.add(CLASS_NAME_TIME_PICKER);

          // eslint-disable-next-line no-new
          new TimePicker(timePickerEndEl, {
            container: 'inline',
            disabled: !this._endDate,
            locale: this._config.locale,
            time: this._endDate,
            variant: 'select'
          });
          this._timepickers.append(timePickerEndEl);
          EventHandler.one(timePickerEndEl, 'timeChange.coreui.time-picker', event => {
            this._endDate = event.date;
            this._endInput.value = this._setInputValue(this._endDate);
            this._updateDateRangePickerCalendars();
          });
        } else {
          // eslint-disable-next-line no-unused-vars
          for (const [index, _] of Array.from({
            length: this._config.calendars
          }).entries()) {
            const timePickerEl = document.createElement('div');
            timePickerEl.classList.add(CLASS_NAME_TIME_PICKER);

            // eslint-disable-next-line no-new
            new TimePicker(timePickerEl, {
              container: 'inline',
              disabled: index === 0 ? !this._startDate : !this._endDate,
              locale: this._config.locale,
              time: index === 0 ? this._startDate : this._endDate,
              variant: 'select'
            });
            this._timepickers.append(timePickerEl);
            EventHandler.one(timePickerEl, 'timeChange.coreui.time-picker', event => {
              if (index === 0) {
                this._startDate = event.date;
                this._startInput.value = this._setInputValue(this._startDate);
              } else {
                this._endDate = event.date;
                this._endInput.value = this._setInputValue(this._endDate);
              }
              this._updateDateRangePickerCalendars();
            });
          }
        }
      }
    }
    _createDateRangeFooter() {
      const footerEl = document.createElement('div');
      footerEl.classList.add(CLASS_NAME_FOOTER);
      if (this._config.todayButton) {
        const todayButtonEl = document.createElement('button');
        todayButtonEl.classList.add(...this._getButtonClasses(this._config.todayButtonClasses));
        todayButtonEl.type = 'button';
        todayButtonEl.innerHTML = this._config.todayButton;
        todayButtonEl.addEventListener('click', () => {
          const date = new Date();
          this._calendarDate = date;
          this._startDate = date;
          this._endDate = date;
          this._endInput.value = this._setInputValue(date);
          this._endInput.dispatchEvent(new Event('change'));
          this._startInput.value = this._setInputValue(date);
          this._startInput.dispatchEvent(new Event('change'));
          this._updateDateRangePickerCalendars();
        });
        footerEl.append(todayButtonEl);
      }
      if (this._config.cancelButton) {
        const cancelButtonEl = document.createElement('button');
        cancelButtonEl.classList.add(...this._getButtonClasses(this._config.cancelButtonClasses));
        cancelButtonEl.type = 'button';
        cancelButtonEl.innerHTML = this._config.cancelButton;
        cancelButtonEl.addEventListener('click', () => {
          this.cancel();
        });
        footerEl.append(cancelButtonEl);
      }
      if (this._config.confirmButton) {
        const confirmButtonEl = document.createElement('button');
        confirmButtonEl.classList.add(...this._getButtonClasses(this._config.confirmButtonClasses));
        confirmButtonEl.type = 'button';
        confirmButtonEl.innerHTML = this._config.confirmButton;
        confirmButtonEl.addEventListener('click', () => {
          this.hide();
        });
        footerEl.append(confirmButtonEl);
      }
      return footerEl;
    }
    _updateDateRangePickerCalendars() {
      this._calendars.innerHTML = '';
      if (this._config.timepicker) {
        this._timepickers.innerHTML = '';
      }
      this._createDateRangePickerCalendars();
      this._addCalendarEventListeners();
    }
    _convertStringToDate(date) {
      return date ? date instanceof Date ? date : new Date(date) : null;
    }
    _createInput(name, placeholder, value) {
      const inputEl = document.createElement('input');
      inputEl.classList.add(CLASS_NAME_INPUT);
      inputEl.autocomplete = 'off';
      inputEl.disabled = this._config.disabled;
      inputEl.placeholder = placeholder;
      inputEl.readOnly = this._config.inputReadOnly || typeof this._config.format === 'string';
      inputEl.required = this._config.required;
      inputEl.type = 'text';
      inputEl.value = value;
      if (name) {
        inputEl.name = name;
      }
      const events = ['change', 'keyup', 'paste'];
      for (const event of events) {
        inputEl.addEventListener(event, ({
          target
        }) => {
          if (target.closest(SELECTOR_WAS_VALIDATED)) {
            const inputs = SelectorEngine.find(SELECTOR_INPUT, this._element);
            for (const input of inputs) {
              if (Number.isNaN(Date.parse(input.value))) {
                this._element.classList.add(CLASS_NAME_IS_INVALID);
                this._element.classList.remove(CLASS_NAME_IS_VALID);
                return;
              }
            }
            if (this._config.range && this._startDate instanceof Date && this._endDate instanceof Date) {
              this._element.classList.add(CLASS_NAME_IS_VALID);
              this._element.classList.remove(CLASS_NAME_IS_INVALID);
              return;
            }
            if (!this._config.range && this._startDate instanceof Date) {
              this._element.classList.add(CLASS_NAME_IS_VALID);
              this._element.classList.remove(CLASS_NAME_IS_INVALID);
              return;
            }
            this._element.classList.add(CLASS_NAME_IS_INVALID);
            this._element.classList.remove(CLASS_NAME_IS_VALID);
          }
        });
      }
      return inputEl;
    }
    _createPopper() {
      if (typeof Popper__namespace === 'undefined') {
        throw new TypeError('CoreUI\'s date picker require Popper (https://popper.js.org)');
      }
      const popperConfig = {
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: 'clippingParents'
          }
        }, {
          name: 'offset',
          options: {
            offset: [0, 2]
          }
        }],
        placement: index_js.isRTL() ? 'bottom-end' : 'bottom-start'
      };
      this._popper = Popper__namespace.createPopper(this._togglerElement, this._menu, popperConfig);
    }
    _formatDate(date) {
      if (this._config.format) {
        return dateFns.format(date, this._config.format);
      }
      if (this._config.timepicker) {
        return date.toLocaleString(this._config.locale);
      }
      return date.toLocaleDateString(this._config.locale);
    }
    _getButtonClasses(classes) {
      if (typeof classes === 'string') {
        return classes.split(' ');
      }
      return classes;
    }
    _getConfig(config) {
      config = {
        ...this.constructor.Default,
        ...Manipulator.getDataAttributes(this._element),
        ...(typeof config === 'object' ? config : {})
      };
      return config;
    }
    _getPlaceholder() {
      const {
        placeholder
      } = this._config;
      if (typeof placeholder === 'string') {
        return placeholder.split(',');
      }
      return placeholder;
    }
    _isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }
    _setInputValue(date) {
      if (date) {
        return this._formatDate(date);
      }
      return '';
    }

    // Static

    static dateRangePickerInterface(element, config) {
      const data = DateRangePicker.getOrCreateInstance(element, config);
      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      }
    }
    static jQueryInterface(config) {
      return this.each(function () {
        const data = DateRangePicker.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config](this);
      });
    }
    static clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY) {
        return;
      }
      const openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      for (const toggle of openToggles) {
        const context = DateRangePicker.getInstance(toggle);
        if (!context) {
          continue;
        }
        const composedPath = event.composedPath();
        if (composedPath.includes(context._element)) {
          continue;
        }
        ({
          relatedTarget: context._element
        });
        if (event.type === 'click') ;
        context.hide();
      }
    }
  }

  /**
   * Data API implementation
   */

  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const dateRangePickers = SelectorEngine.find(SELECTOR_DATA_TOGGLE);
    for (let i = 0, len = dateRangePickers.length; i < len; i++) {
      DateRangePicker.dateRangePickerInterface(dateRangePickers[i]);
    }
  });
  EventHandler.on(document, EVENT_CLICK_DATA_API, DateRangePicker.clearMenus);
  EventHandler.on(document, EVENT_KEYUP_DATA_API, DateRangePicker.clearMenus);

  /**
   * jQuery
   */

  index_js.defineJQueryPlugin(DateRangePicker);

  return DateRangePicker;

}));
//# sourceMappingURL=date-range-picker.js.map

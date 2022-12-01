import React from 'react'

export default function Modal({name, date,info}) {
  return (
    <>
    <div className="cd-schedule-modal">
        <header className="cd-schedule-modal__header">
            <div className="cd-schedule-modal__content">
                <span className="cd-schedule-modal__date">{date}</span>
                <h3 className="cd-schedule-modal__name">{name}</h3>
            </div>
            <div className="cd-schedule-modal__header-bg"></div>
        </header>
        <div className="cd-schedule-modal__body">
            <div className="cd-schedule-modal__event-info">{info}</div>
            <div className="cd-schedule-modal__body-bg"></div>
        </div>
        <a href="#0" className="cd-schedule-modal__close text-replace">Close</a>
    </div>
    <div className="cd-schedule__cover-layer"></div>
    </>
  )
}

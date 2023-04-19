import React from 'react'

export default function Switch() {
    return (
        <div className="flipswitch">
            <input type="checkbox" defaultChecked id="fs" className="flipswitch-cb" name="flipswitch" />
            <label htmlFor="fs" className="flipswitch-label">
                <div className="flipswitch-inner" />
                <div className="flipswitch-switch" />
            </label>
        </div>
    )
}
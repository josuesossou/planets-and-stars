import React from 'react';

/**
 * @param {string} text the text to display
 * @param {boolean} capitalize whether to capitalize
 * @param {string} color in hex value or the name of the color
 * @param {number} fontSize the font size
 * @param {object} style the style of the text
 */
export default ({ text, capitalize, fontSize, color, style  }) => (
    <div style={{ fontSize, color, ...style }}>
        {capitalize ? text.toUpperCase() : text}
    </div>
)
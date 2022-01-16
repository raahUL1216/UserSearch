import { fireEvent } from '@testing-library/react';

export const changeInput = (element, inputValue) => {
	fireEvent.change(element, { target: { value: inputValue } })
}

export const clickOn = (element) => {
	fireEvent.click(element);
}

export const pressEnterOn = (element) => {
	fireEvent.keyDown(element, {
		key: "Enter",
		code: "Enter",
		keyCode: 13,
		charCode: 13
	});
}

export const focusElement = (element) => {
	fireEvent.focus(element);
}

export const mouseOverElement = (element) => {
	fireEvent.mouseOver(element);
}
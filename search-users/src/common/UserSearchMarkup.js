import { SearchText } from "../constants/SearchText";

export const prepareUserSearchMarkup = (suggestions) => {
	// iterate in suggestions
	suggestions?.forEach(suggestion => {
		// iterate in suggestion
		Object.keys(suggestion).forEach(fieldName => {
			// prepare markup
			suggestion.highlights?.forEach((highlight) => {

				if (isItemsProperty(fieldName, highlight.path)) {
					// if searchTerm is found in items array, then show it using markup
					let itemObject = highlight.texts.find(text => text.type === SearchText.Found);
					suggestion['item_search'] = itemObject ? `"${itemObject.value}" found in items.` : '';
				}
				else if (highlight.path === fieldName) {
					let texts = highlight.texts;
					// get original and markup replacement value, then replace original value with markup value in field
					let originalValue = texts.map(text => text.value).join('');

					let markupReplacementValue = texts.map((text) => {
						if (text.type === SearchText.Found) {
							return `<span class="text-found"> ${text.value} </span>`;
						} else {
							return text.value;
						}
					}).join('');;

					suggestion[fieldName] = suggestion[fieldName].replace(originalValue, markupReplacementValue)
				}
			});
		});

		delete suggestion.highlights;
	});

	return suggestions;
}

const isItemsProperty = (fieldName, highlighPath) => {
	return fieldName === 'items' && highlighPath === fieldName;
}
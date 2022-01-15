import { Constants } from "../constants/Constants";
import { SearchText } from "../constants/SearchText";

export const getUsers = async (searchTerm) => {
	const searchAPIURI = `${Constants.searchAPI}search-users/?searchTerm=${searchTerm}`,
		headers = Constants.headers;

	console.log(searchAPIURI);

	if (searchTerm) {
		await fetch(searchAPIURI, { headers })
			.then(res => res.json())
			.then(
				(result) => prepareUserSearchMarkup(result),
				(error) => {
					console.log(error);
				});
	}
}

export const prepareUserSearchMarkup = (suggestions) => {
	suggestions?.forEach(suggestion => {
		// iterate in each suggestion and prepare the markup for each property
		Object.keys(suggestion).forEach(fieldName => {

			suggestion.highlights.forEach((highlight) => {
				if (isItemsProperty(fieldName, highlight.path)) {
					// if searchTerm is found in items array, then show it using markup
					let itemObject = highlight.texts.find(text => text.type === SearchText.Found);
					suggestion['itemSearch'] = itemObject ? `"${itemObject.value}" found in items.` : '';
				} else if (highlight.path === fieldName) {
					let texts = highlight.texts;
					// get original and markup replacement value
					let originalValue = texts.map(text => text.value).join('');

					let markupReplacementValue = texts.map((text) => {
						if (text.type === SearchText.Found) {
							return `<span class="text-found"> ${text.value} </span>`;
						} else {
							return text.value;
						}
					}).join('');;

					// replace original value with markup value in field
					suggestion[fieldName] = suggestion[fieldName].replace(originalValue, markupReplacementValue)
				}
			});
		});
	});

	return suggestions;
}

const isItemsProperty = (fieldName, highlighPath) => {
	return fieldName === 'items' && highlighPath === fieldName;
}
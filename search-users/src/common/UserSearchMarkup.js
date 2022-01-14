export const prepareUserSearchMarkup = (result) => {
	result.forEach(suggestion => {
		Object.keys(suggestion).forEach(fieldName => {
			suggestion.highlights.forEach((highlight) => {
				// prepare mark up for fields other than items
				if (fieldName !== 'items' && highlight.path === fieldName) {
					let texts = highlight.texts;
					let replacements = texts.map(text => {
						const matchedValue = `<span class="word-found"> ${text.value} </span>`;

						if (text.type === "hit") {
							return matchedValue;
						} else {
							return text.value;
						}
					}).join("");

					let originals = texts.map(text => {
						return text.value;
					}).join("");

					suggestion[fieldName] = suggestion[fieldName].replace(originals, replacements)
				} else if (fieldName === 'items' && highlight.path === fieldName) {
					// prepare mark up for field items
					let texts = highlight.texts;
					let itemField = texts.reduce((acc, text) => {
						if (text.type === 'hit') {
							acc = `"${text.value}" found in items.`;
						} else {
							acc = '';
						}
						return acc;
					}, '');

					suggestion['itemSearch'] = itemField;
				}
			});
		});
	});

	return result;
}
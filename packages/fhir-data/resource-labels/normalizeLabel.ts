// Attempt to change PascalCase labels to normal spaced labels
export function normalizeLabel(value: string) {
    let label = value.replace(/(\w+)/g, (word) => {
        return word
            .replace(/([A-Z]+)(.)?/g, (_match, capitals, firstCharAfterCapitals) => {
                if (capitals.length === 1) {
                    return ' ' + capitals.toLowerCase() + (firstCharAfterCapitals ?? '');
                }

                if (firstCharAfterCapitals && /[a-z]/.test(firstCharAfterCapitals)) {
                    return (
                        ' ' +
                        capitals.slice(0, -1) +
                        ' ' +
                        capitals.slice(-1).toLowerCase() +
                        (firstCharAfterCapitals ?? '')
                    );
                } else {
                    return ' ' + capitals + (firstCharAfterCapitals ?? '');
                }
            })
            .trim();
    });

    if (!/^[A-Z]/.test(label)) {
        label = label.replace(/^(.)/, (firstChar) => firstChar.toUpperCase());
    }

    return label;
}

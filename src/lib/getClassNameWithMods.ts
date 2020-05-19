// Crude analogue of creating BEM-esque class names with modifiers
export default function getClassNameWithMods(className: string, mods: Record<string, string | number | boolean>): string {
    const classNamesArray = Object.entries(mods)
        .filter((entry) => Boolean(entry[1]))
        .map(([key, value]) => `${className}_${key}${typeof value === 'boolean' ? '' : `_${value}`}`);

    classNamesArray.unshift(className);

    return classNamesArray.join(' ');
}

import getClassNameWithMods from '../getClassNameWithMods';

describe('getClassNameWithMods', () => {
    it('If mods is empty object, returns className', () => {
        expect(getClassNameWithMods('TestClassName', {})).toBe('TestClassName');
    });

    it('If mods is object with values, returns correct classNames', () => {
        expect(getClassNameWithMods('TestClassName', {
            color: 'red',
            active: true
        })).toBe('TestClassName TestClassName_color_red TestClassName_active');
    });
});

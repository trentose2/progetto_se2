const f1groups = require('./get_groups').f1groups

test('get group corrisponde', () => {
	expect(f1groups('a')).toBe('a');
});

test('post group corrisponde', () => {
	expect(post('prova')).toEqual({ id: 'prova', name: 'prova' });
});
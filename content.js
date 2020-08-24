var tb = document
    .getElementById('main_content')
    .getElementsByClassName('hidden-xs hidden-sm')[0]
    .getElementsByTagName('table')[0];

var th = [...tb
    .getElementsByTagName('thead')[0]
    .getElementsByTagName('th')];

var orig = tb.getElementsByTagName('tbody')[0].cloneNode(true);

eq_mode_color = '#11AA11';
inv_mode_color = '#AA1111';

function apply_filter() {
    var body = orig.cloneNode(true);
    var trs = [...body.getElementsByTagName('tr')];

    trs.forEach((e, i) => {
        var cols = e.getElementsByTagName('td');
        th.forEach((h, j) => {
            var input = h.getElementsByTagName('input')[0];
            var pattern = input.value;
            var eq = !pattern.startsWith('~');
            if (!eq) {
                pattern = pattern.substr(1);
            }
            input.style.color = 'black';
            input.style.backgroundColor = eq ? eq_mode_color : inv_mode_color;
            var txt = cols[j].textContent;
            try {
                pattern = new RegExp(pattern);
                if (pattern != '' && ((pattern.test(txt)) ^ eq)) {
                    e.remove();
                }
            } catch (error) {
                input.style.color = 'red';
            }
        });
    });
    tb.getElementsByTagName('tbody')[0].replaceWith(body);
};

th.forEach(e => {
    var x = document.createElement('input');
    x.setAttribute('type', 'text');
    x.setAttribute('float', 'right');
    x.addEventListener('change', apply_filter);
    x.style.width = '100%';
    x.style.backgroundColor = eq_mode_color;

    var f = document.createElement('div');
    f.appendChild(x);

    e.appendChild(document.createElement('br'));
    e.appendChild(f);
});

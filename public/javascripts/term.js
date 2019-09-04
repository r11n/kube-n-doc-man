$(document).ready(function(event) {
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    var term = new Terminal();
    term.open(document.getElementById('terminal'));
    term.write('\x1B[1;34mKube-n-doc-man-$\x1B[0m');
    term.on('key', function(key, ev) {
        if (key.charCodeAt(0) == 13)
            term.write('\n');
        term.write(key);
    });
    // term.on('data', (data) => {
    //     term.write(data);
    // });
    var ptcl = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    var prt = location.port ? `:${location.port}` : '';
    var sctURL = `${ptcl}${location.hostname}${prt}/bash`;
    console.log(sctURL);
    var sct = new WebSocket(sctURL, 'echo-protocol');
    sct.onopen = function(env) {
        term.write('Connection opened to socket');
        term.attach(sct);
    }
});
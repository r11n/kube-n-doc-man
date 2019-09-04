$(document).ready(function(event) {
    Terminal.applyAddon(fit);
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fullscreen);
    term = new Terminal();
    var prt = location.port ? `:${location.port}` : '';
    var socket = io(`${location.protocol}//${location.hostname}${prt}`, {
        path: '/bash'
    });
    var buffer = [];
    term.open(document.getElementById('terminal'));
    term.on('key', function(key, ev) {
        buffer.push(key);
        term.write(key);
        if (key.charCodeAt(0) === 127) {
            backSpaced();
        }
        if (key.charCodeAt(0) == 13) {
            Entered();
            term.write('\n');
        }
    });
    socket.on('message', function(evnt) {
        term.write(evnt);
    })
    function Entered() {
        var line = buffer.join('');
        buffer = [];
        socket.emit('send', line);
    }

    function backSpaced() {
        if (buffer.length > 0) {
            buffer.splice(buffer.length - 1, 1);
        }
    }
});
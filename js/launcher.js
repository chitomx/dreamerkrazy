// Selección de archivo y carga del JAR
document.getElementById('file-selector').addEventListener('change', function(event) {
    var file = event.target.files[0];  // Obtener el archivo seleccionado

    if (file && file.name.endsWith('.jar')) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var jarBlob = e.target.result;  // Leer el archivo como un array buffer (blob)
            js2me.launchJAR(jarBlob);  // Llamar a la función que lanza el JAR
        };
        reader.readAsArrayBuffer(file);  // Leer el archivo como array buffer
    } else {
        alert("Please select a valid .jar file.");
    }
});

// Configuración de la función launchJAR
js2me.launchJAR = function (blob) {
    if (js2me.config.workers) {
        js2me.worker.postMessage(['launchJAR', blob]);
    } else {
        js2me.loadScript(js2me.engine, function () {
            js2me.loadJAR(blob, function () {
                if (js2me.config.midlet) {
                    js2me.launchMidlet(js2me.config.midlet);
                }
                if (js2me.manifest['nokia-midlet-bg-server']) {
                    setTimeout(function () {
                        js2me.launchMidlet(js2me.manifest['nokia-midlet-bg-server']);
                    }, 0);
                }
            });
        });
    }
};

// Configuración para lanzar el midlet
js2me.launchMidlet = function (id) {
    var mainMidlet = js2me.manifest['midlet-' + id];
    js2me['statics' + id] = {};
    var mainClassName = 'javaRoot.$' + mainMidlet.split(',')[2].trim().replace(/\./g, '.$');
    js2me.currentVM = id;
    var mainThread = new javaRoot.$java.$lang.$Thread(function () {
        js2me.loadClass(mainClassName, function (mainClass) {
            var midlet = new mainClass();
            midlet._init$$V(function () {
                midlet.$startApp$$V();
            });
        });
    });
    setTimeout(function () {
        js2me.currentVM = id;
        mainThread.$start$$V();
    }, 100);
};

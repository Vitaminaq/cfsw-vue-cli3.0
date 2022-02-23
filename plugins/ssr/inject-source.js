module.exports = function createMapper(
    clientManifest
) {
    var map = createMap(clientManifest);
    // map server-side moduleIds to client-side files
    return function mapper(moduleIds) {
        var res = new Set();
        for (var i = 0; i < moduleIds.length; i++) {
            var mapped = map.get(moduleIds[i]);
            if (mapped) {
                for (var j = 0; j < mapped.length; j++) {
                    res.add(mapped[j]);
                }
            }
        }
        return Array.from(res)
    }
}

function createMap(clientManifest) {
    var map = new Map();
    Object.keys(clientManifest.modules).forEach(function (id) {
        map.set(id, mapIdToFile(id, clientManifest));
    });
    return map
}

function mapIdToFile(id, clientManifest) {
    var files = [];
    var fileIndices = clientManifest.modules[id];
    if (fileIndices) {
        fileIndices.forEach(function (index) {
            var file = clientManifest.all[index];
            // only include async files or non-js, non-css assets
            if (
                file &&
                (clientManifest.async.indexOf(file) > -1 ||
                    !/\.(js|css)($|\?)/.test(file))
            ) {
                files.push(file);
            }
        });
    }
    return files
}

function getUsedAsyncFiles (context) {
    if (!context._mappedFiles && context._registeredComponents && this.mapFiles) {
      var registered = Array.from(context._registeredComponents);
      context._mappedFiles = this.mapFiles(registered).map(normalizeFile);
    }
    return context._mappedFiles
  };

function renderScripts (context) {
    var this$1 = this;

  if (this.clientManifest) {
    var initial = this.preloadFiles.filter(function (ref) {
        var file = ref.file;

        return isJS(file);
      });
    var async = (this.getUsedAsyncFiles(context) || []).filter(function (ref) {
        var file = ref.file;

        return isJS(file);
      });
    var needed = [initial[0]].concat(async, initial.slice(1));
    return needed.map(function (ref) {
        var file = ref.file;

      return ("<script src=\"" + (this$1.publicPath) + file + "\" defer></script>")
    }).join('')
  } else {
    return ''
  }
};
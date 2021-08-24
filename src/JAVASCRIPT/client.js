var lazyloadScripts    = [],
    lazyloadStylesheet = []
function loadJS(src, cb){

    if(lazyloadScripts.indexOf(src) > -1){
        /// call function callback
        return cb()
    }

    lazyloadScripts.push(src)

    var ref    = document.getElementsByTagName( "script" )[ 0 ]
    var script = document.createElement( "script" )

    script.src   = src
    script.async = true

    ref.parentNode.insertBefore( script, ref )

    if (cb && typeof(cb) === "function") {

        script.onload = cb
    }
    return script
}
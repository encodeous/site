function load(type, name, defaultUri, integrity) {
    var st = new Date().getTime();
    if (type == "dotnetjs")
        return defaultUri;

    var f = fetch(defaultUri,
        {
            cache: 'no-cache',
            integrity: integrity
        });

    allResourcesBeingLoaded.push(f);
    var bar = $("#l-bar");
    f.then(async (r) => {
        if(!started){
            setTimeout(function () {
                if(!ended) document.getElementById("app-load-tip").innerHTML = "This may take longer on the first load.";
            }, 1000);
            setTimeout(function () {
                if(!ended) document.getElementById("app-load-tip").innerHTML = "This may take a while to load on a slow connection...";
            }, 5000);
            setTimeout(function () {
                if(!ended) document.getElementById("app-load-tip").innerHTML = "Try refreshing the page if it does not load.";
            }, 15000);
        }
        started = true;
        if(i === 0){
            document.getElementById('l-bar')
                .style.width = '0%';
            bar.removeClass("indeterminate");
            bar.addClass("determinate");
        }
        i++;
        var l = allResourcesBeingLoaded.length;
        const value = parseInt(100 * i / l);
        const pct = value + '%';
        document.getElementById('app-load')
            .innerHTML = 'Loading Resources - ' + pct;
        document.getElementById('l-bar')
            .style.width = pct;
        document.getElementById('app-load-status')
            .innerHTML = 'Loading - ' +  i + '/' + l + ' (' + pct + ') ' + name;
        console.log('Loading - ' +  i + '/' + l + ' (' + pct + ') ' + name);
        if(i === l){
            ended = true;
            var time = new Date().getTime() - st;
            console.log("Finished Loading Resources. Took " + time + "ms.");
        }
    });
    return f;
}
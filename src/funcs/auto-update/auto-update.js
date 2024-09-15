let lastSrcs; // last fetched sources

const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

async function extractNewScripts() {
    const html = await fetch('/?_timestamp=' + Date.now())
        .then(res => res.text());
    scriptReg.lastIndex = 0;
    let result = [];
    let match;
    while (match = scriptReg.exec(html)) {
        result.push(match.groups.src);
    }
    return result;
}

async function needUpdate() {
    const newScripts = await extractNewScripts();
    if (!lastSrcs) {
        lastSrcs = newScripts;
        return false;
    }
    let result = false;
    if (lastSrcs.length !== newScripts.length) {
        result = true;
    }
    for (let i = 0; i < lastSrcs.length; i++) {
        if (lastSrcs[i] !== newScripts[i]) {
            result = true;
            break;
        }
    }
    lastSrcs = newScripts;
    return result;
}

const DURATION = 1000 * 60 * 1; // 1 minutes
function autoRefresh() {
    setTimeout(async () => {
       const willUpdate = await needUpdate();
         if (willUpdate) {
              const result = confirm('New scripts are available. Do you want to update?');
              if (result) {
                  location.reload();
              }
         }
         autoRefresh();
    }, DURATION);
}

autoRefresh();
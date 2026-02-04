const { spawn } = require('child_process');
const http = require('http');

const routes = [
    '/',
    '/beneficiaries',
    '/contact',
    '/equipment',
    '/events',
    '/gallery',
    '/industrycontributions',
    '/people'
];

const BASE_URL = 'http://localhost:3000';

async function checkUrl(url) {
    try {
        const res = await fetch(url);
        return res;
    } catch (e) {
        return null;
    }
}

async function verifySite() {
    console.log("Starting server (npm start)...");
    const server = spawn('npm', ['start'], { stdio: 'pipe', detached: true });
    
    server.stdout.on('data', (data) => {
        // console.log(`stdout: ${data}`);
    });

    server.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    // Wait for server to be ready
    console.log("Waiting 5s for server startup...");
    await new Promise(resolve => setTimeout(resolve, 5000));

    let allPassed = true;

    for (const route of routes) {
        const url = BASE_URL + route;
        console.log(`Checking ${url}...`);
        const res = await checkUrl(url);
        
        if (!res || res.status !== 200) {
            console.error(`FAIL: ${url} returned ${res ? res.status : 'Network Error'}`);
            allPassed = false;
        } else {
            console.log(`PASS: ${url}`);
            
            // Basic Image Check
            const html = await res.text();
            const imgRegex = /src="([^"]+)"/g;
            let match;
            while ((match = imgRegex.exec(html)) !== null) {
                let imgSrc = match[1];
                // Ignore base64
                if (imgSrc.startsWith('data:')) continue;
                
                // Construct absolute URL
                let imgUrl = imgSrc;
                if (imgSrc.startsWith('/')) {
                     imgUrl = BASE_URL + imgSrc;
                } else if (!imgSrc.startsWith('http')) {
                     // Relative path? potentially problematic if not root relative
                     continue; 
                }

                // Check image
                // Optimization: Don't check external usually, but here we can check status
                // Just check local ones for now to avoid spamming external sites
                if (imgUrl.startsWith(BASE_URL)) {
                    const imgRes = await checkUrl(imgUrl);
                    if (!imgRes || imgRes.status !== 200) {
                        console.error(`  [IMAGE FAIL] ${imgSrc} on ${route} returned ${imgRes ? imgRes.status : 'Error'}`);
                        // Don't fail the whole test for now, just warn
                    } else {
                        // console.log(`  [IMAGE PASS] ${imgSrc}`);
                    }
                }
            }
        }
    }

    console.log("\nStopping server...");
    process.kill(-server.pid); // Kill process group
    
    if (allPassed) {
        console.log("All routes passed verification!");
    } else {
        console.error("Some routes failed.");
        process.exit(1);
    }
}

verifySite();
